"use client";

import { Suspense, useSyncExternalStore } from "react";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { HeroScene } from "./hero-scene";

// Register every three/webgpu class with R3F's reconciler so the WebGPU node
// materials / objects are usable from the scene.
extend(THREE as unknown as Record<string, new (...args: never[]) => unknown>);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const SMALL_SCREEN = "(max-width: 640px)";

/** True on the client, false during SSR — without setState-in-effect. */
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Subscribes to a media query without setState-in-effect. */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Static gradient shown during SSR, while loading, or for reduced-motion users.
 *  Sized fluidly so it never overflows small screens. */
function Fallback() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[clamp(18rem,70vw,34rem)] w-[clamp(18rem,70vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/25 via-accent-2/20 to-transparent blur-3xl" />
    </div>
  );
}

export function HeroCanvas() {
  const isClient = useIsClient();
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const isMobile = useMediaQuery(SMALL_SCREEN);

  if (!isClient || reducedMotion) return <Fallback />;

  return (
    <div className="absolute inset-0 -z-10" style={{ pointerEvents: "none" }} aria-hidden>
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        // Async gl factory: build a WebGPURenderer and await init() before R3F
        // uses it. WebGPURenderer transparently falls back to a WebGL2 backend
        // when WebGPU is unavailable — that fallback is intentional, keep it.
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer({
            ...(props as ConstructorParameters<typeof THREE.WebGPURenderer>[0]),
            antialias: true,
            alpha: true,
          });
          await renderer.init();
          return renderer;
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <HeroScene lowPower={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
