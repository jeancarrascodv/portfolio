"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Group, Mesh } from "three";

export function HeroScene() {
  const group = useRef<Group>(null);
  const blob = useRef<Mesh>(null);
  // Normalized pointer (-1..1). Fed from a window listener so the canvas can
  // stay pointer-events:none and never block the hero text/buttons.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const { x, y } = pointer.current;
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * 0.05;
      group.current.position.x += (x * 0.5 - group.current.position.x) * 0.05;
    }
    if (blob.current) {
      blob.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={45} color="#8b5cf6" />
      <pointLight position={[0, 3, -5]} intensity={20} color="#ffffff" />

      <group ref={group}>
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.85}>
          {/* Organic distorted core */}
          <mesh ref={blob} scale={1.7}>
            <icosahedronGeometry args={[1, 12]} />
            <MeshDistortMaterial
              color="#3b3a8f"
              emissive="#1b1b4d"
              emissiveIntensity={0.5}
              roughness={0.18}
              metalness={0.85}
              distort={0.38}
              speed={1.6}
            />
          </mesh>

          {/* Wireframe shell */}
          <mesh scale={2.05}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
          </mesh>
        </Float>

      </group>

      {/* Floating particles (outside the rotating group so they drift gently) */}
      <Sparkles
        count={60}
        scale={[9, 6, 5]}
        size={2.2}
        speed={0.5}
        opacity={0.6}
        color="#7dd3fc"
      />
    </>
  );
}
