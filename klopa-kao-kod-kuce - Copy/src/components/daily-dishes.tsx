"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRightIcon,
  FlameIcon,
  PhoneIcon,
  SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  dailyMenus,
  restaurant,
  weekdayKeyFromDate,
  type WeekdayKey,
} from "@/lib/data";
import { cn, formatRsd, scrollToSection } from "@/lib/utils";

export function DailyDishes() {
  const [active, setActive] = useState<WeekdayKey>("monday");
  const [today, setToday] = useState<WeekdayKey | null>(null);

  useEffect(() => {
    const key = weekdayKeyFromDate(new Date());
    setToday(key);
    if (key) setActive(key);
  }, []);

  const activeMenu = dailyMenus.find((d) => d.key === active) ?? dailyMenus[0];
  const isToday = today === active;

  return (
    <section
      id="danas"
      className="relative scroll-mt-20 overflow-hidden bg-secondary/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Sveže svakog jutra"
          title="Jela od danas"
          description="Naš meni se menja iz dana u dan — kuvamo ono što biste i sami spremili kod kuće. Izaberite dan i pogledajte šta se krčka u šerpama."
        />

        {/* Selektor dana */}
        <Reveal className="mt-9" delay={0.05}>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {dailyMenus.map((day) => {
              const selected = day.key === active;
              return (
                <button
                  key={day.key}
                  onClick={() => setActive(day.key)}
                  className="relative shrink-0 rounded-full bg-background px-5 py-2.5 text-sm font-semibold ring-1 ring-border transition-colors"
                >
                  {selected && (
                    <motion.span
                      layoutId="dayPill"
                      className="absolute inset-0 rounded-full bg-terracotta shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 transition-colors",
                      selected ? "text-white" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="hidden sm:inline">{day.label}</span>
                    <span className="sm:hidden">{day.short}</span>
                  </span>
                  {today === day.key && (
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 z-20 size-3 rounded-full ring-2",
                        selected
                          ? "bg-gold ring-terracotta"
                          : "bg-terracotta ring-background"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Istaknuti meni dana */}
        <div className="mt-7 overflow-hidden rounded-3xl bg-card ring-1 ring-border">
          <div className="grid lg:grid-cols-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu.key + "-img"}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[280px] lg:min-h-[460px]"
              >
                <Image
                  src={activeMenu.image}
                  alt={`${activeMenu.signature} — ${activeMenu.label}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  {isToday && (
                    <Badge className="gap-1 bg-terracotta text-primary-foreground">
                      <SparklesIcon className="size-3" />
                      Danas na meniju
                    </Badge>
                  )}
                  <Badge className="gap-1 bg-cream/90 text-espresso">
                    <FlameIcon className="size-3" />
                    Specijalitet dana
                  </Badge>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu.key + "-body"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col p-7 sm:p-9"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
                  {activeMenu.label}
                </span>
                <h3 className="mt-1 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
                  {activeMenu.signature}
                </h3>

                <ul className="mt-6 flex flex-col divide-y divide-border">
                  {activeMenu.dishes.map((dish) => (
                    <li
                      key={dish.name}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-base font-medium text-foreground">
                        {dish.name}
                      </span>
                      <span className="flex items-baseline gap-1 whitespace-nowrap">
                        <span className="font-heading text-lg font-semibold text-foreground">
                          {formatRsd(dish.price)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{dish.unit}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm text-muted-foreground">
                  Gotova jela se mere i naplaćuju po 100 g — uzmite tačno koliko
                  vam treba. Ponuda se razlikuje od dana do dana; za današnju
                  potvrdu pozovite nas.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    className="rounded-full"
                    onClick={() =>
                      toast.success("Hvala na porudžbini!", {
                        description: `Pozovite ${restaurant.phoneDisplay} da naručite ${activeMenu.signature}.`,
                      })
                    }
                  >
                    <PhoneIcon />
                    Naruči ovaj meni
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => scrollToSection("meni")}
                  >
                    Ceo meni
                    <ArrowRightIcon />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
