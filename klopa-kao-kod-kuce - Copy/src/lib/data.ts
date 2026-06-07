/**
 * Svi podaci o restoranu "Klopa kao kod kuće" su prikupljeni iz javno dostupnih
 * izvora (Google, RestaurantGuru, Foodyas, dnevni list Dnevnik, Instagram/Facebook
 * stranice restorana). Cene su realne, izražene u dinarima (RSD); gotova jela se
 * uglavnom mere i naplaćuju po 100 g.
 */

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&fit=crop`;

export const restaurant = {
  name: "Klopa kao kod kuće",
  shortName: "Klopa",
  tagline: "Domaća kuhinja, baš kao kod kuće.",
  city: "Novi Sad",
  address: "Cara Dušana 11a",
  addressFull: "Cara Dušana 11a, 21000 Novi Sad",
  phoneDisplay: "065 / 506 17 88",
  phoneHref: "tel:+381655061788",
  rating: 4.8,
  reviews: 137,
  yearsOpen: 8,
  dailyDishes: 12,
  deliveryFee: 380,
  owner: "Jasmina Nikolić",
  instagram: "https://www.instagram.com/klopa_kao_kod_kuce/",
  facebook: "https://www.facebook.com/klopa.kao.kod.kuce/",
  mapsEmbed:
    "https://www.google.com/maps?q=Cara+Du%C5%A1ana+11a,+Novi+Sad&z=16&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Klopa+kao+kod+ku%C4%87e+Cara+Du%C5%A1ana+11a+Novi+Sad",
};

export const images = {
  hero: img("photo-1504674900247-0877df9cc836", 2000),
  aboutPrimary: img("photo-1414235077428-338989a2e8c0", 1300),
  aboutSecondary: img("photo-1482049016688-2d3e1b311543", 900),
  contact: img("photo-1517248135467-4c7edcad34c4", 1300),
};

export const navLinks = [
  { id: "danas", label: "Jela od danas" },
  { id: "meni", label: "Meni" },
  { id: "o-nama", label: "O nama" },
  { id: "galerija", label: "Galerija" },
  { id: "kontakt", label: "Kontakt" },
];

export const hours = [
  { day: "Ponedeljak", time: "10:00 – 16:00", closed: false },
  { day: "Utorak", time: "10:00 – 16:00", closed: false },
  { day: "Sreda", time: "10:00 – 16:00", closed: false },
  { day: "Četvrtak", time: "10:00 – 16:00", closed: false },
  { day: "Petak", time: "10:00 – 16:00", closed: false },
  { day: "Subota", time: "Zatvoreno", closed: true },
  { day: "Nedelja", time: "Zatvoreno", closed: true },
];

export type Dish = {
  name: string;
  price: number;
  /** Jedinica mere: "100g", "kom", "porcija" */
  unit: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  items: (Dish & { description?: string; signature?: boolean })[];
};

export const menu: MenuCategory[] = [
  {
    id: "glavna",
    name: "Glavna jela",
    blurb: "Srce kuhinje — sve kuvano istog jutra, kao nedeljni ručak.",
    image: img("photo-1432139555190-58524dae6a55", 1100),
    items: [
      {
        name: "Sarma",
        description: "Kiseli kupus punjen mlevenim mesom i pirinčem, dinstano satima.",
        price: 120,
        unit: "100g",
        signature: true,
      },
      {
        name: "Punjene paprike",
        description: "Babure punjene mesom i pirinčem u paradajz sosu.",
        price: 120,
        unit: "100g",
      },
      {
        name: "Gulaš",
        description: "Gusti juneći gulaš sa puno crnog luka i domaće aleve paprike.",
        price: 120,
        unit: "100g",
        signature: true,
      },
      {
        name: "Lazanje",
        description: "Slojevi testa, bolonjeze i bešamela, zapečeni do zlatne kore.",
        price: 120,
        unit: "100g",
      },
      {
        name: "Pileće karađorđeve",
        description: "Rolovana pohovana piletina punjena kajmakom.",
        price: 139,
        unit: "100g",
        signature: true,
      },
      {
        name: "Pohovano belo meso",
        description: "Hrskavo pohovani pileći file.",
        price: 120,
        unit: "100g",
      },
    ],
  },
  {
    id: "prilozi",
    name: "Prilozi",
    blurb: "Ono što ide uz svako pravo domaće jelo.",
    image: img("photo-1473093295043-cdd812d0e601", 1100),
    items: [
      { name: "Pire krompir", description: "Kremasti pire sa puterom.", price: 50, unit: "100g" },
      { name: "Đuveč", description: "Pirinač sa povrćem i paradajzom.", price: 60, unit: "100g" },
      { name: "Rizi-bizi", description: "Pirinač sa mladim graškom.", price: 60, unit: "100g" },
      { name: "Spanać", description: "Dinstani spanać sa belim lukom.", price: 70, unit: "100g" },
    ],
  },
  {
    id: "supe",
    name: "Supe i čorbe",
    blurb: "Topla kašika za početak — lek za svaki dan.",
    image: img("photo-1607330289024-1535c6b4e1c1", 1100),
    items: [
      {
        name: "Domaća pileća supa",
        description: "Sa mesom i rezancima ili flekicama.",
        price: 110,
        unit: "porcija",
        signature: true,
      },
      { name: "Goveđa supa", description: "Bistra supa sa rezancima.", price: 30, unit: "100g" },
      { name: "Bela čorba", description: "Kremasta čorba od povrća.", price: 30, unit: "100g" },
    ],
  },
  {
    id: "salate",
    name: "Salate",
    blurb: "Sveže i kiselo — tačno onako kako treba.",
    image: img("photo-1546069901-ba9599a7e63c", 1100),
    items: [
      { name: "Kupus salata", description: "Rendani kupus sa uljem i sirćetom.", price: 50, unit: "100g" },
      { name: "Cvekla", description: "Pečena cvekla.", price: 50, unit: "100g" },
    ],
  },
  {
    id: "deserti",
    name: "Deserti",
    blurb: "Za kraj — kao iz bakine šerpe.",
    image: img("photo-1565958011703-44f9829ba187", 1100),
    items: [
      {
        name: "Žuti kolač sa višnjama",
        description: "Sočan biskvit sa višnjama.",
        price: 150,
        unit: "kom",
        signature: true,
      },
      { name: "Sutlijaš", description: "Kremasti pirinač sa cimetom.", price: 120, unit: "kom" },
    ],
  },
];

export type WeekdayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type DailyMenu = {
  key: WeekdayKey;
  short: string;
  label: string;
  /** Glavno jelo dana (naziv) */
  signature: string;
  image: string;
  dishes: Dish[];
};

export const dailyMenus: DailyMenu[] = [
  {
    key: "monday",
    short: "Pon",
    label: "Ponedeljak",
    signature: "Sarma",
    image: img("photo-1455619452474-d2be8b1e70cd", 1100),
    dishes: [
      { name: "Goveđa supa", price: 30, unit: "100g" },
      { name: "Sarma", price: 120, unit: "100g" },
      { name: "Pire krompir", price: 50, unit: "100g" },
      { name: "Kupus salata", price: 50, unit: "100g" },
    ],
  },
  {
    key: "tuesday",
    short: "Uto",
    label: "Utorak",
    signature: "Pohovano belo meso",
    image: img("photo-1432139555190-58524dae6a55", 1100),
    dishes: [
      { name: "Domaća pileća supa", price: 110, unit: "porcija" },
      { name: "Pohovano belo meso", price: 120, unit: "100g" },
      { name: "Rizi-bizi", price: 60, unit: "100g" },
      { name: "Cvekla", price: 50, unit: "100g" },
    ],
  },
  {
    key: "wednesday",
    short: "Sre",
    label: "Sreda",
    signature: "Gulaš",
    image: img("photo-1607330289024-1535c6b4e1c1", 1100),
    dishes: [
      { name: "Bela čorba", price: 30, unit: "100g" },
      { name: "Gulaš", price: 120, unit: "100g" },
      { name: "Pire krompir", price: 50, unit: "100g" },
      { name: "Kupus salata", price: 50, unit: "100g" },
    ],
  },
  {
    key: "thursday",
    short: "Čet",
    label: "Četvrtak",
    signature: "Pileće karađorđeve",
    image: img("photo-1476224203421-9ac39bcb3327", 1100),
    dishes: [
      { name: "Goveđa supa", price: 30, unit: "100g" },
      { name: "Pileće karađorđeve", price: 139, unit: "100g" },
      { name: "Đuveč", price: 60, unit: "100g" },
      { name: "Cvekla", price: 50, unit: "100g" },
    ],
  },
  {
    key: "friday",
    short: "Pet",
    label: "Petak",
    signature: "Lazanje",
    image: img("photo-1533777324565-a040eb52facd", 1100),
    dishes: [
      { name: "Domaća pileća supa", price: 110, unit: "porcija" },
      { name: "Lazanje", price: 120, unit: "100g" },
      { name: "Spanać", price: 70, unit: "100g" },
      { name: "Žuti kolač sa višnjama", price: 150, unit: "kom" },
    ],
  },
];

/** Vraća ključ radnog dana za prosleđeni Date; vikend -> null. */
export function weekdayKeyFromDate(date: Date): WeekdayKey | null {
  const map: Record<number, WeekdayKey | null> = {
    0: null, // nedelja
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: null, // subota
  };
  return map[date.getDay()];
}

export type GalleryImage = {
  src: string;
  full: string;
  alt: string;
  /** visina kartice u masonry rasporedu */
  span: "short" | "tall";
};

const gallerySources: { id: string; alt: string; span: "short" | "tall" }[] = [
  { id: "photo-1504674900247-0877df9cc836", alt: "Bogata trpeza domaćih jela", span: "tall" },
  { id: "photo-1607330289024-1535c6b4e1c1", alt: "Topla domaća čorba", span: "short" },
  { id: "photo-1533777324565-a040eb52facd", alt: "Zapečene lazanje iz rerne", span: "short" },
  { id: "photo-1551183053-bf91a1d81141", alt: "Testenina sa mesom i sosom", span: "tall" },
  { id: "photo-1546069901-ba9599a7e63c", alt: "Sveža šarena salata", span: "short" },
  { id: "photo-1540189549336-e6e99c3679fe", alt: "Zelena salata sa orasima", span: "tall" },
  { id: "photo-1473093295043-cdd812d0e601", alt: "Domaća testenina sa povrćem", span: "short" },
  { id: "photo-1559054663-e8d23213f55c", alt: "Topli pečeni sendvič", span: "tall" },
  { id: "photo-1490645935967-10de6ba17061", alt: "Tanjir za dobar početak dana", span: "short" },
  { id: "photo-1606787366850-de6330128bfc", alt: "Sto pun domaćih kolača", span: "short" },
  { id: "photo-1565958011703-44f9829ba187", alt: "Parče domaće torte", span: "tall" },
  { id: "photo-1414235077428-338989a2e8c0", alt: "Prijatan ambijent uz dobar obrok", span: "short" },
];

export const gallery: GalleryImage[] = gallerySources.map((g) => ({
  src: img(g.id, 800),
  full: img(g.id, 1800),
  alt: g.alt,
  span: g.span,
}));

export const stats = [
  { value: restaurant.yearsOpen, suffix: "", label: "godina kuvamo za vas" },
  { value: restaurant.dailyDishes, suffix: "+", label: "gotovih jela svaki dan" },
  { value: restaurant.rating, suffix: "", label: "prosečna ocena na Google-u", decimals: 1 },
  { value: 100, suffix: "%", label: "domaće i sveže pripremljeno" },
];
