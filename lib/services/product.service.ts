import { productRepo, collectionRepo } from "../repositories";
import type { ProductFilter, PaginationParams } from "../repositories/interfaces";

export async function getProducts(filter: ProductFilter, pagination: PaginationParams) {
  return productRepo.findAll(filter, pagination);
}

export async function getProductById(id: string) {
  return productRepo.findById(id);
}

export async function getProductBySlug(slug: string) {
  return productRepo.findBySlug(slug);
}

export async function getCollections() {
  return collectionRepo.findAll();
}

export async function getCollectionBySlug(slug: string) {
  const collection = await collectionRepo.findBySlug(slug);
  if (!collection) return null;

  const products = await productRepo.findAll(
    { collection_id: collection.id },
    { page: 1, limit: 100 },
  );

  return { ...collection, products: products.data };
}

// Price helpers — cents <-> display
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export function parsePriceToCents(dollars: number): number {
  return Math.round(dollars * 100);
}
