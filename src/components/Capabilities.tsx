import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "../lib/scroll";

const CAPS = [
  {
    name: "HTML",
    desc: "Beginner — structuring pages with elements, tags and semantic content.",
  },
  {
    name: "CSS",
    desc: "Beginner — appearance, layout, spacing, typography and responsive design.",
  },
  {
    name: "Python",
    desc: "Beginner — programming logic, problem solving and making code do useful things.",
  },
  {
    name: "Analysis",
    desc: "Beginner — breaking problems down and understanding requirements logically.",
  },
  {
    name: "Problem Solving",
    desc: "Beginner — smaller steps, different approaches, better solutions.",
  },
];

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".cap-list", start: "top 82%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="capabilities"
      className="relative mt-[10vh] bg-ink px-5 py-[14vh] text-bone md:px-10"
    >
      <div className="mb-12 flex items-center justify-between border-t border-bone/15 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog md:mb-16">
        <span className="text-bone">03 — Skills</span>
        <span>( What I'm learning )</span>
      </div>

      <p className="mt-8 mb-14 max-w-md text-base leading-relaxed text-fog md:mb-16 md:text-lg">
        What I'm learning right now — HTML, CSS and Python, backed up by the analysis and
        problem-solving that tie everything together.
      </p>

      <div className="cap-list">
        {CAPS.map((c, i) => (
          <div
            key={c.name}
            data-hover
            className="cap group relative overflow-hidden border-t border-bone/15 last:border-b"
          >
            <div className="absolute inset-0 translate-y-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
            <div className="relative z-10 grid grid-cols-12 items-center gap-4 px-1 py-8 transition-colors duration-300 group-hover:text-ink md:py-10">
              <span className="col-span-2 font-mono text-xs text-flame md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="col-span-10 font-display text-[clamp(1.7rem,4.6vw,4rem)] font-black uppercase leading-none tracking-tight md:col-span-5">
                {c.name}
              </h3>
              <p className="col-span-10 col-start-3 mt-3 max-w-sm text-[13px] leading-relaxed text-fog transition-colors duration-300 group-hover:text-ink/70 md:col-span-5 md:col-start-auto md:mt-0 md:text-sm">
                {c.desc}
              </p>
              <span className="hidden justify-end md:col-span-1 md:flex">
                <ArrowUpRight
                  size={30}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-flame"
                />
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-14 max-w-md font-mono text-[11px] uppercase leading-loose tracking-[0.22em] text-fog">
        Everything above is day-one honest — each skill grows with every project. Experience built
        through learning, experimentation and personal builds. More soon.
      </p>
    </section>
  );
}
