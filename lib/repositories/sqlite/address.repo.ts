import { getClient } from "../../db/connection";
import type { IAddressRepository, Address } from "../interfaces";

export class SqliteAddressRepository implements IAddressRepository {
  async findByUserId(userId: string): Promise<Address[]> {
    const client = getClient();
    const result = await client.execute({
      sql: "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC",
      args: [userId],
    });
    return result.rows as unknown as Address[];
  }

  async findById(id: string): Promise<Address | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM addresses WHERE id = ?", args: [id] });
    return (result.rows[0] as unknown as Address) ?? null;
  }

  async create(data: Omit<Address, "created_at">): Promise<Address> {
    const client = getClient();

    // If setting as default, unset other defaults first
    if (data.is_default) {
      await client.execute({
        sql: "UPDATE addresses SET is_default = 0 WHERE user_id = ?",
        args: [data.user_id],
      });
    }

    await client.execute({
      sql: `INSERT INTO addresses (id, user_id, label, line1, line2, city, state, zip, country, is_default)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [data.id, data.user_id, data.label, data.line1, data.line2, data.city, data.state, data.zip, data.country, data.is_default],
    });
    return (await this.findById(data.id))!;
  }

  async update(id: string, data: Partial<Address>): Promise<Address | null> {
    const client = getClient();
    const fields = Object.keys(data).filter((k) => k !== "id" && k !== "user_id" && k !== "created_at" && (data as any)[k] !== undefined);
    if (fields.length === 0) return this.findById(id);

    // If setting as default, unset other defaults
    if (data.is_default) {
      const existing = await this.findById(id);
      if (existing) {
        await client.execute({
          sql: "UPDATE addresses SET is_default = 0 WHERE user_id = ? AND id != ?",
          args: [existing.user_id, id],
        });
      }
    }

    const sets = fields.map((f) => `${f} = ?`).join(", ");
    const args = [...fields.map((f) => (data as any)[f]), id];
    await client.execute({ sql: `UPDATE addresses SET ${sets} WHERE id = ?`, args });
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const client = getClient();
    const result = await client.execute({ sql: "DELETE FROM addresses WHERE id = ?", args: [id] });
    return result.rowsAffected > 0;
  }
}
