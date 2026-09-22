import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "../lib/scroll";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-line > span",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.3, stagger: 0.12 },
        0.05
      )
        .fromTo(
          ".hero-media",
          { opacity: 0, scale: 1.2 },
          { opacity: 1, scale: 1, duration: 1.7, ease: "power3.out" },
          0.15
        )
        .fromTo(
          ".hero-meta",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          0.7
        );

      gsap.to(".hero-media", {
        yPercent: 24,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-7 md:px-10 md:pb-9"
    >
      <div className="hero-media pointer-events-none absolute right-[5vw] top-[13vh] hidden aspect-square w-[36vw] max-w-[430px] opacity-0 md:block">
        <div className="h-full w-full overflow-hidden rounded-full border border-ink/15">
          <img
            src="/img/chrome.jpg"
            alt="Liquid chrome sculpture"
            className="h-full w-full animate-spin-slow object-cover"
          />
        </div>
        <span className="absolute -bottom-8 right-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          ( Fig. 01 — Curiosity )
        </span>
      </div>

      <div className="relative z-10">
        <p className="hero-meta mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog opacity-0 md:mb-8 md:text-[11px] md:tracking-[0.28em]">
          ( BTech Computer Science — First Year )
        </p>

        <h1 className="font-display font-black uppercase leading-[0.84] tracking-[-0.02em]">
          <span className="hero-line block overflow-hidden">
            <span className="block text-[clamp(4rem,16.5vw,15.5rem)] will-change-transform">
              Hey,
            </span>
          </span>
          <span className="hero-line block overflow-hidden py-1">
            <span className="block font-serif text-[clamp(4rem,15vw,14rem)] font-normal lowercase italic tracking-normal text-flame will-change-transform">
              i&rsquo;m
            </span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="text-stroke block text-[clamp(4rem,16.5vw,15.5rem)] will-change-transform">
              Muaz
              <sup className="align-super text-[0.22em] tracking-normal">®</sup>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex items-end justify-between border-t border-ink/15 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fog md:mt-12 md:text-[11px]">
          <span className="hero-meta flex items-center gap-3 opacity-0">
            <ArrowDown size={13} className="animate-bounce" />
            Scroll to explore
          </span>
          <span className="hero-meta hidden opacity-0 md:block">
            Programming — Web — Creative UI
          </span>
          <span className="hero-meta opacity-0">India — GMT +5:30</span>
        </div>
      </div>
    </section>
  );
}
