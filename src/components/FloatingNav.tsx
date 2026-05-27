import { useEffect, useState } from "react";

const routes = [
  { id: "top", label: "(Panels)", href: "#panels", text: "Continuer vers la sequence horizontale." },
  { id: "panels", label: "(Works)", href: "#works", text: "Voir les projets fictifs et leurs hovers." },
  { id: "works", label: "(About)", href: "#about", text: "Lire la logique creative derriere l'interface." },
  { id: "about", label: "(Contact)", href: "#contact", text: "Passer au dernier ecran et au contact." },
  { id: "contact", label: "(Top)", href: "#top", text: "Relancer l'experience depuis le debut." },
];

export default function FloatingNav() {
  const [active, setActive] = useState(routes[0]);

  useEffect(() => {
    const update = () => {
      let current = routes[0];
      routes.forEach((route) => {
        const section = document.getElementById(route.id);
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.55) current = route;
      });
      setActive(current);
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      document.documentElement.style.setProperty("--page-progress", `${window.scrollY / max}`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <a className="floating-nav" href={active.href} data-cursor="next" data-cursor-title={active.label} data-cursor-text={active.text}>
        <span>{active.label}</span>
        <i />
      </a>
    </>
  );
}
