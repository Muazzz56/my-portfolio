import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap, scrollToTop } from "../lib/scroll";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Muazzz56" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pathan-muaz-657609432" },
  { label: "Instagram", href: "https://www.instagram.com/lokimuaz" },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-line",
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="contact" className="relative px-5 pb-7 pt-[16vh] md:px-10">
      <div className="mb-12 flex items-center justify-between border-t border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog md:mb-16">
        <span className="text-ink">04 — Say hello</span>
        <span>( Let's connect )</span>
      </div>

      <p className="mt-8 mb-12 max-w-md text-base leading-relaxed text-fog md:text-lg">
        Questions, collaborations, or just anime and music recommendations — my inbox and phone
        are always open.
      </p>

      <a href="mailto:pathnmuaz56@gmail.com" data-hover className="group block">
        <div className="overflow-hidden">
          <span className="cta-line flex items-center gap-4 font-display text-[clamp(3.4rem,14vw,13rem)] font-black uppercase leading-[0.86] tracking-tight will-change-transform">
            Let&rsquo;s
            <ArrowUpRight
              strokeWidth={1.5}
              className="h-[0.62em] w-[0.62em] shrink-0 text-flame transition-transform duration-500 group-hover:rotate-45"
            />
          </span>
        </div>
        <div className="flex flex-wrap items-baseline gap-4 overflow-hidden py-1 sm:gap-6">
          <span className="cta-line text-stroke inline-block font-display text-[clamp(3.4rem,14vw,13rem)] font-black uppercase leading-[0.86] tracking-tight will-change-transform">
            Talk
          </span>
          <span className="cta-line inline-block font-serif text-[clamp(2rem,7vw,6rem)] italic leading-none text-flame will-change-transform">
            with me
          </span>
        </div>
      </a>

      <div className="mt-20 grid gap-10 border-t border-ink/15 pt-10 md:mt-28 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Email</p>
          <a
            href="mailto:pathnmuaz56@gmail.com"
            data-hover
            className="font-display text-xl font-bold tracking-tight underline decoration-1 underline-offset-8 transition-colors duration-300 hover:text-flame md:text-2xl"
          >
            pathnmuaz56@gmail.com
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Socials</p>
          <ul className="flex flex-col gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="group/s inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-flame"
                >
                  {s.label}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Call / Write</p>
          <p className="font-mono text-[12px] uppercase leading-loose tracking-[0.18em] text-fog">
            +91 88490 55833
            <br />
            India — GMT +5:30
          </p>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog md:mt-24 md:text-[11px]">
        <span>© 2026 Muaz Pathan</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
          India — {time}
        </span>
        <button
          onClick={scrollToTop}
          data-hover
          className="flex items-center gap-2 transition-colors duration-300 hover:text-ink"
        >
          Back to top
          <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
