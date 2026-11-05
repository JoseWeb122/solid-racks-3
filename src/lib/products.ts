export type Category = "men" | "women" | "accessories";
export type Availability = "in-stock" | "low-stock";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  type: string;
  colors: ColorOption[];
  sizes: string[];
  images: string[];
  isNew: boolean;
  isBestSeller: boolean;
  featured: number;
  added: number;
  sales: number;
  availability: Availability;
  description: string;
  details: string[];
  fabric: string;
  fit: string;
  keywords: string[];
  completeLook: string[];
}

const px = (id: number, ext: "jpeg" | "png" = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=1100`;

export const C = {
  black: { name: "Black", hex: "#0b0b0b" },
  white: { name: "White", hex: "#ffffff" },
  stone: { name: "Stone", hex: "#b9b0a2" },
  charcoal: { name: "Charcoal", hex: "#3a3a3c" },
  washedGray: { name: "Washed Gray", hex: "#8f8f8c" },
  olive: { name: "Olive", hex: "#5b5c3d" },
  sand: { name: "Sand", hex: "#c9b48f" },
  cream: { name: "Cream", hex: "#efe7d6" },
  gray: { name: "Gray", hex: "#9a9a9a" },
  taupe: { name: "Taupe", hex: "#8b7d6b" },
  natural: { name: "Natural", hex: "#e8dfcb" },
} satisfies Record<string, ColorOption>;

const MEN_SIZES = ["S", "M", "L", "XL", "XXL"];
const WOMEN_SIZES = ["XS", "S", "M", "L", "XL"];
const ONE = ["One Size"];

export const products: Product[] = [
  {
    id: "p01", slug: "sr-signature-oversized-hoodie", name: "SR Signature Oversized Hoodie", price: 68,
    category: "men", type: "Hoodies", colors: [C.black, C.stone, C.charcoal], sizes: MEN_SIZES,
    images: [px(30257616), px(28701960), px(15127546)],
    isNew: false, isBestSeller: true, featured: 1, added: 3, sales: 1, availability: "in-stock",
    description: "Designed for everyday expression, the SR Signature Oversized Hoodie brings together a relaxed silhouette, contemporary styling, and effortless streetwear appeal.",
    details: ["Dropped shoulders and boxy, oversized body", "Double-layer hood with flat drawcords", "Kangaroo pocket with clean bound edges", "Tonal SR embroidery with gold-thread accent"],
    fabric: "Heavyweight brushed-back cotton fleece (illustrative specification).", fit: "Oversized fit. Size down for a closer silhouette.",
    keywords: ["hoodie", "fleece", "oversized", "black", "essential", "top"], completeLook: ["p03", "p11", "p15"],
  },
  {
    id: "p02", slug: "urban-heavyweight-tee", name: "Urban Heavyweight Tee", price: 38,
    category: "men", type: "Tees", colors: [C.black, C.white, C.washedGray], sizes: MEN_SIZES,
    images: [px(8217461), px(25457430), px(17515211)],
    isNew: true, isBestSeller: true, featured: 4, added: 14, sales: 2, availability: "in-stock",
    description: "A structured heavyweight tee with a boxy cut and a dense hand-feel. The foundation of every Solid Racks look — clean, confident, and built to wear on repeat.",
    details: ["Boxy, slightly cropped body", "Thick ribbed crew neckline", "Dropped shoulder seams", "Small SR mark at the back neck"],
    fabric: "Heavyweight cotton jersey (illustrative specification).", fit: "Relaxed boxy fit. True to size.",
    keywords: ["tee", "t-shirt", "shirt", "heavyweight", "white", "top", "basics"], completeLook: ["p03", "p13", "p14"],
  },
  {
    id: "p03", slug: "street-culture-cargo-pants", name: "Street Culture Cargo Pants", price: 75,
    category: "men", type: "Pants", colors: [C.black, C.olive, C.sand], sizes: ["S", "M", "L", "XL"],
    images: [px(17400728), px(18393519), px(37054167)],
    isNew: false, isBestSeller: true, featured: 3, added: 5, sales: 3, availability: "low-stock",
    description: "Relaxed utility cargos with a tapered ankle and articulated knees. Made for movement, styled for the street, and finished with subtle gold-tone hardware.",
    details: ["Six-pocket utility construction", "Adjustable toggle cuffs", "Elasticated back waistband", "Gold-tone branded snap buttons"],
    fabric: "Cotton ripstop twill (illustrative specification).", fit: "Relaxed through the thigh, tapered at the ankle.",
    keywords: ["cargo", "pants", "trousers", "utility", "bottoms", "olive"], completeLook: ["p01", "p14", "p11"],
  },
  {
    id: "p04", slug: "everyday-essential-sweatshirt", name: "Everyday Essential Sweatshirt", price: 58,
    category: "men", type: "Sweatshirts", colors: [C.black, C.cream, C.gray], sizes: MEN_SIZES,
    images: [px(19168181), px(10034620), px(15484175)],
    isNew: true, isBestSeller: false, featured: 6, added: 13, sales: 7, availability: "in-stock",
    description: "A clean crewneck sweatshirt with a soft brushed interior. Minimal, versatile, and designed to layer through every season.",
    details: ["Ribbed crew neck, cuffs and hem", "Relaxed shoulder line", "Tonal chest embroidery", "Pre-shrunk for lasting shape"],
    fabric: "Midweight cotton-blend fleece (illustrative specification).", fit: "Relaxed fit. True to size.",
    keywords: ["sweatshirt", "crewneck", "jumper", "cream", "top"], completeLook: ["p03", "p13", "p16"],
  },
  {
    id: "p05", slug: "urban-utility-jacket", name: "Urban Utility Jacket", price: 95,
    category: "men", type: "Jackets", colors: [C.black, C.charcoal], sizes: MEN_SIZES,
    images: [px(19565723), px(37181729), px(36917228)],
    isNew: true, isBestSeller: false, featured: 2, added: 16, sales: 6, availability: "low-stock",
    description: "A structured utility jacket with clean lines and functional pockets. The statement layer that elevates every everyday fit.",
    details: ["Two-way metal zip with storm flap", "Four front utility pockets", "Adjustable cuffs and hem", "Interior phone pocket"],
    fabric: "Water-resistant cotton-nylon shell (illustrative specification).", fit: "Boxy, cropped fit. True to size.",
    keywords: ["jacket", "outerwear", "coat", "utility", "layer"], completeLook: ["p02", "p03", "p14"],
  },
  {
    id: "p06", slug: "sr-signature-cropped-hoodie", name: "SR Signature Cropped Hoodie", price: 62,
    category: "women", type: "Hoodies", colors: [C.black, C.cream, C.gray], sizes: WOMEN_SIZES,
    images: [px(11317811), px(11317814), px(28040595)],
    isNew: false, isBestSeller: true, featured: 1, added: 6, sales: 4, availability: "in-stock",
    description: "Our signature hoodie, re-cut with a cropped length and voluminous sleeves. Effortless shape with a confident edge.",
    details: ["Cropped boxy length", "Oversized balloon sleeves", "Raw-cut hem detail", "Gold-thread SR embroidery"],
    fabric: "Heavyweight brushed-back cotton fleece (illustrative specification).", fit: "Oversized cropped fit. True to size.",
    keywords: ["hoodie", "cropped", "crop", "fleece", "top", "women"], completeLook: ["p07", "p13", "p12"],
  },
  {
    id: "p07", slug: "relaxed-fit-street-sweatpants", name: "Relaxed Fit Street Sweatpants", price: 55,
    category: "women", type: "Pants", colors: [C.black, C.stone, C.charcoal], sizes: WOMEN_SIZES,
    images: [px(36264473), px(16775785), px(7331209)],
    isNew: false, isBestSeller: true, featured: 3, added: 4, sales: 5, availability: "in-stock",
    description: "Wide, relaxed sweatpants with a fluid drape and a high-rise waist. Comfortable enough for every day, refined enough for anywhere.",
    details: ["High-rise elastic waistband with drawcord", "Wide straight leg", "Deep side seam pockets", "Embroidered SR at hip"],
    fabric: "Brushed cotton fleece (illustrative specification).", fit: "Relaxed wide-leg fit. True to size.",
    keywords: ["sweatpants", "joggers", "pants", "bottoms", "lounge"], completeLook: ["p06", "p08", "p16"],
  },
  {
    id: "p08", slug: "womens-oversized-essential-tee", name: "Women's Oversized Essential Tee", price: 35,
    category: "women", type: "Tees", colors: [C.white, C.black, C.taupe], sizes: WOMEN_SIZES,
    images: [px(9558588), px(39820148), px(39820147)],
    isNew: true, isBestSeller: false, featured: 5, added: 15, sales: 9, availability: "in-stock",
    description: "An oversized essential tee with a soft, substantial feel. Tuck it, knot it, or wear it loose — it is yours to style.",
    details: ["Oversized dropped-shoulder cut", "Longline hem", "Ribbed crew neckline", "Minimal SR script at back"],
    fabric: "Heavyweight cotton jersey (illustrative specification).", fit: "Oversized fit. Size down for a closer look.",
    keywords: ["tee", "t-shirt", "oversized", "top", "basics", "white"], completeLook: ["p07", "p11", "p16"],
  },
  {
    id: "p09", slug: "urban-zip-up-jacket", name: "Urban Zip-Up Jacket", price: 85,
    category: "women", type: "Jackets", colors: [C.black, C.gray], sizes: WOMEN_SIZES,
    images: [px(37684193), px(34046625), px(15355514)],
    isNew: true, isBestSeller: false, featured: 2, added: 12, sales: 8, availability: "low-stock",
    description: "A sleek zip-up jacket with a structured collar and sculpted shoulders. Sharp enough to define the look, easy enough to live in.",
    details: ["Full-length gold-tone zip", "Funnel collar", "Zip side pockets", "Elasticated cuffs"],
    fabric: "Technical cotton-blend shell (illustrative specification).", fit: "Relaxed fit. True to size.",
    keywords: ["jacket", "zip", "outerwear", "layer", "women"], completeLook: ["p08", "p07", "p12"],
  },
  {
    id: "p10", slug: "streetwear-everyday-set", name: "Streetwear Everyday Set", price: 89,
    category: "women", type: "Sets", colors: [C.black, C.stone], sizes: WOMEN_SIZES,
    images: [px(6311677), px(34052918), px(24499685)],
    isNew: true, isBestSeller: false, featured: 4, added: 11, sales: 10, availability: "in-stock",
    description: "A coordinated hoodie and sweatpant set, designed to be worn together or apart. One decision, a complete look.",
    details: ["Includes oversized hoodie and relaxed sweatpants", "Matching tonal embroidery", "Ribbed trims throughout", "Gold-tone aglets"],
    fabric: "Brushed cotton fleece (illustrative specification).", fit: "Relaxed fit. True to size.",
    keywords: ["set", "tracksuit", "matching", "two-piece", "co-ord", "lounge"], completeLook: ["p13", "p16", "p15"],
  },
  {
    id: "p11", slug: "sr-classic-structured-cap", name: "SR Classic Structured Cap", price: 28,
    category: "accessories", type: "Headwear", colors: [C.black, C.white], sizes: ONE,
    images: [px(12005662), px(16166738), px(32028599)],
    isNew: false, isBestSeller: true, featured: 1, added: 2, sales: 2, availability: "in-stock",
    description: "A six-panel structured cap with a curved brim and embroidered SR monogram. The finishing touch for every fit.",
    details: ["Structured six-panel crown", "Pre-curved brim", "Embroidered SR monogram", "Adjustable strap with gold-tone buckle"],
    fabric: "Cotton twill (illustrative specification).", fit: "One size, adjustable.",
    keywords: ["cap", "hat", "headwear", "baseball", "accessory"], completeLook: ["p01", "p03", "p14"],
  },
  {
    id: "p12", slug: "urban-crossbody-bag", name: "Urban Crossbody Bag", price: 42,
    category: "accessories", type: "Bags", colors: [C.black, C.olive], sizes: ONE,
    images: [px(15831353), px(36209790), px(14882684)],
    isNew: true, isBestSeller: false, featured: 3, added: 10, sales: 11, availability: "in-stock",
    description: "A compact crossbody that keeps your essentials close. Clean silhouette, adjustable strap, and polished hardware.",
    details: ["Main zip compartment", "Front quick-access pocket", "Adjustable webbing strap", "Gold-tone zip pulls"],
    fabric: "Recycled nylon (illustrative specification).", fit: "One size.",
    keywords: ["bag", "crossbody", "accessory", "pouch"], completeLook: ["p06", "p09", "p08"],
  },
  {
    id: "p13", slug: "signature-ribbed-beanie", name: "Signature Ribbed Beanie", price: 24,
    category: "accessories", type: "Headwear", colors: [C.black, C.gray, C.cream], sizes: ONE,
    images: [px(7301578), px(10157834), px(10280623)],
    isNew: false, isBestSeller: false, featured: 4, added: 1, sales: 12, availability: "in-stock",
    description: "A chunky ribbed beanie with a deep fold-up cuff and woven SR label. Cold-weather staple, all-season attitude.",
    details: ["Deep fold-up cuff", "Chunky rib knit", "Woven SR label", "Soft stretch fit"],
    fabric: "Soft acrylic-wool blend (illustrative specification).", fit: "One size.",
    keywords: ["beanie", "hat", "knit", "headwear", "winter"], completeLook: ["p04", "p03", "p12"],
  },
  {
    id: "p14", slug: "sr-street-utility-bag", name: "SR Street Utility Bag", price: 48,
    category: "accessories", type: "Bags", colors: [C.black, C.charcoal], sizes: ONE,
    images: [px(9319350), px(5236963), px(9941239)],
    isNew: false, isBestSeller: true, featured: 2, added: 7, sales: 6, availability: "low-stock",
    description: "A functional sling bag with multiple compartments and a padded back panel. Built for the city, styled for you.",
    details: ["Multi-compartment interior", "Padded back panel", "Quick-release buckle strap", "Embossed SR patch"],
    fabric: "Durable technical nylon (illustrative specification).", fit: "One size.",
    keywords: ["bag", "sling", "utility", "accessory", "chest bag"], completeLook: ["p05", "p03", "p11"],
  },
  {
    id: "p15", slug: "minimal-street-socks", name: "Minimal Street Socks", price: 16,
    category: "accessories", type: "Socks", colors: [C.white, C.black], sizes: ONE,
    images: [px(15398044), px(12739982), px(18368126)],
    isNew: false, isBestSeller: false, featured: 5, added: 8, sales: 13, availability: "in-stock",
    description: "Cushioned crew socks with a ribbed cuff and knitted SR mark. Small detail, solid finish.",
    details: ["Cushioned footbed", "Ribbed crew cuff", "Knitted SR mark", "Reinforced heel and toe"],
    fabric: "Combed cotton blend (illustrative specification).", fit: "One size (fits most).",
    keywords: ["socks", "crew", "accessory", "basics"], completeLook: ["p02", "p03", "p11"],
  },
  {
    id: "p16", slug: "sr-signature-tote", name: "SR Signature Tote", price: 32,
    category: "accessories", type: "Bags", colors: [C.black, C.natural], sizes: ONE,
    images: [px(6786665), px(9878722), px(4068314)],
    isNew: false, isBestSeller: false, featured: 6, added: 9, sales: 14, availability: "in-stock",
    description: "A heavyweight canvas tote with the SOLID Racks wordmark. Carries everything, says enough.",
    details: ["Heavyweight canvas", "Reinforced shoulder straps", "Interior slip pocket", "Printed SOLID Racks wordmark"],
    fabric: "Heavyweight cotton canvas (illustrative specification).", fit: "One size.",
    keywords: ["tote", "bag", "canvas", "accessory", "shopper"], completeLook: ["p08", "p07", "p13"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);

export const CATEGORY_LABEL: Record<Category, string> = { men: "Men", women: "Women", accessories: "Accessories" };

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return products.filter((p) => {
    const hay = [p.name, p.category, CATEGORY_LABEL[p.category], p.type, ...p.colors.map((c) => c.name), ...p.keywords,
      p.isNew ? "new arrivals new" : "", p.isBestSeller ? "best seller bestseller" : ""].join(" ").toLowerCase();
    return terms.every((t) => hay.includes(t) || (t.endsWith("s") && hay.includes(t.slice(0, -1))));
  });
}

export type CollectionSlug = "men" | "women" | "accessories" | "new-arrivals" | "best-sellers";

export interface CollectionConfig {
  slug: CollectionSlug;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  position?: string;
  filter: (p: Product) => boolean;
}

export const collections: CollectionConfig[] = [
  { slug: "men", title: "Men", eyebrow: "Men's Collection", headline: "Everyday essentials with an urban edge.",
    description: "Oversized hoodies, heavyweight tees, utility cargos and structured outerwear — built for movement and made to be worn your way.",
    image: "/images/col-men.jpg", position: "center 30%", filter: (p) => p.category === "men" },
  { slug: "women", title: "Women", eyebrow: "Women's Collection", headline: "Modern silhouettes. Effortless expression.",
    description: "Cropped hoodies, relaxed sweatpants, sleek zip-ups and coordinated sets — confident shapes for every day.",
    image: "/images/col-women.jpg", position: "center 30%", filter: (p) => p.category === "women" },
  { slug: "accessories", title: "Accessories", eyebrow: "Accessories", headline: "Finish your look with the right details.",
    description: "Structured caps, ribbed beanies, utility bags and everyday carry — the details that make the fit.",
    image: "/images/col-accessories.jpg", position: "center", filter: (p) => p.category === "accessories" },
  { slug: "new-arrivals", title: "New Arrivals", eyebrow: "Just Landed", headline: "Fresh pieces. New energy.",
    description: "The latest additions to the Solid Racks lineup. New silhouettes and updated essentials for men and women.",
    image: px(19461581), position: "center 25%", filter: (p) => p.isNew },
  { slug: "best-sellers", title: "Best Sellers", eyebrow: "The Solid Selection", headline: "The pieces everyone reaches for.",
    description: "Our most-loved styles — the signature hoodies, heavyweight tees and everyday accessories that define the brand.",
    image: px(18956666), position: "center 20%", filter: (p) => p.isBestSeller },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const EDITORIAL = {
  newArrivalsCard: px(15340663),
  about: px(3894527),
};

export const formatPrice = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;
