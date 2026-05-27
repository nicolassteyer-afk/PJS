import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Panels from "./components/Panels";
import Works from "./components/Works";
import About from "./components/About";
import Contact from "./components/Contact";
import GridOverlay from "./components/GridOverlay";
import NoiseOverlay from "./components/NoiseOverlay";
import EditorialRail from "./components/EditorialRail";
import FloatingNav from "./components/FloatingNav";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { yPercent: 110, opacity: 0, filter: "blur(12px)" }, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: element, start: "top 82%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: Number(element.dataset.parallax || -16),
          ease: "none",
          scrollTrigger: { trigger: element.closest("section") || element, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-text-stream]").forEach((stream) => {
        gsap.fromTo(stream.querySelectorAll("span"), { xPercent: 24, opacity: 0.08, filter: "blur(8px)" }, {
          xPercent: -18,
          opacity: 0.72,
          filter: "blur(0px)",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: stream, start: "top bottom", end: "bottom top", scrub: 1.6 },
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="site-shell">
      <GridOverlay />
      <NoiseOverlay />
      <EditorialRail />
      <FloatingNav />
      <Cursor />
      <Loader />
      <Hero />
      <Panels />
      <Works />
      <About />
      <Contact />
    </div>
  );
}
