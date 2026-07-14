import { getClient } from "../../db/connection";
import type { ICouponRepository, Coupon } from "../interfaces";

export class SqliteCouponRepository implements ICouponRepository {
  async findByCode(code: string): Promise<Coupon | null> {
    const client = getClient();
    const result = await client.execute({
      sql: "SELECT * FROM coupons WHERE code = ? COLLATE NOCASE",
      args: [code],
    });
    return (result.rows[0] as unknown as Coupon) ?? null;
  }
}
