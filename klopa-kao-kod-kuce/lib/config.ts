// =============================================================
//  JEDINO MESTO ZA IZMENE SADRŽAJA
//  Promeni imena, datum, lokacije, slike i tekstove ovde.
//  Komponente same povlače sve odavde.
// =============================================================

export type WeddingEvent = {
  /** Mala oznaka iznad naziva, npr. "Venčanje" / "Proslava" */
  title: string;
  /** Naziv objekta */
  name: string;
  /** Adresa */
  address: string;
  /** Datum + vreme (slobodan tekst) */
  time: string;
  /** Link koji otvara lokaciju u Google Maps aplikaciji/sajtu */
  mapsUrl: string;
  /** Link za <iframe> embed mape (output=embed) */
  embedUrl: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  /** Mala reč/naslov preko slike */
  caption: string;
  /** Kratak romantičan opis ispod naslova */
  quote: string;
};

export const config = {
  // ---- Imena ----
  groom: "Nikola",
  bride: "Sara",
  amp: "&",

  // ---- Datum venčanja ----
  // ISO format (lokalno vreme) — koristi ga countdown. Promeni i labele ispod.
  weddingDateISO: "2026-09-19T16:00:00",
  weddingDateLabel: "19. septembar 2026.",
  weddingDayLabel: "Subota",

  // ---- Domen (Netlify) ----
  // Bitno za apsolutne OG linkove kad se deli na WhatsApp/Viber/IG.
  siteUrl: "https://nikola-i-sara.netlify.app",

  // ---- Hero (intro) ----
  hero: {
    kicker: "Sa radošću vas pozivamo",
    scrollHint: "Skrolujte",
  },

  // ---- Countdown ----
  countdown: {
    title: "Još malo nas deli",
    subtitle: "do najlepšeg dana",
  },

  // ---- Galerija / priča ----
  story: {
    title: "Naša priča",
    subtitle: "Nekoliko trenutaka pre velikog dana",
  },

  // Privremene slike sa Unsplash-a (slobodne za korišćenje).
  // ZAMENA: ubaci svoju sliku u public/images/ i promeni src u
  // npr. "/images/gallery-1.jpg".
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80",
      alt: "Mladenci u zagrljaju",
      caption: "Prvi pogled",
      quote: "Onog trenutka kada smo se sreli, sve je dobilo smisao.",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80",
      alt: "Mlada i mladoženja",
      caption: "Prva ljubav",
      quote: "Svaki dan pored tebe je novi razlog za osmeh.",
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=80",
      alt: "Šetnja kroz prirodu",
      caption: "Naši koraci",
      quote: "Zajedno smo prešli put do ovog najlepšeg dana.",
    },
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2000&q=80",
      alt: "Poljubac mladenaca",
      caption: "Obećanje",
      quote: "Biraću tebe, danas i svakog dana zauvek.",
    },
    {
      src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=2000&q=80",
      alt: "Ruka u ruci",
      caption: "Ruka u ruci",
      quote: "U tvojoj ruci pronašao sam svoj dom.",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
      alt: "Sto spreman za proslavu",
      caption: "Veliki dan",
      quote: "Vreme je da naša ljubav postane večna.",
    },
  ] as GalleryImage[],

  // ---- Detalji događaja ----
  events: [
    {
      title: "Venčanje",
      name: "Hram Svetog Save",
      address: "Krušedolska 2a, Beograd",
      time: "Subota, 19.09.2026. u 16:00",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Hram+Svetog+Save+Beograd",
      embedUrl:
        "https://maps.google.com/maps?q=Hram%20Svetog%20Save%20Beograd&z=15&output=embed",
    },
    {
      title: "Proslava",
      name: "Hotel Moskva",
      address: "Terazije 20, Beograd",
      time: "Subota, 19.09.2026. u 20:00",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Hotel+Moskva+Beograd",
      embedUrl:
        "https://maps.google.com/maps?q=Hotel%20Moskva%20Beograd&z=15&output=embed",
    },
  ] as WeddingEvent[],

  // ---- Završna sekcija ----
  closing: {
    title: "Radujemo se da vas vidimo",
    message:
      "Vaše prisustvo je najlepši poklon koji možemo da poželimo. Proslavimo ljubav zajedno.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80",
  },
} as const;

export type SiteConfig = typeof config;
