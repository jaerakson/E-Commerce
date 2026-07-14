import { getClient } from "../../db/connection";
import type {
  IProductRepository,
  Product,
  ProductFilter,
  PaginationParams,
  PaginatedResult,
} from "../interfaces";
import type { InStatement } from "@libsql/client";

export class SqliteProductRepository implements IProductRepository {
  async findAll(filter: ProductFilter, pagination: PaginationParams): Promise<PaginatedResult<Product>> {
    const client = getClient();
    const conditions: string[] = [];
    const args: unknown[] = [];

    if (filter.category) {
      conditions.push("p.category = ?");
      args.push(filter.category);
    }
    if (filter.material) {
      conditions.push("p.material = ?");
      args.push(filter.material);
    }
    if (filter.collection_id) {
      conditions.push("p.collection_id = ?");
      args.push(filter.collection_id);
    }
    if (filter.badge) {
      conditions.push("p.badge = ?");
      args.push(filter.badge);
    }
    if (filter.in_stock !== undefined) {
      conditions.push("p.in_stock = ?");
      args.push(filter.in_stock ? 1 : 0);
    }
    if (filter.min_price !== undefined) {
      conditions.push("p.price >= ?");
      args.push(filter.min_price);
    }
    if (filter.max_price !== undefined) {
      conditions.push("p.price <= ?");
      args.push(filter.max_price);
    }
    if (filter.search) {
      conditions.push("(p.name LIKE ? OR p.description LIKE ? OR p.material LIKE ?)");
      const term = `%${filter.search}%`;
      args.push(term, term, term);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    let orderBy = "ORDER BY p.created_at DESC";
    switch (filter.sort) {
      case "price_asc": orderBy = "ORDER BY p.price ASC"; break;
      case "price_desc": orderBy = "ORDER BY p.price DESC"; break;
      case "newest": orderBy = "ORDER BY p.created_at DESC"; break;
      case "name": orderBy = "ORDER BY p.name ASC"; break;
    }

    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 20;
    const offset = (page - 1) * limit;

    const [countResult, dataResult] = await client.batch([
      { sql: `SELECT COUNT(*) as total FROM products p ${where}`, args: args as any[] },
      { sql: `SELECT p.* FROM products p ${where} ${orderBy} LIMIT ? OFFSET ?`, args: [...args, limit, offset] as any[] },
    ]);

    const total = Number(countResult.rows[0].total);
    const data = dataResult.rows as unknown as Product[];

    return { data, total, page, limit };
  }

  async findById(id: string): Promise<Product | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [id] });
    return (result.rows[0] as unknown as Product) ?? null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM products WHERE slug = ?", args: [slug] });
    return (result.rows[0] as unknown as Product) ?? null;
  }

  async create(data: Omit<Product, "created_at">): Promise<Product> {
    const client = getClient();
    await client.execute({
      sql: `INSERT INTO products (id, name, slug, description, price, image_url, badge, category, material, collection_id, sizes, colors, in_stock)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [data.id, data.name, data.slug, data.description, data.price, data.image_url, data.badge, data.category, data.material, data.collection_id, data.sizes, data.colors, data.in_stock],
    });
    return (await this.findById(data.id))!;
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    const client = getClient();
    const fields = Object.keys(data).filter((k) => k !== "id" && k !== "created_at" && (data as any)[k] !== undefined);
    if (fields.length === 0) return this.findById(id);

    const sets = fields.map((f) => `${f} = ?`).join(", ");
    const args = [...fields.map((f) => (data as any)[f]), id];
    await client.execute({ sql: `UPDATE products SET ${sets} WHERE id = ?`, args });
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const client = getClient();
    const result = await client.execute({ sql: "DELETE FROM products WHERE id = ?", args: [id] });
    return result.rowsAffected > 0;
  }
}
