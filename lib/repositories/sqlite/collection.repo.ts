import { getClient } from "../../db/connection";
import type { ICollectionRepository, Collection } from "../interfaces";

export class SqliteCollectionRepository implements ICollectionRepository {
  async findAll(): Promise<Collection[]> {
    const client = getClient();
    const result = await client.execute("SELECT * FROM collections ORDER BY name ASC");
    return result.rows as unknown as Collection[];
  }

  async findById(id: string): Promise<Collection | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM collections WHERE id = ?", args: [id] });
    return (result.rows[0] as unknown as Collection) ?? null;
  }

  async findBySlug(slug: string): Promise<Collection | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM collections WHERE slug = ?", args: [slug] });
    return (result.rows[0] as unknown as Collection) ?? null;
  }

  async create(data: Omit<Collection, "created_at">): Promise<Collection> {
    const client = getClient();
    await client.execute({
      sql: "INSERT INTO collections (id, name, slug, description, image_url) VALUES (?, ?, ?, ?, ?)",
      args: [data.id, data.name, data.slug, data.description, data.image_url],
    });
    return (await this.findById(data.id))!;
  }
}
