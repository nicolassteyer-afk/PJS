import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

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
      setLabel(target.dataset.cursor || "open");
      document.body.classList.add("cursor-active");
    };

    const leave = () => {
      setLabel("");
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
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"><span>{label}</span></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
