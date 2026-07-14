import { getClient } from "../../db/connection";
import type { InValue } from "@libsql/client";
import type {
  IWishlistRepository,
  WishlistFolder,
  WishlistFolderWithCount,
  WishlistItem,
  WishlistItemWithProduct,
} from "../interfaces";

export class SqliteWishlistRepository implements IWishlistRepository {
  async getFolders(userId: string): Promise<WishlistFolderWithCount[]> {
    const client = getClient();
    const result = await client.execute({
      sql: `SELECT wf.*, COALESCE(cnt.c, 0) AS item_count
            FROM wishlist_folders wf
            LEFT JOIN (SELECT folder_id, COUNT(*) AS c FROM wishlist_items GROUP BY folder_id) cnt
              ON cnt.folder_id = wf.id
            WHERE wf.user_id = ?
            ORDER BY wf.created_at DESC`,
      args: [userId],
    });
    return result.rows as unknown as WishlistFolderWithCount[];
  }

  async createFolder(data: Omit<WishlistFolder, "created_at">): Promise<WishlistFolder> {
    const client = getClient();
    await client.execute({
      sql: `INSERT INTO wishlist_folders (id, user_id, name, cover_image_url, is_shared)
            VALUES (?, ?, ?, ?, ?)`,
      args: [data.id, data.user_id, data.name, data.cover_image_url, data.is_shared],
    });
    const result = await client.execute({ sql: "SELECT * FROM wishlist_folders WHERE id = ?", args: [data.id] });
    return result.rows[0] as unknown as WishlistFolder;
  }

  async updateFolder(id: string, data: Partial<WishlistFolder>): Promise<WishlistFolder | null> {
    const client = getClient();
    const fields = Object.keys(data).filter((k) => k !== "id" && k !== "user_id" && k !== "created_at" && (data as any)[k] !== undefined);
    if (fields.length === 0) {
      const r = await client.execute({ sql: "SELECT * FROM wishlist_folders WHERE id = ?", args: [id] });
      return (r.rows[0] as unknown as WishlistFolder) ?? null;
    }
    const sets = fields.map((f) => `${f} = ?`).join(", ");
    const args = [...fields.map((f) => (data as any)[f]), id];
    await client.execute({ sql: `UPDATE wishlist_folders SET ${sets} WHERE id = ?`, args });
    const r = await client.execute({ sql: "SELECT * FROM wishlist_folders WHERE id = ?", args: [id] });
    return (r.rows[0] as unknown as WishlistFolder) ?? null;
  }

  async deleteFolder(id: string): Promise<boolean> {
    const client = getClient();
    // Move items from this folder to unfiled
    await client.execute({ sql: "UPDATE wishlist_items SET folder_id = NULL WHERE folder_id = ?", args: [id] });
    const result = await client.execute({ sql: "DELETE FROM wishlist_folders WHERE id = ?", args: [id] });
    return result.rowsAffected > 0;
  }

  async getItems(userId: string, folderId?: string | null): Promise<WishlistItemWithProduct[]> {
    const client = getClient();
    let sql = `SELECT wi.*, p.name AS product_name, p.price AS product_price,
                      p.image_url AS product_image_url, p.badge AS product_badge, p.material AS product_material
               FROM wishlist_items wi
               JOIN products p ON p.id = wi.product_id
               WHERE wi.user_id = ?`;
    const args: InValue[] = [userId];

    if (folderId === null) {
      sql += " AND wi.folder_id IS NULL";
    } else if (folderId !== undefined) {
      sql += " AND wi.folder_id = ?";
      args.push(folderId);
    }

    sql += " ORDER BY wi.created_at DESC";
    const result = await client.execute({ sql, args });
    return result.rows as unknown as WishlistItemWithProduct[];
  }

  async addItem(data: Omit<WishlistItem, "created_at">): Promise<WishlistItem> {
    const client = getClient();
    await client.execute({
      sql: "INSERT INTO wishlist_items (id, user_id, product_id, folder_id) VALUES (?, ?, ?, ?)",
      args: [data.id, data.user_id, data.product_id, data.folder_id],
    });
    const result = await client.execute({ sql: "SELECT * FROM wishlist_items WHERE id = ?", args: [data.id] });
    return result.rows[0] as unknown as WishlistItem;
  }

  async removeItem(id: string): Promise<boolean> {
    const client = getClient();
    const result = await client.execute({ sql: "DELETE FROM wishlist_items WHERE id = ?", args: [id] });
    return result.rowsAffected > 0;
  }

  async isInWishlist(userId: string, productId: string, folderId?: string | null): Promise<boolean> {
    const client = getClient();
    let sql = "SELECT COUNT(*) AS c FROM wishlist_items WHERE user_id = ? AND product_id = ?";
    const args: InValue[] = [userId, productId];
    if (folderId === null) {
      sql += " AND folder_id IS NULL";
    } else if (folderId !== undefined) {
      sql += " AND folder_id = ?";
      args.push(folderId);
    }
    const result = await client.execute({ sql, args });
    return Number(result.rows[0].c) > 0;
  }
}
