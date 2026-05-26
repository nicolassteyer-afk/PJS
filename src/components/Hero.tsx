import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-marquee", { xPercent: -42, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.1 } });
      gsap.to(".hero-outline", { xPercent: 22, rotate: -1.4, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.4 } });
      gsap.to(".hero-orbit", { rotate: 180, scale: 1.18, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.6 } });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero section-pin" id="top">
      <aside className="side-nav" aria-label="Navigation verticale">
        <a href="#top" data-cursor="top" data-cursor-title="Index" data-cursor-text="Retour au signal principal et au mouvement typographique.">Index</a>
        <a href="#panels" data-cursor="panels" data-cursor-title="Panels" data-cursor-text="Une sequence horizontale pour decouvrir le langage du site.">Panels</a>
        <a href="#works" data-cursor="works" data-cursor-title="Works" data-cursor-text="Projets fictifs, hovers abstraits et rythme portfolio.">Works</a>
        <a href="#contact" data-cursor="contact" data-cursor-title="Contact" data-cursor-text="Derniere scene, conversion et appel a construire.">Contact</a>
      </aside>
      <div className="hero-coordinate">N48.856 / E002.352 / build 2026</div>
      <div className="hero-year">(2026)</div>
      <div className="hero-marquee"><span>DIGITAL</span><em>MOTION</em><span className="hero-stroke">SYSTEM</span></div>
      <div className="hero-outline" aria-hidden="true">INTERFACE</div>
      <div className="hero-text-stream" data-text-stream aria-hidden="true"><span>discover the system</span><span>follow the signal</span><span>decode the interface</span></div>
      <div className="hero-meta" data-parallax="-10"><p>+Independent Systems</p><p>+Creative Automation</p><p>+Motion Interface</p><p>+Digital Architecture</p></div>
      <a className="hero-action" href="#panels" data-cursor="scroll" data-cursor-title="Explore" data-cursor-text="Declenche la prochaine couche: panneaux, rythme lateral et details systeme."><span>explore</span><i /></a>
      <div className="hero-orbit" aria-hidden="true"><span /><span /></div>
    </section>
  );
}
