"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * A card that paints a soft accent spotlight following the cursor. The visual
 * lives in the `.spotlight` ::before (globals.css); here we just feed it the
 * pointer position via CSS custom properties. Pointer-driven only, so it adds
 * nothing for touch / keyboard users and respects reduced motion via CSS.
 */
export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onPointerMove={onMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}
