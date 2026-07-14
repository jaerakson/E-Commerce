import { getClient } from "../../db/connection";
import type { IReviewRepository, Review, ReviewWithUser, ReviewStats, PaginationParams, PaginatedResult } from "../interfaces";

export class SqliteReviewRepository implements IReviewRepository {
  async findByProductId(productId: string, pagination: PaginationParams): Promise<PaginatedResult<ReviewWithUser>> {
    const client = getClient();
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;
    const offset = (page - 1) * limit;

    const [countResult, dataResult] = await client.batch([
      { sql: "SELECT COUNT(*) as total FROM reviews WHERE product_id = ?", args: [productId] },
      {
        sql: `SELECT r.*, u.first_name AS user_first_name, u.last_name AS user_last_name, u.avatar_url AS user_avatar_url
              FROM reviews r JOIN users u ON u.id = r.user_id
              WHERE r.product_id = ?
              ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
        args: [productId, limit, offset],
      },
    ]);

    return {
      data: dataResult.rows as unknown as ReviewWithUser[],
      total: Number(countResult.rows[0].total),
      page,
      limit,
    };
  }

  async findAll(pagination: PaginationParams): Promise<PaginatedResult<ReviewWithUser>> {
    const client = getClient();
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;
    const offset = (page - 1) * limit;

    const [countResult, dataResult] = await client.batch([
      { sql: "SELECT COUNT(*) as total FROM reviews", args: [] },
      {
        sql: `SELECT r.*, u.first_name AS user_first_name, u.last_name AS user_last_name, u.avatar_url AS user_avatar_url
              FROM reviews r JOIN users u ON u.id = r.user_id
              ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
        args: [limit, offset],
      },
    ]);

    return {
      data: dataResult.rows as unknown as ReviewWithUser[],
      total: Number(countResult.rows[0].total),
      page,
      limit,
    };
  }

  async getStats(productId?: string): Promise<ReviewStats> {
    const client = getClient();
    const where = productId ? "WHERE product_id = ?" : "";
    const args = productId ? [productId] : [];

    const result = await client.execute({
      sql: `SELECT
              COALESCE(AVG(rating), 0) AS average_rating,
              COUNT(*) AS total_count,
              COALESCE(ROUND(SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0)), 0) AS recommend_percent
            FROM reviews ${where}`,
      args,
    });

    const row = result.rows[0];
    return {
      average_rating: Math.round(Number(row.average_rating) * 10) / 10,
      total_count: Number(row.total_count),
      recommend_percent: Number(row.recommend_percent),
    };
  }

  async create(data: Omit<Review, "created_at">): Promise<Review> {
    const client = getClient();
    await client.execute({
      sql: `INSERT INTO reviews (id, user_id, product_id, rating, title, body, location, occupation, image_url, verified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [data.id, data.user_id, data.product_id, data.rating, data.title, data.body, data.location, data.occupation, data.image_url, data.verified],
    });
    const result = await client.execute({ sql: "SELECT * FROM reviews WHERE id = ?", args: [data.id] });
    return result.rows[0] as unknown as Review;
  }
}
