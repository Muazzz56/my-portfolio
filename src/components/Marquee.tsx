import { Asterisk } from "lucide-react";

export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`overflow-hidden border-y border-ink/15 py-4 md:py-5 ${className}`}>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((half) => (
          <ul key={half} className="flex items-center" aria-hidden={half === 1}>
            {items.map((item, i) => (
              <li key={i} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-display text-xl font-extrabold uppercase tracking-tight md:px-10 md:text-3xl">
                  {item}
                </span>
                <Asterisk className="shrink-0 text-flame" size={22} strokeWidth={2} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
