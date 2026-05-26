export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-title">
        <p>studio mode / speculative profile</p>
        <h2 data-reveal>SYSTEMS FOR<br />SHARP IDEAS</h2>
      </div>
      <div className="about-grid">
        <div className="about-copy">
          <p>Je construis des interfaces qui fonctionnent comme des editions vivantes: grille stricte, typographie monumentale, micro-interactions precises et animations qui donnent du poids aux idees.</p>
          <p>L'objectif n'est pas d'ajouter du mouvement partout. C'est de creer un rythme: une lecture, une tension, une sensation de controle et de profondeur.</p>
        </div>
        <dl className="about-specs">
          <div><dt>Focus</dt><dd>Creative frontend / automation / systems</dd></div>
          <div><dt>Tools</dt><dd>React / TypeScript / GSAP / APIs / Vite</dd></div>
          <div><dt>Motion</dt><dd>ScrollTrigger / timelines / parallax</dd></div>
          <div><dt>Output</dt><dd>Premium websites / product interfaces</dd></div>
        </dl>
        <div className="about-pulse-copy" data-text-stream aria-hidden="true"><span>motion as orientation</span><span>typography as interface</span><span>systems as atmosphere</span></div>
        <a className="about-button" href="#contact" data-cursor="contact" data-cursor-title="Contact" data-cursor-text="Passer de l'experience visuelle a une vraie collaboration."><span>contact</span></a>
      </div>
    </section>
  );
}
