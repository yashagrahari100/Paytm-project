"use client";

import { useEffect, useRef } from "react";

interface DotRingCursorProps {
  ease?: number;
  grow?: number;
}

export function DotRingCursor({
  ease = 0.12,
  grow = 1.6,
}: DotRingCursorProps) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let want = 1;
    let id = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const over = (e: PointerEvent) => {
      want = (e.target as HTMLElement)
        .closest?.("a, button, [data-cursor-hover]")
        ? grow
        : 1;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over);

    const loop = () => {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      scale += (want - scale) * 0.12;

      if (dot.current) {
        dot.current.style.transform =
          `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }

      if (ring.current) {
        ring.current.style.transform =
          `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      id = requestAnimationFrame(loop);
    };

    id = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      cancelAnimationFrame(id);
    };
  }, [ease, grow]);

 return (
  <>
    {/* Outer ring */}
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999]
        h-10 w-10 rounded-full border-2 border-black
        mix-blend-difference will-change-transform"
    />

    {/* Inner dot */}
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100000]
        h-2 w-2 rounded-full bg-black
        mix-blend-difference will-change-transform"
    />
  </>
);
}