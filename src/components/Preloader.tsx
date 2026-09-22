import { useEffect, useRef } from "react";
import { gsap, startScroll, stopScroll } from "../lib/scroll";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stopScroll();
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          delay: 0.2,
          onComplete: () => {
            startScroll();
            onDone();
          },
        });
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current)
          numRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
      },
    });

    return () => {
      tl.kill();
      startScroll();
    };
  }, [onDone]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 text-bone md:px-10 md:py-8"
    >
      <div
        ref={barRef}
        className="absolute left-0 top-0 h-[3px] w-full origin-left bg-flame"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em]">
        <span className="font-display text-base font-black tracking-tight">MUAZ®</span>
        <span className="text-fog">Loading experience</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p className="mb-4 hidden max-w-[26ch] font-display text-sm font-medium uppercase leading-snug tracking-tight text-fog md:block">
          First-year CSE student — programming, web & creative UI, learned one project at a time.
        </p>
        <div className="flex items-end gap-2 leading-none">
          <span
            ref={numRef}
            className="font-display text-[clamp(6rem,22vw,17rem)] font-black leading-[0.78] tracking-tighter"
          >
            000
          </span>
          <span className="mb-2 font-mono text-sm text-flame">%</span>
        </div>
      </div>
    </div>
  );
}
