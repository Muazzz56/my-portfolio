import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import Works from "./components/Works";
import Capabilities from "./components/Capabilities";
import Footer from "./components/Footer";
import { ScrollTrigger, initLenis } from "./lib/scroll";

const MARQUEE_ITEMS = [
  "Programming",
  "Web Development",
  "Creative UI",
  "Anime & Manga",
  "Volleyball",
  "Music",
  "Games",
];

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initLenis();
  }, []);

  useEffect(() => {
    if (loading) return;
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="relative min-h-screen bg-bone text-ink">
      <Cursor />
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Nav />
      <main>
        <Hero ready={!loading} />
        <Marquee items={MARQUEE_ITEMS} className="mt-[4vh]" />
        <Manifesto />
        <Works />
        <Capabilities />
      </main>
      <Footer />
      <div className="noise" aria-hidden="true" />
    </div>
  );
}
