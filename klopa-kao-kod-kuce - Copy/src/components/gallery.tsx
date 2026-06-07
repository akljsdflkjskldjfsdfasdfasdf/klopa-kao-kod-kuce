"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { gallery } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = index !== null ? gallery[index] : null;

  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => {
        if (i === null) return i;
        return (i + dir + gallery.length) % gallery.length;
      }),
    []
  );

  return (
    <section id="galerija" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sa naših tanjira"
          title="Galerija"
          description="Hrana koja izgleda kao kod kuće, a tako i miriše. Kliknite na fotografiju za uvećani prikaz."
        />

        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {gallery.map((image, i) => (
            <Reveal
              key={image.src}
              delay={(i % 4) * 0.06}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl ring-1 ring-border focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none"
              >
                <div
                  className={cn(
                    "relative w-full",
                    image.span === "tall" ? "aspect-3/4" : "aspect-square"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex w-full items-center justify-between gap-2 p-4">
                    <span className="text-sm font-medium text-cream">
                      {image.alt}
                    </span>
                    <ZoomInIcon className="size-5 shrink-0 text-cream" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-[min(94vw,1000px)] border-none bg-transparent p-0 ring-0 shadow-none sm:max-w-[min(94vw,1000px)]">
          <DialogTitle className="sr-only">
            {current?.alt ?? "Fotografija jela"}
          </DialogTitle>
          {current && (
            <div className="relative">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-espresso">
                <Image
                  src={current.full}
                  alt={current.alt}
                  fill
                  sizes="94vw"
                  className="object-contain"
                />
              </div>

              <p className="mt-3 text-center text-sm text-cream/90">
                {current.alt}
              </p>

              <button
                onClick={() => go(-1)}
                aria-label="Prethodna fotografija"
                className="absolute top-1/2 left-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-espresso/60 text-cream backdrop-blur-sm transition-colors hover:bg-espresso/80 sm:-left-4"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Sledeća fotografija"
                className="absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-espresso/60 text-cream backdrop-blur-sm transition-colors hover:bg-espresso/80 sm:-right-4"
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
