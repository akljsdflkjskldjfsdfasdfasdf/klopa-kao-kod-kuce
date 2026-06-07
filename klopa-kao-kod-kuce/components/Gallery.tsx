"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { config } from "@/lib/config";

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Naslov sekcije
        gsap.from(".gallery-head > *", {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gallery-head", start: "top 80%" },
        });

        const items = gsap.utils.toArray<HTMLElement>(".gallery-item");

        items.forEach((item, i) => {
          const fromRight = i % 2 === 0;
          const frame = item.querySelector<HTMLElement>(".gallery-frame");
          const img = item.querySelector<HTMLElement>(".gallery-img");
          const text = item.querySelector<HTMLElement>(".gallery-text");

          // Slika se "otkriva" klizeći sa naizmenične strane (clip-path).
          if (frame) {
            gsap.fromTo(
              frame,
              {
                clipPath: fromRight
                  ? "inset(0% 0% 0% 100%)" // skrivena -> otkriva se sa DESNA
                  : "inset(0% 100% 0% 0%)", // skrivena -> otkriva se sa LEVA
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.4,
                ease: "power4.out",
                scrollTrigger: { trigger: item, start: "top 75%", once: true },
              }
            );
          }

          // Parallax na samoj slici dok se skroluje
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -12 },
              {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          // Tekst uleti sa SUPROTNE strane od slike
          if (text) {
            gsap.from(text.children, {
              autoAlpha: 0,
              x: fromRight ? -70 : 70,
              y: 20,
              duration: 1.1,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 65%", once: true },
            });
          }
        });

        // Poravnaj okidače kad se slike/fontovi učitaju
        ScrollTrigger.refresh();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-cream" id="prica">
      <div className="gallery-head mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
        <p className="font-script text-4xl text-bordo sm:text-6xl">
          {config.story.title}
        </p>
        <span className="mx-auto mt-4 block h-px w-20 bg-gold" />
        <p className="mt-4 font-sans text-sm uppercase tracking-[0.25em] text-ink/60">
          {config.story.subtitle}
        </p>
      </div>

      <div className="flex flex-col">
        {config.gallery.map((img, i) => {
          const fromRight = i % 2 === 0;
          return (
            <figure
              key={i}
              className="gallery-item relative flex min-h-[88svh] w-full items-center overflow-hidden"
            >
              {/* Ram koji se otkriva (clip-path) */}
              <div className="gallery-frame absolute inset-0 will-change-[clip-path]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="gallery-img scale-110 object-cover"
                />
                {/* Zatamnjenje + preliv ka strani gde je tekst */}
                <div className="absolute inset-0 bg-bordo-dark/30" />
                <div
                  className={`absolute inset-0 ${
                    fromRight
                      ? "bg-linear-to-r from-bordo-dark/85 via-bordo-dark/30 to-transparent"
                      : "bg-linear-to-l from-bordo-dark/85 via-bordo-dark/30 to-transparent"
                  }`}
                />
              </div>

              {/* Tekst */}
              <figcaption
                className={`gallery-text relative z-10 w-full max-w-xl px-8 sm:px-16 ${
                  fromRight
                    ? "mr-auto text-left"
                    : "ml-auto text-right"
                }`}
              >
                <span className="block font-serif text-6xl text-gold/70 sm:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-script text-5xl leading-tight text-cream-light sm:text-7xl">
                  {img.caption}
                </h3>
                <p
                  className={`mt-4 max-w-md font-serif text-xl italic leading-relaxed text-cream/85 sm:text-2xl ${
                    fromRight ? "mr-auto" : "ml-auto"
                  }`}
                >
                  {img.quote}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
