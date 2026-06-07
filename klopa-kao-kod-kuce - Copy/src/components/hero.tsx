"use client";

import { useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { images, restaurant } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function HeroParticles() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 46, density: { enable: true, width: 1200, height: 800 } },
        color: { value: ["#e8b96a", "#d98a52", "#f3e4c4", "#c0562f"] },
        opacity: {
          value: { min: 0.08, max: 0.5 },
          animation: { enable: true, speed: 0.6, sync: false },
        },
        size: { value: { min: 1, max: 3.4 } },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.9 },
          direction: "top",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        shape: { type: "circle" },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
    }),
    []
  );

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="hero-particles"
        options={options}
        className="pointer-events-none absolute inset-0 z-20"
      />
    </ParticlesProvider>
  );
}

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Parallax bgr na scroll (GSAP + ScrollTrigger)
      if (!reduce && imageWrap.current) {
        gsap.to(imageWrap.current, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-line", {
        yPercent: 120,
        duration: 0.8,
        stagger: 0.12,
      })
        .from(
          ".hero-eyebrow",
          { y: 18, opacity: 0, duration: 0.6 },
          "-=0.6"
        )
        .from(
          ".hero-fade",
          { y: 22, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45"
        )
        .from(
          ".hero-scroll",
          { opacity: 0, y: -8, duration: 0.6 },
          "-=0.2"
        );
    },
    { scope: container }
  );

  return (
    <section
      id="home"
      ref={container}
      className="relative flex min-h-[640px] items-center overflow-hidden h-svh"
    >
      {/* Pozadinska slika sa parallax-om */}
      <div ref={imageWrap} className="absolute inset-0 -z-0 scale-110">
        <Image
          src={images.hero}
          alt="Bogata trpeza domaćih jela"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Slojevi za kontrast teksta */}
      <div className="absolute inset-0 z-10 bg-espresso/45" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-espresso/90 via-espresso/45 to-espresso/5" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-espresso/90 via-espresso/10 to-espresso/40" />

      {/* Particle efekat */}
      <HeroParticles />

      {/* Sadržaj */}
      <div className="relative z-30 mx-auto w-full max-w-7xl px-4 pt-24 pb-28 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="hero-eyebrow eyebrow text-shadow-soft text-gold">
            <span className="h-px w-7 bg-current opacity-70" />
            {restaurant.city} · Domaća kuhinja {restaurant.yearsOpen}+ godina
          </p>

          <h1 className="text-shadow-hero mt-5 font-heading text-5xl font-black leading-[0.92] tracking-[-0.02em] text-cream sm:text-8xl lg:text-9xl">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">Klopa kao</span>
            </span>
            <span className="block overflow-hidden pb-3">
              <span className="hero-line block font-medium italic text-gold">
                kod kuće
              </span>
            </span>
          </h1>

          <p className="hero-fade text-shadow-soft mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">
            Sveža gotova jela svakog radnog dana — sarma, gulaš, karađorđeve i
            sve ono po čemu pamtimo pravi nedeljni ručak. Skuvano istog jutra, sa
            puno ljubavi.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="rounded-full px-6 text-base"
              onClick={() => scrollToSection("meni")}
            >
              Pogledaj meni
              <ArrowRightIcon />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("danas")}
              className="rounded-full border-cream/30 bg-cream/5 px-6 text-base text-cream backdrop-blur-sm hover:bg-cream/15 hover:text-cream dark:border-cream/30 dark:bg-cream/5"
            >
              Jela od danas
            </Button>
          </div>

          {/* Info traka */}
          <div className="hero-fade text-shadow-soft mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-cream/85">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="size-4 fill-gold text-gold"
                  />
                ))}
              </span>
              <strong className="font-semibold text-cream">
                {restaurant.rating.toLocaleString("sr-RS")}
              </strong>
              <span className="text-cream/65">
                ({restaurant.reviews} recenzija)
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-4 text-gold" />
              {restaurant.addressFull}
            </span>
            <a
              href={restaurant.phoneHref}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-cream"
            >
              <PhoneIcon className="size-4 text-gold" />
              {restaurant.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indikator */}
      <button
        onClick={() => scrollToSection("danas")}
        className="hero-scroll absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 text-cream/70 transition-colors hover:text-cream"
        aria-label="Skroluj nadole"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em]">
          Skroluj
        </span>
        <ArrowDownIcon className="size-5 animate-bounce" />
      </button>
    </section>
  );
}
