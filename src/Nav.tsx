import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { scrollTo, scrollToTop, startScroll, stopScroll } from "../lib/scroll";

const LINKS = [
  { label: "About", href: "#manifesto" },
  { label: "Interests", href: "#work" },
  { label: "Skills", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) stopScroll();
    else startScroll();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollTo(href), open ? 250 : 0);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] mix-blend-difference">
        <nav className="flex items-center justify-between px-5 py-5 text-bone md:px-10">
          <button
            onClick={scrollToTop}
            data-hover
            className="font-display text-lg font-black uppercase leading-none tracking-tight"
          >
            Muaz®
          </button>

          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                data-hover
                className="group relative font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70 md:block">
              IN — GMT+5:30
            </span>
            <button
              onClick={() => setOpen(true)}
              data-hover
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] md:hidden"
            >
              Menu
              <Menu size={15} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-5 py-6 text-bone transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:px-10 ${
          open ? "translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-black uppercase tracking-tight">Muaz®</span>
          <button
            onClick={() => setOpen(false)}
            data-hover
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
          >
            Close
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col">
          {LINKS.map((l, i) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              data-hover
              className={`group flex items-baseline gap-5 text-left transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${0.18 + i * 0.07}s` : "0s" }}
            >
              <span className="font-mono text-xs text-flame">0{i + 1}</span>
              <span className="font-display text-[clamp(2.8rem,9vw,6.5rem)] font-black uppercase leading-[1.02] tracking-tight transition-colors duration-300 group-hover:text-flame">
                {l.label}
              </span>
              <ArrowUpRight
                size={26}
                className="self-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
          <span>India</span>
          <span>pathnmuaz56@gmail.com</span>
        </div>
      </div>
    </>
  );
}
