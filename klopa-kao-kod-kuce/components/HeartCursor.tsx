"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const HEART_SVG = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="${HEART_PATH}"/></svg>`;

/**
 * Desktop: srce-kursor koje prati miš (sa trailom) i sakriva nativni kursor.
 * Touch uređaji: na dodir iskoče sitna srca.
 */
export default function HeartCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

      // ---------- DESKTOP: custom kursor ----------
      if (fine) {
        const el = cursor.current!;
        const tr = trail.current!;
        document.documentElement.classList.add("heart-cursor-active");

        gsap.set([el, tr], { xPercent: -50, yPercent: -50, opacity: 0 });

        const xTo = gsap.quickTo(el, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.15, ease: "power3" });
        const xTrail = gsap.quickTo(tr, "x", { duration: 0.5, ease: "power3" });
        const yTrail = gsap.quickTo(tr, "y", { duration: 0.5, ease: "power3" });

        let shown = false;
        const show = () => {
          if (shown) return;
          shown = true;
          gsap.to([el, tr], { opacity: 1, duration: 0.3, overwrite: "auto" });
        };
        const hide = () => {
          // Resetuj flag da bi se srce ponovo pojavilo pri sledećem pokretu.
          shown = false;
          gsap.to([el, tr], { opacity: 0, duration: 0.3, overwrite: "auto" });
        };

        const onMove = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
          xTrail(e.clientX);
          yTrail(e.clientY);
          show();
        };

        // Uvećanje iznad linkova i dugmadi
        const onOver = (e: PointerEvent) => {
          if ((e.target as HTMLElement)?.closest("a, button, [data-cursor]")) {
            gsap.to(el, { scale: 1.8, duration: 0.25 });
          }
        };
        const onOut = (e: PointerEvent) => {
          if ((e.target as HTMLElement)?.closest("a, button, [data-cursor]")) {
            gsap.to(el, { scale: 1, duration: 0.25 });
          }
        };

        // Sakrij kad miš napusti prozor; pokaži kad se vrati.
        const onDocLeave = (e: PointerEvent) => {
          // relatedTarget === null -> miš je stvarno izašao iz prozora
          if (!e.relatedTarget) hide();
        };
        const onBlur = () => hide();
        const onVisibility = () => {
          if (document.hidden) hide();
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerover", onOver);
        window.addEventListener("pointerout", onOut);
        document.addEventListener("pointerout", onDocLeave);
        window.addEventListener("blur", onBlur);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerover", onOver);
          window.removeEventListener("pointerout", onOut);
          document.removeEventListener("pointerout", onDocLeave);
          window.removeEventListener("blur", onBlur);
          document.removeEventListener("visibilitychange", onVisibility);
          document.documentElement.classList.remove("heart-cursor-active");
        };
      }

      // ---------- TOUCH: srca na dodir ----------
      if (reduce) return;

      const pop = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        const heart = document.createElement("div");
        heart.innerHTML = HEART_SVG;
        heart.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:26px;height:26px;color:#b43a4e;transform:translate(-50%,-50%);pointer-events:none;z-index:9999;`;
        document.body.appendChild(heart);
        gsap.to(heart, {
          y: -90,
          opacity: 0,
          scale: gsap.utils.random(0.8, 1.6),
          rotation: gsap.utils.random(-40, 40),
          duration: 1,
          ease: "power2.out",
          onComplete: () => heart.remove(),
        });
      };

      window.addEventListener("pointerdown", pop);
      return () => window.removeEventListener("pointerdown", pop);
    },
    { scope: cursor }
  );

  return (
    <>
      {/* Glavno srce */}
      <div
        ref={cursor}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-6 w-6 text-bordo [will-change:transform] md:block"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
          <path d={HEART_PATH} />
        </svg>
      </div>
      {/* Trail srce */}
      <div
        ref={trail}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-4 w-4 text-rose/50 [will-change:transform] md:block"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
          <path d={HEART_PATH} />
        </svg>
      </div>
    </>
  );
}
