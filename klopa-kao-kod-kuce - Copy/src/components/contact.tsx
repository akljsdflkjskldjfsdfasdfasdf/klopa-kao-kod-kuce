"use client";

import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { InstagramGlyph, FacebookGlyph } from "@/components/brand-icons";
import { hours, restaurant } from "@/lib/data";
import { cn, formatRsd } from "@/lib/utils";

function useOpenStatus() {
  const [status, setStatus] = useState<{
    open: boolean | null;
    todayIndex: number | null;
  }>({ open: null, todayIndex: null });

  useEffect(() => {
    const now = new Date();
    const todayIndex = (now.getDay() + 6) % 7; // 0 = Ponedeljak
    const day = hours[todayIndex];
    const hour = now.getHours() + now.getMinutes() / 60;
    const open = !day.closed && hour >= 10 && hour < 16;
    setStatus({ open, todayIndex });
  }, []);

  return status;
}

export function Contact() {
  const { open, todayIndex } = useOpenStatus();

  return (
    <section id="kontakt" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Posetite nas"
          title="Kontakt i radno vreme"
          description="Nalazimo se u centru Novog Sada, na Cara Dušana 11a. Svratite na topli obrok ili nas pozovite za dostavu."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Info kolona */}
          <div className="flex flex-col gap-5">
            <Reveal className="grid gap-4 sm:grid-cols-2">
              {/* Adresa */}
              <a
                href={restaurant.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-2xl bg-card p-6 ring-1 ring-border transition-colors hover:ring-terracotta/50"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                  <MapPinIcon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Adresa
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {restaurant.addressFull}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-terracotta">
                    Otvori u mapama
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>

              {/* Telefon */}
              <a
                href={restaurant.phoneHref}
                className="group flex flex-col gap-3 rounded-2xl bg-card p-6 ring-1 ring-border transition-colors hover:ring-terracotta/50"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                  <PhoneIcon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Telefon
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {restaurant.phoneDisplay}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Porudžbine i dostava
                  </p>
                </div>
              </a>
            </Reveal>

            {/* Radno vreme */}
            <Reveal delay={0.05} className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
                  <ClockIcon className="size-5 text-terracotta" />
                  Radno vreme
                </h3>
                {open !== null && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                      open
                        ? "bg-sage/15 text-sage"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        open ? "bg-sage" : "bg-muted-foreground"
                      )}
                    />
                    {open ? "Otvoreno sada" : "Trenutno zatvoreno"}
                  </span>
                )}
              </div>

              <ul className="mt-4 flex flex-col">
                {hours.map((row, i) => (
                  <li
                    key={row.day}
                    className={cn(
                      "flex items-center justify-between py-2.5 text-sm",
                      i !== hours.length - 1 && "border-b border-border",
                      todayIndex === i && "font-semibold text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center gap-2",
                        todayIndex !== i && "text-muted-foreground"
                      )}
                    >
                      {todayIndex === i && (
                        <span className="size-1.5 rounded-full bg-terracotta" />
                      )}
                      {row.day}
                    </span>
                    <span
                      className={cn(
                        row.closed
                          ? "text-muted-foreground"
                          : "text-foreground",
                        todayIndex === i && !row.closed && "text-terracotta"
                      )}
                    >
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Dostava + mreže */}
            <Reveal
              delay={0.1}
              className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                  <TruckIcon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Dostava {formatRsd(restaurant.deliveryFee)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Po Novom Sadu · i preko Wolt-a
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  render={
                    <a
                      href={restaurant.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    />
                  }
                >
                  <InstagramGlyph className="size-[1.1rem]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  render={
                    <a
                      href={restaurant.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    />
                  }
                >
                  <FacebookGlyph className="size-[1.1rem]" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Mapa */}
          <Reveal
            delay={0.05}
            className="min-h-[360px] overflow-hidden rounded-3xl ring-1 ring-border lg:min-h-full"
          >
            <iframe
              src={restaurant.mapsEmbed}
              title="Lokacija — Klopa kao kod kuće, Cara Dušana 11a, Novi Sad"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full border-0"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
