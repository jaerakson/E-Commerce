import { getClient } from "../../db/connection";
import type { IOrderRepository, Order, OrderItem, OrderWithItems } from "../interfaces";
import type { InStatement } from "@libsql/client";
import { v4 as uuid } from "uuid";

export class SqliteOrderRepository implements IOrderRepository {
  async findByUserId(userId: string): Promise<Order[]> {
    const client = getClient();
    const result = await client.execute({
      sql: "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      args: [userId],
    });
    return result.rows as unknown as Order[];
  }

  async findById(id: string): Promise<OrderWithItems | null> {
    const client = getClient();
    const [orderResult, itemsResult] = await client.batch([
      { sql: "SELECT * FROM orders WHERE id = ?", args: [id] },
      { sql: "SELECT * FROM order_items WHERE order_id = ?", args: [id] },
    ]);

    const order = orderResult.rows[0] as unknown as Order | undefined;
    if (!order) return null;

    const items = itemsResult.rows as unknown as OrderItem[];
    return { ...order, items };
  }

  async create(order: Omit<Order, "created_at" | "updated_at">, items: Omit<OrderItem, "id">[]): Promise<OrderWithItems> {
    const client = getClient();
    const statements: InStatement[] = [
      {
        sql: `INSERT INTO orders (id, user_id, order_number, status, subtotal, shipping_fee, tax, discount, total, delivery_method, address_id, coupon_id)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [order.id, order.user_id, order.order_number, order.status, order.subtotal, order.shipping_fee, order.tax, order.discount, order.total, order.delivery_method, order.address_id, order.coupon_id],
      },
    ];

    for (const item of items) {
      statements.push({
        sql: `INSERT INTO order_items (id, order_id, product_id, name, size, color, quantity, unit_price)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [uuid(), item.order_id, item.product_id, item.name, item.size, item.color, item.quantity, item.unit_price],
      });
    }

    await client.batch(statements, "write");
    return (await this.findById(order.id))!;
  }

  async updateStatus(id: string, status: string): Promise<Order | null> {
    const client = getClient();
    await client.execute({
      sql: "UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?",
      args: [status, id],
    });
    const result = await client.execute({ sql: "SELECT * FROM orders WHERE id = ?", args: [id] });
    return (result.rows[0] as unknown as Order) ?? null;
  }
}
