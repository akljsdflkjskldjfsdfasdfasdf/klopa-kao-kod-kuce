"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { config } from "@/lib/config";

export default function ClosingSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".closing-reveal > *", {
          autoAlpha: 0,
          y: 40,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });

        // Nežno "lebdenje" imena — na UNUTRAŠNJEM elementu da se ne sudara
        // sa reveal animacijom (koja pomera spoljni element) ni sa datumom.
        gsap.to(".closing-names-inner", {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Pozadinska slika + bordo preliv */}
      <Image
        src={config.closing.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-bordo-dark/80" />
      <div className="absolute inset-0 bg-linear-to-t from-bordo-dark via-bordo-dark/60 to-bordo-dark/80" />

      <div className="closing-reveal relative z-10 flex max-w-2xl flex-col items-center">
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10 text-gold"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        <h2 className="mt-6 font-script text-5xl text-cream-light sm:text-6xl">
          {config.closing.title}
        </h2>

        <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-cream/80">
          {config.closing.message}
        </p>

        <div className="closing-names mt-12">
          <span className="closing-names-inner inline-block font-serif text-4xl text-gold-light sm:text-5xl">
            {config.groom}{" "}
            <span className="font-script text-gold">{config.amp}</span>{" "}
            {config.bride}
          </span>
        </div>

        <p className="mt-8 font-sans text-sm uppercase tracking-[0.3em] text-cream/60">
          {config.weddingDateLabel}
        </p>
      </div>
    </section>
  );
}
