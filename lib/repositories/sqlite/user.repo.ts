import { getClient } from "../../db/connection";
import type { IUserRepository, User } from "../interfaces";

export class SqliteUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM users WHERE id = ?", args: [id] });
    return (result.rows[0] as unknown as User) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM users WHERE email = ?", args: [email] });
    return (result.rows[0] as unknown as User) ?? null;
  }

  async create(data: Omit<User, "created_at" | "updated_at">): Promise<User> {
    const client = getClient();
    await client.execute({
      sql: `INSERT INTO users (id, email, password_hash, first_name, last_name, phone, avatar_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [data.id, data.email, data.password_hash, data.first_name, data.last_name, data.phone, data.avatar_url],
    });
    return (await this.findById(data.id))!;
  }

  async update(id: string, data: Partial<Omit<User, "id" | "created_at">>): Promise<User | null> {
    const client = getClient();
    const fields = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
    if (fields.length === 0) return this.findById(id);

    const sets = fields.map((f) => `${f} = ?`).join(", ");
    const args = [...fields.map((f) => (data as any)[f]), id];
    await client.execute({ sql: `UPDATE users SET ${sets}, updated_at = datetime('now') WHERE id = ?`, args });
    return this.findById(id);
  }
}
