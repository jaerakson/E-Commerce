export type BadgeVariant = "new" | "limited";

export interface Product {
  id: string;
  name: string;
  /** Price in KRW as a plain integer — formatting is a view concern. */
  price: number;
  image: string;
  /** Intrinsic image dimensions, required by next/image for zero CLS. */
  imageWidth: number;
  imageHeight: number;
  badge?: { label: string; variant: BadgeVariant };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Archetype Leather Pack",
    price: 345000,
    image: "/assets/products/archetype-leather-pack.jpg",
    imageWidth: 800,
    imageHeight: 533,
    badge: { label: "NEW", variant: "new" },
  },
  {
    id: "2",
    name: "Chrono Dark Edition",
    price: 789000,
    image: "/assets/products/chrono-dark-edition.jpg",
    imageWidth: 800,
    imageHeight: 581,
    badge: { label: "LIMITED", variant: "limited" },
  },
  {
    id: "3",
    name: "Acoustic Studio Headphone",
    price: 490000,
    image: "/assets/products/acoustic-studio-headphone.jpg",
    imageWidth: 800,
    imageHeight: 533,
  },
  {
    id: "4",
    name: "Noir Essence Fragrance",
    price: 185000,
    image: "/assets/products/noir-essence-fragrance.jpg",
    imageWidth: 800,
    imageHeight: 1150,
  },
];
