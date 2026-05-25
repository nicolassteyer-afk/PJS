import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { id: "01", eyebrow: "motion route", title: "SCROLL / DOWN", body: "Un flux vertical qui transforme la page en affiche animee, entre rythme editorial et systeme d'interface." },
  { id: "02", eyebrow: "visual logic", title: "DESIGN + CODE", body: "Chaque bloc est pense comme une couche: typographie, grille, interaction, lumiere, profondeur." },
  { id: "03", eyebrow: "system profile", title: "SHARP SYSTEMS", body: "Des experiences front-end qui melangent execution technique, narration visuelle et precision produit." },
];

export default function Panels() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.1,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="panels" id="panels">
      <div ref={trackRef} className="panels-track">
        {panels.map((panel) => (
          <article className="panel-card" key={panel.id}>
            <small>({panel.id}) / {panel.eyebrow}</small>
            <h2 data-reveal>{panel.title}</h2>
            <p>{panel.body}</p>
            <div className="panel-code"><span>axis.y</span><span>frame.{panel.id}</span><span>state: alive</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}
