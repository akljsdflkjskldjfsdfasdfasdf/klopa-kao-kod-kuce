"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MenuIcon, PhoneIcon, UtensilsCrossedIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, restaurant } from "@/lib/data";
import { cn, scrollToSection } from "@/lib/utils";

function scrollToTop() {
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } })
    .lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (open) return;
    if (latest > previous && latest > 220) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8",
          scrolled
            ? "mt-2 sm:mt-3"
            : "mt-0"
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-300 sm:px-5",
            scrolled
              ? "bg-background/80 shadow-[0_10px_40px_-20px_rgba(80,40,10,0.55)] ring-1 ring-border backdrop-blur-md"
              : "bg-transparent ring-1 ring-transparent"
          )}
        >
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2.5"
            aria-label="Na vrh strane"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-terracotta text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <UtensilsCrossedIcon className="size-[1.05rem]" />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-heading text-base font-bold tracking-tight transition-colors",
                  scrolled ? "text-foreground" : "text-cream text-shadow-soft"
                )}
              >
                {restaurant.name}
              </span>
              <span
                className={cn(
                  "text-[0.62rem] font-medium uppercase tracking-[0.22em] transition-colors",
                  scrolled ? "text-muted-foreground" : "text-cream/75 text-shadow-soft"
                )}
              >
                {restaurant.city}
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                    : "text-cream/85 text-shadow-soft hover:bg-white/10 hover:text-cream"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle
              className={cn("hidden sm:inline-flex", !scrolled && "text-cream hover:text-cream")}
            />
            <Button
              render={<a href={restaurant.phoneHref} />}
              nativeButton={false}
              size="sm"
              className="hidden rounded-full sm:inline-flex"
            >
              <PhoneIcon />
              Poruči
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("lg:hidden", !scrolled && "text-cream hover:text-cream")}
                    aria-label="Otvori meni"
                  />
                }
              >
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="right" className="w-[78%] max-w-sm gap-0 p-0">
                <SheetTitle className="flex items-center gap-2.5 border-b border-border p-5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-terracotta text-primary-foreground">
                    <UtensilsCrossedIcon className="size-[1.05rem]" />
                  </span>
                  <span className="font-heading text-lg font-bold">
                    {restaurant.name}
                  </span>
                </SheetTitle>

                <div className="flex flex-col p-3">
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.id}
                      render={
                        <button
                          onClick={() => scrollToSection(link.id)}
                          className="flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium text-foreground transition-colors hover:bg-muted"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3 border-t border-border p-5">
                  <Button
                    render={<a href={restaurant.phoneHref} />}
                    nativeButton={false}
                    size="lg"
                    className="w-full rounded-full"
                  >
                    <PhoneIcon />
                    {restaurant.phoneDisplay}
                  </Button>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tema</span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
