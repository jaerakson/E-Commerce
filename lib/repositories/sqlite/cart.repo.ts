import { getClient } from "../../db/connection";
import type { ICartRepository, CartItem, CartItemWithProduct } from "../interfaces";

export class SqliteCartRepository implements ICartRepository {
  async findByUserId(userId: string): Promise<CartItemWithProduct[]> {
    const client = getClient();
    const result = await client.execute({
      sql: `SELECT ci.*, p.name AS product_name, p.price AS product_price, p.image_url AS product_image_url
            FROM cart_items ci
            JOIN products p ON p.id = ci.product_id
            WHERE ci.user_id = ?
            ORDER BY ci.created_at DESC`,
      args: [userId],
    });
    return result.rows as unknown as CartItemWithProduct[];
  }

  async findById(id: string): Promise<CartItem | null> {
    const client = getClient();
    const result = await client.execute({ sql: "SELECT * FROM cart_items WHERE id = ?", args: [id] });
    return (result.rows[0] as unknown as CartItem) ?? null;
  }

  async findExisting(userId: string, productId: string, size: string | null, color: string | null): Promise<CartItem | null> {
    const client = getClient();
    const result = await client.execute({
      sql: `SELECT * FROM cart_items
            WHERE user_id = ? AND product_id = ? AND COALESCE(size,'') = COALESCE(?,'') AND COALESCE(color,'') = COALESCE(?,'')`,
      args: [userId, productId, size, color],
    });
    return (result.rows[0] as unknown as CartItem) ?? null;
  }

  async addItem(data: Omit<CartItem, "created_at">): Promise<CartItem> {
    const client = getClient();
    await client.execute({
      sql: `INSERT INTO cart_items (id, user_id, product_id, size, color, quantity)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [data.id, data.user_id, data.product_id, data.size, data.color, data.quantity],
    });
    return (await this.findById(data.id))!;
  }

  async updateQuantity(id: string, quantity: number): Promise<CartItem | null> {
    const client = getClient();
    await client.execute({
      sql: "UPDATE cart_items SET quantity = ? WHERE id = ?",
      args: [quantity, id],
    });
    return this.findById(id);
  }

  async removeItem(id: string): Promise<boolean> {
    const client = getClient();
    const result = await client.execute({ sql: "DELETE FROM cart_items WHERE id = ?", args: [id] });
    return result.rowsAffected > 0;
  }

  async clearCart(userId: string): Promise<void> {
    const client = getClient();
    await client.execute({ sql: "DELETE FROM cart_items WHERE user_id = ?", args: [userId] });
  }
}
