import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger, gsap } from "../lib/scroll";

const WORKS = [
  {
    img: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Programming",
    cat: "Understanding how things work",
    tag: "Problem solving",
    desc: "I'm interested in understanding how things work and solving problems with code. Breaking a big problem into smaller pieces and slowly watching a solution come together is what pulled me into programming.",
  },
  {
    img: "/img/pulse.jpg",
    title: "Web Development",
    cat: "Layouts, interactions, animation",
    tag: "Logic × creativity",
    desc: "Web development is where logic meets creativity. I enjoy exploring layouts, interactions, animations and better ways of presenting information on a page.",
  },
  {
    img: "https://images.pexels.com/photos/11337254/pexels-photo-11337254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Creative UI",
    cat: "Interfaces that feel alive",
    tag: "Not static",
    desc: "I'm interested in interfaces that feel interactive and memorable rather than static — the kind of screens you keep thinking about long after closing the tab.",
  },
  {
    img: "https://images.pexels.com/photos/30042523/pexels-photo-30042523.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Music",
    cat: "The 1975 · One Direction · TV Girl",
    tag: "On repeat",
    desc: "Always on repeat — The 1975, One Direction and TV Girl. The soundtrack to every late-night coding session.",
  },
  {
    img: "/img/games.jpg",
    title: "Games",
    cat: "HUDs, menus & game interfaces",
    tag: "Call of Duty",
    desc: "Game interfaces, visual design, menus and interactive experiences fascinate me. Currently playing Call of Duty.",
  },
  {
    img: "/img/volleyball.jpg",
    title: "Volleyball",
    cat: "Teamwork, coordination, competition",
    tag: "Off-screen",
    desc: "Volleyball interests me because of the teamwork, coordination and competition — the best way to switch off from the screen and reset.",
  },
  {
    img: "/img/anime.jpg",
    title: "Anime & Stories",
    cat: "50+ anime · Blue Box · Grand Blue",
    tag: "HIMYM · B99 · Manga",
    desc: "50+ anime and counting — Blue Box is one of my favorites, Grand Blue my go-to comedy, with Bleach and Attack on Titan also in the list. Favorite sitcoms: How I Met Your Mother, Friends, Brooklyn Nine-Nine, The Office and Modern Family. I read manga too.",
  },
];

export default function Works() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
    window.setTimeout(() => ScrollTrigger.refresh(), 600);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-title > span",
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".work-title", start: "top 82%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".work").forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="relative px-5 pb-[6vh] md:px-10">
      <div className="mb-12 flex items-center justify-between border-t border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog md:mb-16">
        <span className="text-ink">02 — Interests</span>
        <span>( 07 — Click to read )</span>
      </div>

      <h2 className="font-display font-black uppercase leading-[0.85] tracking-tight">
        <span className="work-title block overflow-hidden">
          <span className="block text-[clamp(3.2rem,11.5vw,10.5rem)] will-change-transform">
            Current
          </span>
        </span>
        <span className="work-title block overflow-hidden">
          <span className="text-stroke block text-[clamp(3.2rem,11.5vw,10.5rem)] will-change-transform">
            Interests
          </span>
        </span>
      </h2>

      <p className="mt-10 max-w-md text-base leading-relaxed text-fog md:text-lg">
        The things that keep me curious — code and web layouts by day; games, music and
        volleyball after hours; and an ever-growing stack of anime, sitcoms and manga in between.
        Click any of them to read more.
      </p>

      <div className="mt-[10vh] flex flex-col gap-[13vh]">
        {WORKS.map((w, i) => (
          <article
            key={w.title}
            className="work group"
            data-hover
            role="button"
            tabIndex={0}
            aria-expanded={open === i}
            onClick={() => toggle(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(i);
              }
            }}
          >
            <div className="grid md:grid-cols-12">
              <div className={i % 2 === 0 ? "md:col-span-8" : "md:col-span-8 md:col-start-5"}>
                <div className="relative aspect-[16/10] overflow-hidden bg-coal">
                  <img
                    src={w.img}
                    alt={`${w.title} — ${w.cat}`}
                    className="absolute inset-0 h-full w-full scale-[1.12] object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2 border-t border-ink/15 pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-xs text-flame">0{i + 1}</span>
                    <h3 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] font-extrabold uppercase leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-3">
                      {w.title}
                    </h3>
                    <ArrowUpRight
                      size={22}
                      className={`self-center text-flame opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 sm:opacity-0 sm:group-hover:opacity-100 ${
                        open === i ? "rotate-45" : ""
                      }`}
                    />
                  </div>
                  <div className="text-left font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fog sm:text-right md:text-[11px]">
                    {w.cat}
                    <br />
                    {w.tag}
                  </div>
                </div>
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-2xl pt-4 text-base leading-relaxed text-fog transition-opacity duration-500 md:text-lg ${
                        open === i ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {w.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
