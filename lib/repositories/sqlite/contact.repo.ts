import { getClient } from "../../db/connection";
import type { IContactRepository, ContactInquiry } from "../interfaces";

export class SqliteContactRepository implements IContactRepository {
  async create(data: Omit<ContactInquiry, "created_at">): Promise<ContactInquiry> {
    const client = getClient();
    await client.execute({
      sql: `INSERT INTO contact_inquiries (id, first_name, last_name, email, inquiry_type, message)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [data.id, data.first_name, data.last_name, data.email, data.inquiry_type, data.message],
    });
    const result = await client.execute({ sql: "SELECT * FROM contact_inquiries WHERE id = ?", args: [data.id] });
    return result.rows[0] as unknown as ContactInquiry;
  }
}
