import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Smoothly scrolls to a section by id, using Lenis when available. */
export function scrollToSection(id: string) {
  if (typeof window === "undefined") return
  const target = document.getElementById(id)
  if (!target) return
  const lenis = (
    window as unknown as {
      lenis?: { scrollTo: (t: HTMLElement, o?: Record<string, unknown>) => void }
    }
  ).lenis
  if (lenis) {
    lenis.scrollTo(target, { offset: -64, duration: 1.2 })
  } else {
    target.scrollIntoView({ behavior: "smooth" })
  }
}

/** Formats a number as Serbian dinars, e.g. 1290 -> "1.290 RSD". */
export function formatRsd(value: number) {
  return `${new Intl.NumberFormat("sr-RS").format(value)} RSD`
}
