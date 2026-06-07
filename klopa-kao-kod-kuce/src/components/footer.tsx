"use client";

import { MapPinIcon, PhoneIcon, UtensilsCrossedIcon } from "lucide-react";
import { InstagramGlyph, FacebookGlyph } from "@/components/brand-icons";
import { navLinks, restaurant } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brend */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-terracotta text-primary-foreground">
                <UtensilsCrossedIcon className="size-5" />
              </span>
              <span className="font-heading text-xl font-bold">
                {restaurant.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              Domaća srpska kuhinja u srcu Novog Sada. Sveža gotova jela svakog
              radnog dana — skuvana sa puno ljubavi, baš kao kod kuće.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={restaurant.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-terracotta"
              >
                <InstagramGlyph className="size-[1.15rem]" />
              </a>
              <a
                href={restaurant.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-terracotta"
              >
                <FacebookGlyph className="size-[1.15rem]" />
              </a>
            </div>
          </div>

          {/* Navigacija */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Navigacija
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Kontakt
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-cream/75">
              <li>
                <a
                  href={restaurant.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 transition-colors hover:text-cream"
                >
                  <MapPinIcon className="mt-0.5 size-4 shrink-0 text-terracotta" />
                  {restaurant.addressFull}
                </a>
              </li>
              <li>
                <a
                  href={restaurant.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-cream"
                >
                  <PhoneIcon className="size-4 shrink-0 text-terracotta" />
                  {restaurant.phoneDisplay}
                </a>
              </li>
              <li className="pt-1 text-cream/60">
                Pon – Pet: 10:00 – 16:00
                <br />
                Vikendom ne radimo
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-7 text-xs text-cream/55 sm:flex-row">
          <p>
            © {year} {restaurant.name}. Sva prava zadržana.
          </p>
          <p>Kuvano sa ❤ u Novom Sadu.</p>
        </div>
      </div>
    </footer>
  );
}
