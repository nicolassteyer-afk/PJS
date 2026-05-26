import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorContent = {
  label: string;
  title: string;
  text: string;
};

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<CursorContent>({ label: "", title: "", text: "" });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    const move = (event: PointerEvent) => {
      xToDot(event.clientX);
      yToDot(event.clientY);
      xToRing(event.clientX);
      yToRing(event.clientY);
    };

    const enter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      setContent({
        label: target.dataset.cursor || "open",
        title: target.dataset.cursorTitle || "Signal",
        text: target.dataset.cursorText || "Ouvre une nouvelle couche de l'experience.",
      });
      document.body.classList.add("cursor-active");
    };

    const leave = () => {
      setContent({ label: "", title: "", text: "" });
      document.body.classList.remove("cursor-active");
    };

    window.addEventListener("pointermove", move);
    const targets = document.querySelectorAll<HTMLElement>("a, button, [data-cursor], .work-card");
    targets.forEach((target) => {
      target.addEventListener("pointerenter", enter);
      target.addEventListener("pointerleave", leave);
    });

    return () => {
      window.removeEventListener("pointermove", move);
      targets.forEach((target) => {
        target.removeEventListener("pointerenter", enter);
        target.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-label">{content.label}</span>
        <strong>{content.title}</strong>
        <small>{content.text}</small>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
