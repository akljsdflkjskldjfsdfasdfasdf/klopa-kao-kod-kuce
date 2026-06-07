"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { QuoteIcon, StarIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { Reveal } from "@/components/reveal";
import { images, restaurant, stats } from "@/lib/data";

export function About() {
  return (
    <section
      id="o-nama"
      className="scroll-mt-20 bg-secondary/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Kompozicija slika */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] ring-1 ring-border sm:aspect-square">
              <Image
                src={images.aboutPrimary}
                alt="Topla atmosfera za stolom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -right-2 hidden w-44 overflow-hidden rounded-2xl shadow-xl ring-4 ring-background sm:block lg:w-52">
              <div className="relative aspect-4/3">
                <Image
                  src={images.aboutSecondary}
                  alt="Detalj domaćeg jela"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Lebdeća kartica sa ocenom */}
            <div className="absolute -top-5 -left-3 flex items-center gap-3 rounded-2xl bg-background/90 p-3.5 shadow-lg ring-1 ring-border backdrop-blur-sm sm:-left-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                <StarIcon className="size-5 fill-terracotta" />
              </span>
              <div className="leading-tight">
                <div className="font-heading text-xl font-bold text-foreground">
                  {restaurant.rating.toLocaleString("sr-RS")} / 5
                </div>
                <div className="text-xs text-muted-foreground">
                  {restaurant.reviews} zadovoljnih gostiju
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tekst */}
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-current opacity-60" />
                Naša priča
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl">
                Kuhinja u kojoj se oseća dom
              </h2>
            </Reveal>

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <Reveal delay={0.1}>
                <p>
                  Već {restaurant.yearsOpen} godina, u srcu Novog Sada,{" "}
                  <strong className="font-semibold text-foreground">
                    {restaurant.owner}
                  </strong>{" "}
                  sa svojom porodicom kuva ono što i sami najviše volimo da
                  jedemo — pravu domaću hranu, bez prečica. Svaki dan počinje
                  rano u kuhinji, uz sveže namirnice i recepte koji se prenose
                  generacijama.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Ekipa nam je mala i topla: Jasmina, njen suprug i još dvoje
                  vrednih ruku u kuhinji. Kod nas nema zamrznutih sastojaka ni
                  „jučerašnjeg“ — sve se sprema istog jutra i služi toplo, od
                  otvaranja do zatvaranja.
                </p>
              </Reveal>
            </div>

            {/* Citat */}
            <Reveal delay={0.2}>
              <figure className="mt-7 rounded-2xl border-l-4 border-terracotta bg-card p-5 ring-1 ring-border">
                <QuoteIcon className="size-6 text-terracotta/40" />
                <blockquote className="mt-2 font-heading text-lg italic text-foreground">
                  „Cene držimo poštene i kada drugima rastu — verujemo da dobar
                  domaći ručak ne sme da bude luksuz.“
                </blockquote>
                <figcaption className="mt-3 text-sm font-medium text-muted-foreground">
                  — {restaurant.owner}, vlasnica
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* Animirani brojevi */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="rounded-2xl bg-card p-6 text-center ring-1 ring-border sm:p-7"
            >
              <div className="font-heading text-4xl font-bold text-terracotta sm:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
