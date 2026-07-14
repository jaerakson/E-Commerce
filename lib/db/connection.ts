import { createClient, type Client } from "@libsql/client";

// .env 설정:
//   로컬 개발: DB_URL=file:./data/aether.db
//   Turso:     DB_URL=libsql://your-db.turso.io  +  DB_AUTH_TOKEN=eyJ...
//   추후 PostgreSQL 전환 시: DB_PROVIDER=postgresql + DB_HOST/PORT/NAME/USER/PASSWORD

const DB_URL = process.env.DB_URL || "file:./data/aether.db";
const DB_AUTH_TOKEN = process.env.DB_AUTH_TOKEN || undefined;

let _client: Client | null = null;

export function getClient(): Client {
  if (!_client) {
    _client = createClient({
      url: DB_URL,
      authToken: DB_AUTH_TOKEN,
    });
  }
  return _client;
}

export async function closeDb(): Promise<void> {
  if (_client) {
    _client.close();
    _client = null;
  }
}
