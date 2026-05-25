import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      ".loader-title span",
      { yPercent: 120, opacity: 0, filter: "blur(18px)" },
      { yPercent: 0, opacity: 1, filter: "blur(0px)", stagger: 0.05, duration: 0.9, ease: "power4.out" }
    )
      .fromTo(".loader-micro", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
      .to(loaderRef.current, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut", delay: 0.35 })
      .set(loaderRef.current, { display: "none" });
  }, []);

  return (
    <section ref={loaderRef} className="loader" aria-label="Introduction">
      <div className="loader-lines" />
      <div className="loader-content">
        <p className="loader-kicker">interface boot sequence / 00.27</p>
        <h1 className="loader-title" aria-label="ENTER">
          {"ENTER".split("").map((letter) => <span key={letter}>{letter}</span>)}
        </h1>
        <div className="loader-barcode" />
        <p className="loader-micro">render.signal: stable<br />visual.index: editorial motion<br />input.mode: scroll</p>
      </div>
      <span className="loader-arrow">{"\u2193"}</span>
    </section>
  );
}
