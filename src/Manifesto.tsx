import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

const TEXT =
  "I'm a first-year BTech Computer Science student exploring programming and web development — focused on learning, experimenting, making mistakes, and improving with every project.";

const SERIF_WORDS = ["exploring", "experimenting"];
const FLAME_WORDS = ["improving"];

const STATS = [
  { v: 50, label: "Anime watched — and counting" },
  { v: 5, label: "Sitcoms on the favorites list" },
  { v: 1, label: "Year into the journey" },
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mword", {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".manifesto-text",
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });

      gsap.fromTo(
        ".mf-img img",
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: ".mf-img",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.v ?? "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v)).padStart(2, "0");
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="manifesto" className="relative px-5 py-[16vh] md:px-10">
      <div className="mb-12 flex items-center justify-between border-t border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog md:mb-16">
        <span className="text-ink">01 — About</span>
        <span>( Who I am )</span>
      </div>

      <p className="manifesto-text max-w-[30ch] font-display text-[clamp(1.8rem,4.2vw,3.9rem)] font-medium leading-[1.08] tracking-[-0.01em]">
        {TEXT.split(" ").map((w, i) => {
          const clean = w.toLowerCase().replace(/[^a-z]/g, "");
          const cls = SERIF_WORDS.includes(clean)
            ? "font-serif italic font-normal text-[1.06em]"
            : FLAME_WORDS.includes(clean)
              ? "text-flame"
              : "";
          return (
            <span key={i} className={`mword ${cls}`} style={{ opacity: 0.12 }}>
              {w}{" "}
            </span>
          );
        })}
      </p>

      <div className="mt-[14vh] grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="mf-img relative aspect-[4/5] overflow-hidden">
            <img
              src="/img/studio.jpg"
              alt="Late night workspace"
              className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
            />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fog">
            ( Late nights — code, design & anime )
          </p>
        </div>

        <div className="flex flex-col justify-end gap-12 md:col-span-6 md:col-start-7">
          <p className="max-w-md text-base leading-relaxed text-fog md:text-lg">
            I'm especially interested in the creative side of technology — combining programming
            with good visual design and interactive interfaces. Still at the very beginning of the
            journey, and looking forward to seeing where it takes me.
          </p>

          <ul className="border-y border-ink/15">
            {STATS.map((s, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between border-b border-ink/15 py-5 last:border-b-0"
              >
                <span
                  className="stat-num font-display text-5xl font-black tracking-tight md:text-6xl"
                  data-v={s.v}
                >
                  00
                </span>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
