"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { config } from "@/lib/config";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Dana" },
  { key: "hours", label: "Sati" },
  { key: "minutes", label: "Minuta" },
  { key: "seconds", label: "Sekundi" },
];

/**
 * Spoljni "store" za preostale sekunde do cilja.
 * useSyncExternalStore je React-ov preporučeni način za sinhronizaciju sa
 * spoljnim promenljivim izvorom (ovde: vreme) — hydration-safe je
 * (server vrati null -> stabilan placeholder) i nema setState u efektu.
 */
function makeTimeStore(target: number) {
  return {
    subscribe(onChange: () => void) {
      const id = setInterval(onChange, 1000);
      return () => clearInterval(id);
    },
    // Vrednost je ceo broj sekundi -> stabilna između poziva u istom renderu.
    getSnapshot: () => Math.max(0, Math.floor((target - Date.now()) / 1000)),
    // Na serveru / pri hidrataciji nemamo vreme -> placeholder.
    getServerSnapshot: (): number | null => null,
  };
}

export default function Countdown() {
  const target = useMemo(
    () => new Date(config.weddingDateISO).getTime(),
    []
  );
  const store = useMemo(() => makeTimeStore(target), [target]);
  const totalSeconds = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const time: TimeLeft | null = useMemo(() => {
    if (totalSeconds === null) return null;
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }, [totalSeconds]);

  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".countdown-head > *", {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".countdown-head", start: "top 82%" },
        });
        gsap.from(".countdown-box", {
          autoAlpha: 0,
          y: 40,
          scale: 0.85,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".countdown-grid", start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-linear-to-br from-bordo via-bordo-dark to-bordo-dark px-6 py-24 text-center sm:py-32"
    >
      <div className="countdown-head mx-auto mb-14 max-w-2xl">
        <p className="font-script text-4xl text-gold-light sm:text-5xl">
          {config.countdown.title}
        </p>
        <p className="mt-3 font-sans text-sm uppercase tracking-[0.25em] text-cream/70">
          {config.countdown.subtitle}
        </p>
      </div>

      <div className="countdown-grid mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-6">
        {UNITS.map((u) => (
          <CountdownBox
            key={u.key}
            value={time ? time[u.key] : null}
            label={u.label}
          />
        ))}
      </div>
    </section>
  );
}

function CountdownBox({
  value,
  label,
}: {
  value: number | null;
  label: string;
}) {
  const numberRef = useRef<HTMLDivElement>(null);
  const prev = useRef<number | null>(null);

  useEffect(() => {
    if (value === null) return;
    if (prev.current !== null && prev.current !== value && numberRef.current) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!reduce) {
        gsap.fromTo(
          numberRef.current,
          { yPercent: -40, autoAlpha: 0.3 },
          { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" }
        );
      }
    }
    prev.current = value;
  }, [value]);

  return (
    <div className="countdown-box flex flex-col items-center rounded-2xl border border-gold/30 bg-white/5 px-2 py-5 backdrop-blur-sm sm:px-4 sm:py-7">
      <div
        ref={numberRef}
        className="font-serif text-4xl font-semibold tabular-nums text-cream-light sm:text-6xl"
      >
        {value === null ? "—" : String(value).padStart(2, "0")}
      </div>
      <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-gold-light sm:text-xs">
        {label}
      </div>
    </div>
  );
}
