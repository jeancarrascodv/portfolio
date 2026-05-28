"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three/webgpu";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import {
  color,
  mix,
  mx_fractal_noise_vec3,
  mx_noise_float,
  normalLocal,
  pass,
  positionLocal,
  time,
  vec3,
} from "three/tsl";

/**
 * Brand palette.
 * background #07070b · accent cyan #22d3ee · accent-2 violet #8b5cf6
 */
const ACCENT_CYAN = new THREE.Color("#22d3ee");
const ACCENT_VIOLET = new THREE.Color("#8b5cf6");
const CORE_INDIGO = new THREE.Color("#3b3a8f");
const CORE_EMISSIVE = new THREE.Color("#1b1b4d");

/**
 * Builds the TSL MeshStandardNodeMaterial that replaces drei MeshDistortMaterial
 * (GLSL-only). The vertex surface is displaced by animated fractal noise so the
 * icosahedron breathes like the old distort blob, and the surface colour mixes
 * between brand indigo and cyan/violet glow based on noise + view normal.
 */
function makeBlobMaterial() {
  const material = new THREE.MeshStandardNodeMaterial();

  // Animated displacement along the surface normal. mx_fractal_noise_vec3 is
  // sampled from the local position offset by time so the blob "flows".
  const t = time.mul(0.45);
  const noiseCoord = positionLocal.mul(1.35).add(vec3(t, t.mul(0.6), t.mul(0.3)));
  const displacement = mx_fractal_noise_vec3(noiseCoord, 3, 2.0, 0.55).x.mul(0.28);
  material.positionNode = positionLocal.add(normalLocal.mul(displacement));

  // Colour: indigo base, lifted toward cyan/violet where the noise field is hot.
  const tint = mx_noise_float(noiseCoord.mul(0.6).add(t), 1.0, 0.0).mul(0.5).add(0.5);
  const baseColor = mix(color(CORE_INDIGO), color(ACCENT_VIOLET), tint.mul(0.6));
  material.colorNode = baseColor;

  // Emissive cyan rim glow modulated by the same field for a living core.
  const glow = mx_noise_float(noiseCoord.add(vec3(7.1, 3.3, 1.9)), 1.0, 0.0)
    .mul(0.5)
    .add(0.5);
  material.emissiveNode = mix(color(CORE_EMISSIVE), color(ACCENT_CYAN), glow.mul(0.55));

  material.metalness = 0.85;
  material.roughness = 0.18;

  return material;
}

/**
 * Lightweight TSL particle field replacing drei <Sparkles> (its GLSL
 * ShaderMaterial does not run under WebGPU). A THREE.Points with a
 * PointsNodeMaterial: brand-cyan dots that gently bob over time.
 */
function makeParticles() {
  const COUNT = 120;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() * 2 - 1) * 4.5; // scale x ~9
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 3.0; // scale y ~6
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * 2.5; // scale z ~5
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsNodeMaterial();
  // Gentle vertical drift so the field feels alive (like Sparkles speed).
  const drift = mx_noise_float(positionLocal.add(time.mul(0.5)), 1.0, 0.0).mul(0.15);
  material.positionNode = positionLocal.add(vec3(0, drift, 0));
  material.colorNode = color(new THREE.Color("#7dd3fc"));
  material.size = 10;
  material.sizeAttenuation = true;
  material.transparent = true;
  material.opacity = 0.85;
  material.depthWrite = false;

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return points;
}

export function HeroScene() {
  const group = useRef<THREE.Group>(null);
  const blob = useRef<THREE.Mesh>(null);
  // Normalized pointer (-1..1). Fed from a window listener so the canvas can
  // stay pointer-events:none and never block the hero text/buttons.
  const pointer = useRef({ x: 0, y: 0 });

  const blobMaterial = useMemo(() => makeBlobMaterial(), []);
  const particles = useMemo(() => makeParticles(), []);

  // WebGPU post-processing: whole-scene bloom only. Follows the installed
  // BloomNode docs exactly — bloom takes the scene pass's "output" texture
  // node, and the result is added back onto that color.
  const { gl, scene, camera } = useThree();
  const pipeline = useMemo(() => {
    const pp = new THREE.PostProcessing(gl as unknown as THREE.WebGPURenderer);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, 0.3, 0.5, 0.3); // strength, radius, threshold
    pp.outputNode = scenePassColor.add(bloomPass);
    return pp;
  }, [gl, scene, camera]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Dispose GPU resources on unmount.
  useEffect(() => {
    return () => {
      blobMaterial.dispose();
      particles.geometry.dispose();
      (particles.material as THREE.Material).dispose();
    };
  }, [blobMaterial, particles]);

  // Priority 1: R3F yields its automatic render so the post-processing
  // pipeline renders instead. renderAsync() is the canonical WebGPU call —
  // the sync render() left the canvas blank (never presented the frame).
  useFrame((_, delta) => {
    const { x, y } = pointer.current;
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * 0.05;
      // Base offset +2.3 keeps the blob on the right so it doesn't sit under
      // the hero copy (which lives in the left half of the container).
      group.current.position.x += (x * 0.5 + 2.3 - group.current.position.x) * 0.05;
    }
    if (blob.current) {
      blob.current.rotation.z += delta * 0.04;
    }
    pipeline.renderAsync();
  }, 1);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={45} color="#8b5cf6" />
      <pointLight position={[0, 3, -5]} intensity={20} color="#ffffff" />

      {/* Reflections for the metallic core. Lightformers give controllable
          brand-tinted highlights and work with WebGPURenderer's PMREM. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2}
          color="#22d3ee"
          position={[4, 3, 4]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          intensity={1.4}
          color="#8b5cf6"
          position={[-5, -2, 2]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          intensity={0.6}
          color="#ffffff"
          position={[0, 4, -5]}
          scale={[8, 4, 1]}
        />
      </Environment>

      <group ref={group}>
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.85}>
          {/* Organic distorted core (TSL noise displacement). */}
          <mesh ref={blob} scale={1.1} material={blobMaterial}>
            <icosahedronGeometry args={[1, 12]} />
          </mesh>

          {/* Wireframe shell */}
          <mesh scale={1.4}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
          </mesh>
        </Float>
      </group>

      {/* Floating particles (outside the rotating group so they drift gently). */}
      <primitive object={particles} />
    </>
  );
}
