"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { config } from "@/lib/config";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-4a1 1 0 010-2h3V7a1 1 0 012 0v5a1 1 0 01-1 1z" />
    </svg>
  );
}

export default function EventDetails() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".details-head > *", {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".details-head", start: "top 82%" },
        });

        gsap.from(".event-card", {
          autoAlpha: 0,
          y: 60,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: ".event-grid", start: "top 80%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative bg-cream-light px-6 py-24 sm:py-32"
      id="detalji"
    >
      <div className="details-head mx-auto mb-16 max-w-2xl text-center">
        <p className="font-script text-4xl text-bordo sm:text-5xl">
          Detalji događaja
        </p>
        <p className="mt-3 font-sans text-sm uppercase tracking-[0.25em] text-ink/60">
          Gde i kada se vidimo
        </p>
      </div>

      <div className="event-grid mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {config.events.map((ev, i) => (
          <article
            key={i}
            className="event-card flex flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white/60 shadow-lg shadow-bordo/5 backdrop-blur-sm"
          >
            <div className="flex flex-1 flex-col items-center p-8 text-center">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold">
                {ev.title}
              </span>
              <h3 className="mt-3 font-serif text-3xl text-bordo sm:text-4xl">
                {ev.name}
              </h3>

              <div className="mt-5 flex flex-col items-center gap-2 font-sans text-sm text-ink/80">
                <span className="flex items-center gap-2 text-bordo/80">
                  <PinIcon />
                  {ev.address}
                </span>
                <span className="flex items-center gap-2 text-bordo/80">
                  <ClockIcon />
                  {ev.time}
                </span>
              </div>

              <a
                href={ev.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-bordo px-6 py-3 font-sans text-sm font-medium text-cream-light transition-colors hover:bg-bordo-dark"
              >
                <PinIcon />
                Otvori na mapi
              </a>
            </div>

            <iframe
              src={ev.embedUrl}
              title={`Mapa — ${ev.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full border-0 grayscale-[20%]"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
