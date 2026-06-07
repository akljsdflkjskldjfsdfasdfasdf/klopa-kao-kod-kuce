"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StarIcon, TruckIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { menu, restaurant } from "@/lib/data";
import { cn, formatRsd } from "@/lib/utils";

export function MenuSection() {
  return (
    <section id="meni" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Naša ponuda"
          title="Kompletan meni"
          description="Sve kuvano od svežih namirnica, istog dana. Gotova jela se mere i naplaćuju po 100 grama, pa uzmite tačno onoliko koliko vam prija."
        />

        <Tabs defaultValue={menu[0].id} className="mt-10 gap-6">
          <TabsList className="mx-auto flex h-auto! w-full max-w-2xl flex-wrap justify-center gap-2 bg-transparent p-0">
            {menu.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="flex-none rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors hover:border-terracotta/40 hover:text-foreground data-active:border-terracotta! data-active:bg-terracotta! data-active:text-white! data-active:shadow-sm"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menu.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10"
              >
                {/* Vizuelna kartica kategorije */}
                <div className="relative h-56 overflow-hidden rounded-3xl ring-1 ring-border lg:h-auto lg:min-h-[420px]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-heading text-3xl font-semibold text-cream">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 max-w-xs text-sm text-cream/80">
                      {cat.blurb}
                    </p>
                  </div>
                </div>

                {/* Lista jela */}
                <ul className="flex flex-col">
                  {cat.items.map((item, i) => (
                    <li
                      key={item.name}
                      className={cn(
                        "flex items-start justify-between gap-5 py-4",
                        i !== cat.items.length - 1 && "border-b border-border"
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-heading text-lg font-semibold text-foreground">
                            {item.name}
                          </h4>
                          {item.signature && (
                            <Badge
                              variant="outline"
                              className="gap-1 border-gold/50 text-gold"
                            >
                              <StarIcon className="size-3 fill-gold" />
                              Omiljeno
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-baseline gap-1 pt-0.5">
                        <span className="font-heading text-xl font-semibold text-terracotta">
                          {formatRsd(item.price)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{item.unit}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <TruckIcon className="size-4 text-terracotta" />
          Dostava po Novom Sadu {formatRsd(restaurant.deliveryFee)} · dostupno i
          preko Wolt aplikacije
        </div>
      </div>
    </section>
  );
}
