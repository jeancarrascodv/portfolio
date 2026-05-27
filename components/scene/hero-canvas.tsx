"use client";

import { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./hero-scene";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** True on the client, false during SSR — without setState-in-effect. */
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Subscribes to the user's reduced-motion preference. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** Static gradient shown during SSR, while loading, or for reduced-motion users. */
function Fallback() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/25 via-accent-2/20 to-transparent blur-3xl" />
    </div>
  );
}

export function HeroCanvas() {
  const isClient = useIsClient();
  const reducedMotion = usePrefersReducedMotion();

  if (!isClient || reducedMotion) return <Fallback />;

  return (
    <div className="absolute inset-0 -z-10" style={{ pointerEvents: "none" }} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
