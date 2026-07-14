import { getClient } from "./connection";
import { migrate } from "./schema";
import { v4 as uuid } from "uuid";
import type { InStatement } from "@libsql/client";

export async function seed(): Promise<void> {
  await migrate();
  const client = getClient();

  // Skip if already seeded
  const countResult = await client.execute("SELECT COUNT(*) as c FROM products");
  if (Number(countResult.rows[0].c) > 0) return;

  // ── Collections ───────────────────────────────────────
  const collections = [
    { id: uuid(), name: "Chronos Collection", slug: "chronos", description: "Precision timepieces for those who command time.", image_url: "/assets/stitch/stitch-01.jpg" },
    { id: uuid(), name: "Outerwear Essentials", slug: "outerwear", description: "Architectural silhouettes engineered for the elements.", image_url: "/assets/stitch/stitch-14.jpg" },
    { id: uuid(), name: "Accessories Vault", slug: "accessories", description: "Refined finishing touches that define your statement.", image_url: "/assets/stitch/stitch-15.jpg" },
    { id: uuid(), name: "Winter Essentials", slug: "winter-essentials", description: "High-performance technical layers for the sub-zero urban explorer.", image_url: "/assets/stitch/stitch-33.jpg" },
  ];

  const colMap = Object.fromEntries(collections.map((c) => [c.slug, c.id]));

  // ── Products ──────────────────────────────────────────
  const products = [
    { id: uuid(), name: "Chronos Timepiece", slug: "chronos-timepiece", description: "Engineered for precision. The Chronos represents the pinnacle of modern horology, combining architectural steel construction with a complex automatic movement, designed for those who command time.", price: 245000, image_url: "/assets/stitch/stitch-01.jpg", badge: "New Arrival", category: "Watches", material: "Brushed Steel", collection_id: colMap["chronos"], sizes: null, colors: JSON.stringify(["Steel", "Black"]) },
    { id: uuid(), name: "Obsidian Tote", slug: "obsidian-tote", description: "Handcrafted Italian calfskin tote with magnetic closure and interior organizer.", price: 89000, image_url: "/assets/stitch/stitch-02.jpg", badge: "Bestseller", category: "Accessories", material: "Italian Calfskin", collection_id: colMap["accessories"], sizes: null, colors: JSON.stringify(["Black", "Cognac"]) },
    { id: uuid(), name: "Architect Blazer", slug: "architect-blazer", description: "A structural masterpiece in wool. Sharp shoulders meet a relaxed drape for effortless authority.", price: 120000, image_url: "/assets/stitch/stitch-40.jpg", badge: "Bestseller", category: "Outerwear", material: "Structured Wool", collection_id: colMap["outerwear"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Black", "Charcoal"]) },
    { id: uuid(), name: "Eclipse Eyewear", slug: "eclipse-eyewear", description: "Ultra-lightweight matte acetate frames with UV400 polarized lenses.", price: 42000, image_url: "/assets/stitch/stitch-15.jpg", badge: "Bestseller", category: "Eyewear", material: "Matte Acetate", collection_id: colMap["accessories"], sizes: null, colors: JSON.stringify(["Black", "Tortoise"]) },
    { id: uuid(), name: "Obsidian Shell", slug: "obsidian-shell", description: "A technical shell that defies the elements. Waterproof, windproof, and impossibly lightweight.", price: 45000, image_url: "/assets/stitch/stitch-18.jpg", badge: null, category: "Outerwear", material: "Technical Nylon", collection_id: colMap["outerwear"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Black"]) },
    { id: uuid(), name: "Monolith Runners", slug: "monolith-runners", description: "Engineered foam sole with carbon fiber shank. Built for urban terrain.", price: 28000, image_url: "/assets/stitch/stitch-25.jpg", badge: null, category: "Footwear", material: "Technical Mesh", collection_id: null, sizes: JSON.stringify(["8", "9", "10", "11", "12"]), colors: JSON.stringify(["Graphite", "White"]) },
    { id: uuid(), name: "Apex Shell Jacket", slug: "apex-shell-jacket", description: "Three-layer waterproof construction with taped seams and adjustable hood.", price: 85000, image_url: "/assets/stitch/stitch-14.jpg", badge: "Bestseller", category: "Outerwear", material: "Gore-Tex", collection_id: colMap["outerwear"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Black", "Navy"]) },
    { id: uuid(), name: "Obsidian Trench", slug: "obsidian-trench", description: "A modern reinterpretation of the classic trench, cut from bonded technical cotton.", price: 125000, image_url: "/assets/stitch/stitch-05.jpg", badge: "New Arrival", category: "Outerwear", material: "Technical Cotton", collection_id: colMap["outerwear"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Black"]) },
    { id: uuid(), name: "Void Aviators", slug: "void-aviators", description: "Titanium frame aviators with anti-reflective coating and mineral glass lenses.", price: 45000, image_url: "/assets/stitch/stitch-22.jpg", badge: null, category: "Eyewear", material: "Titanium", collection_id: colMap["accessories"], sizes: null, colors: JSON.stringify(["Matte Black", "Gold"]) },
    { id: uuid(), name: "Kinetica Structural Blazer", slug: "kinetica-structural-blazer", description: "Engineered seams and articulated panels create a blazer that moves with you.", price: 124000, image_url: "/assets/stitch/stitch-34.jpg", badge: "New Arrival", category: "Outerwear", material: "Technical Wool Blend", collection_id: colMap["outerwear"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Black", "Slate"]) },
    { id: uuid(), name: "Silver-Mist Parka", slug: "silver-mist-parka", description: "Down-insulated parka with reflective detailing and storm-proof construction.", price: 145000, image_url: "/assets/stitch/stitch-30.jpg", badge: null, category: "Outerwear", material: "Nylon", collection_id: colMap["winter-essentials"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Silver", "Black"]) },
    { id: uuid(), name: "Titanium Chronograph", slug: "titanium-chronograph", description: "Swiss movement chronograph in aerospace-grade titanium case.", price: 340000, image_url: "/assets/stitch/stitch-16.jpg", badge: null, category: "Watches", material: "Titanium", collection_id: colMap["chronos"], sizes: null, colors: JSON.stringify(["Titanium", "Rose Gold"]) },
    { id: uuid(), name: "Obsidian Weekender Tote", slug: "obsidian-weekender-tote", description: "Expandable weekend bag in water-resistant canvas with leather trim.", price: 125000, image_url: "/assets/stitch/stitch-31.jpg", badge: null, category: "Accessories", material: "Canvas / Leather", collection_id: colMap["accessories"], sizes: null, colors: JSON.stringify(["Black"]) },
    { id: uuid(), name: "Stealth Bomber Jacket", slug: "stealth-bomber-jacket", description: "Padded bomber with matte-finish hardware and ribbed cuffs.", price: 78000, image_url: "/assets/stitch/stitch-36.jpg", badge: null, category: "Outerwear", material: "Nylon", collection_id: colMap["outerwear"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Black", "Olive"]) },
    { id: uuid(), name: "Phantom Overcoat", slug: "phantom-overcoat", description: "Double-faced cashmere overcoat with minimal construction and raw-edge finish.", price: 198000, image_url: "/assets/stitch/stitch-13.jpg", badge: null, category: "Outerwear", material: "Cashmere", collection_id: colMap["winter-essentials"], sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["Charcoal", "Camel"]) },
  ];

  // Build batch statements
  const stmts: InStatement[] = [];

  for (const c of collections) {
    stmts.push({
      sql: "INSERT INTO collections (id, name, slug, description, image_url) VALUES (?, ?, ?, ?, ?)",
      args: [c.id, c.name, c.slug, c.description, c.image_url],
    });
  }

  for (const p of products) {
    stmts.push({
      sql: "INSERT INTO products (id, name, slug, description, price, image_url, badge, category, material, collection_id, sizes, colors) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [p.id, p.name, p.slug, p.description, p.price, p.image_url, p.badge, p.category, p.material, p.collection_id, p.sizes, p.colors],
    });
  }

  // Coupons
  stmts.push({
    sql: "INSERT INTO coupons (id, code, type, value, min_order, active) VALUES (?, ?, ?, ?, ?, ?)",
    args: [uuid(), "WELCOME10", "percent", 10, 5000, 1],
  });
  stmts.push({
    sql: "INSERT INTO coupons (id, code, type, value, min_order, active) VALUES (?, ?, ?, ?, ?, ?)",
    args: [uuid(), "AETHER50", "fixed", 5000, 10000, 1],
  });

  await client.batch(stmts, "write");
}
