import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringP = { x: target.x, y: target.y, s: 1 };
    let scale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      scale = el.closest("a, button, [data-hover]") ? 1.7 : 1;
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      ringP.x += (target.x - ringP.x) * 0.15;
      ringP.y += (target.y - ringP.y) * 0.15;
      ringP.s += (scale - ringP.s) * 0.18;
      ring.style.backgroundColor = ringP.s > 1.25 ? "#ece7df" : "transparent";
      ring.style.transform = `translate(${ringP.x}px, ${ringP.y}px) translate(-50%, -50%) scale(${ringP.s})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[400] h-12 w-12 rounded-full border border-bone mix-blend-difference transition-[background-color] duration-200"
      />
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[400] h-1.5 w-1.5 rounded-full bg-flame"
      />
    </>
  );
}
