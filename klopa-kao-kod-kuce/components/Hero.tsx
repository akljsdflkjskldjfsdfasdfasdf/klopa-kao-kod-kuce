"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { config } from "@/lib/config";
import FallingHearts from "./FallingHearts";

/** Ime razloženo na slova radi staggered reveala. */
function SplitName({ text }: { text: string }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="hero-letter inline-block will-change-transform"
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.2,
        });

        tl.from(".hero-kicker", { autoAlpha: 0, y: 20, duration: 0.8 })
          .from(
            ".hero-letter",
            {
              autoAlpha: 0,
              yPercent: 120,
              rotateX: -90,
              stagger: 0.04,
              duration: 0.9,
            },
            "-=0.2"
          )
          .from(
            ".hero-amp",
            { autoAlpha: 0, scale: 0, rotation: -30, duration: 0.7 },
            "-=0.5"
          )
          .from(".hero-date", { autoAlpha: 0, y: 24, duration: 0.8 }, "-=0.3")
          .from(".hero-scroll", { autoAlpha: 0, duration: 0.6 }, "-=0.2");

        // Suptilno "disanje" indikatora za skrol
        gsap.to(".hero-scroll-dot", {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "sine.inOut",
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-linear-to-b from-cream-light via-cream to-cream px-6 text-center"
    >
      <FallingHearts />

      <div className="relative z-10 flex flex-col items-center">
        <p className="hero-kicker font-sans text-xs uppercase tracking-[0.35em] text-bordo/70 sm:text-sm">
          {config.hero.kicker}
        </p>

        <h1 className="mt-6 font-serif font-medium leading-none text-ink [perspective:600px]">
          <span className="block text-6xl sm:text-8xl lg:text-9xl">
            <SplitName text={config.groom} />
          </span>
          <span className="hero-amp my-1 block font-script text-5xl text-bordo sm:my-2 sm:text-7xl lg:text-8xl">
            {config.amp}
          </span>
          <span className="block text-6xl sm:text-8xl lg:text-9xl">
            <SplitName text={config.bride} />
          </span>
        </h1>

        <div className="hero-date mt-8 flex flex-col items-center gap-2">
          <span className="h-px w-16 bg-gold" />
          <p className="font-sans text-sm uppercase tracking-[0.25em] text-ink/80 sm:text-base">
            {config.weddingDayLabel}, {config.weddingDateLabel}
          </p>
          <span className="h-px w-16 bg-gold" />
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 z-10 flex flex-col items-center gap-2 text-bordo/60">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">
          {config.hero.scrollHint}
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-bordo/40 p-1">
          <span className="hero-scroll-dot h-1.5 w-1.5 rounded-full bg-bordo/60" />
        </span>
      </div>
    </section>
  );
}
