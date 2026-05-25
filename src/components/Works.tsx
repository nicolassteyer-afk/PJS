const works = [
  ["01", "2026", "Automation", "SYNTH/01", "Generative pipeline for silent operations"],
  ["02", "2026", "Interface", "VOID SIGNAL", "Editorial dashboard with cinematic motion"],
  ["03", "2025", "System", "NEURAL FRAME", "Agentic workspace for structured decisions"],
  ["04", "2025", "Motion", "VECTOR HAZE", "Scroll driven identity and kinetic typography"],
  ["05", "2024", "Protocol", "STATIC PROTOCOL", "Data rituals, alerts and operational rhythm"],
];

export default function Works() {
  return (
    <section className="works-section" id="works">
      <div className="section-header"><p>selected experiments</p><h2 data-reveal>WORKS</h2></div>
      <div className="works-list">
        {works.map(([num, year, category, title, description]) => (
          <article className="work-card" key={title} data-cursor="view">
            <div className="work-index">({num})</div>
            <div className="work-title"><span>{category}</span><h3>{title}</h3></div>
            <p>{description}</p>
            <div className="work-year">{year}</div>
            <div className="work-preview" aria-hidden="true"><i /><i /><i /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
