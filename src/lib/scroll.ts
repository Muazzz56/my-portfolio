import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

let locks = 0;

export function stopScroll() {
  locks += 1;
  lenis?.stop();
}

export function startScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) lenis?.start();
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function scrollTo(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { duration: 1.6, easing: easeOutQuart });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.6, easing: easeOutQuart });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export { gsap, ScrollTrigger };
