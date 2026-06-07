"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const COLORS = ["text-bordo", "text-rose", "text-gold"];
const COUNT = 48;

/**
 * Srca koja padaju odozgo preko ekrana (apsolutno unutar Hero sekcije).
 * Poštuje prefers-reduced-motion i smanjuje broj srca na mobilnom.
 */
export default function FallingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 640px)",
        },
        (ctx) => {
          const { isMobile } = ctx.conditions as {
            motion: boolean;
            isMobile: boolean;
          };

          const hearts = gsap.utils.toArray<HTMLElement>(".falling-heart");

          hearts.forEach((heart, i) => {
            // Na mobilnom preskoči svako treće srce (lakše za telefon),
            // ali zadrži gust pljusak.
            if (isMobile && i % 3 === 0) return;

            const startX = gsap.utils.random(0, 100);
            const scale = gsap.utils.random(0.35, 1.15);
            const duration = gsap.utils.random(6, 13);

            gsap.set(heart, {
              left: `${startX}vw`,
              top: 0,
              scale,
              opacity: gsap.utils.random(0.35, 0.85),
            });

            // Padanje — beskonačna petlja
            const fall = gsap.fromTo(
              heart,
              { y: "-15vh" },
              {
                y: "115vh",
                duration,
                ease: "none",
                repeat: -1,
              }
            );
            // Pomeri svaku petlju na nasumičnu tačku -> ekran je PUN srca odmah,
            // umesto da čeka da prva srca padnu odozgo.
            fall.progress(gsap.utils.random(0, 1));

            // Lagano ljuljanje levo-desno + rotacija
            gsap.to(heart, {
              x: gsap.utils.random(-70, 70),
              rotation: gsap.utils.random(-45, 45),
              duration: gsap.utils.random(2, 4),
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {Array.from({ length: COUNT }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          // opacity-0 dok GSAP ne preuzme -> pod reduced-motion ostaju nevidljiva
          className={`falling-heart absolute top-0 left-0 h-6 w-6 opacity-0 ${
            COLORS[i % COLORS.length]
          }`}
          fill="currentColor"
        >
          <path d={HEART_PATH} />
        </svg>
      ))}
    </div>
  );
}
