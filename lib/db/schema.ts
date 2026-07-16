import { getClient } from "./connection";

export async function migrate(): Promise<void> {
  const client = getClient();

  // libsql batch: 각 문을 개별 실행 (exec는 세미콜론 구분 다중 문을 지원하지만 batch가 더 안정적)
  await client.batch([
    `CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      email         TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name    TEXT NOT NULL,
      last_name     TEXT NOT NULL,
      phone         TEXT,
      avatar_url    TEXT,
      created_at    TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS addresses (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      label      TEXT,
      line1      TEXT NOT NULL,
      line2      TEXT,
      city       TEXT NOT NULL,
      state      TEXT,
      zip        TEXT NOT NULL,
      country    TEXT NOT NULL DEFAULT 'US',
      is_default INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS collections (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      slug        TEXT UNIQUE NOT NULL,
      description TEXT,
      image_url   TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS products (
      id            TEXT PRIMARY KEY,
      name          TEXT NOT NULL,
      slug          TEXT UNIQUE NOT NULL,
      description   TEXT,
      price         INTEGER NOT NULL,
      image_url     TEXT NOT NULL,
      badge         TEXT,
      category      TEXT NOT NULL,
      material      TEXT,
      collection_id TEXT REFERENCES collections(id) ON DELETE SET NULL,
      sizes         TEXT,
      colors        TEXT,
      in_stock      INTEGER NOT NULL DEFAULT 1,
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS cart_items (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      size       TEXT,
      color      TEXT,
      quantity   INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS coupons (
      id         TEXT PRIMARY KEY,
      code       TEXT UNIQUE NOT NULL,
      type       TEXT NOT NULL,
      value      INTEGER NOT NULL,
      min_order  INTEGER DEFAULT 0,
      active     INTEGER NOT NULL DEFAULT 1,
      expires_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id              TEXT PRIMARY KEY,
      user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      order_number    TEXT UNIQUE NOT NULL,
      status          TEXT NOT NULL DEFAULT 'pending',
      subtotal        INTEGER NOT NULL,
      shipping_fee    INTEGER NOT NULL DEFAULT 0,
      tax             INTEGER NOT NULL DEFAULT 0,
      discount        INTEGER NOT NULL DEFAULT 0,
      total           INTEGER NOT NULL,
      delivery_method TEXT DEFAULT 'standard',
      address_id      TEXT REFERENCES addresses(id) ON DELETE SET NULL,
      coupon_id       TEXT REFERENCES coupons(id) ON DELETE SET NULL,
      created_at      TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS order_items (
      id         TEXT PRIMARY KEY,
      order_id   TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      name       TEXT NOT NULL,
      size       TEXT,
      color      TEXT,
      quantity   INTEGER NOT NULL,
      unit_price INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS reviews (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      rating     INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
      title      TEXT,
      body       TEXT NOT NULL,
      location   TEXT,
      occupation TEXT,
      image_url  TEXT,
      verified   INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS wishlist_folders (
      id              TEXT PRIMARY KEY,
      user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name            TEXT NOT NULL,
      cover_image_url TEXT,
      is_shared       INTEGER NOT NULL DEFAULT 0,
      created_at      TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS wishlist_items (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      folder_id  TEXT REFERENCES wishlist_folders(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, product_id, folder_id)
    )`,
    `CREATE TABLE IF NOT EXISTS contact_inquiries (
      id           TEXT PRIMARY KEY,
      first_name   TEXT NOT NULL,
      last_name    TEXT NOT NULL,
      email        TEXT NOT NULL,
      inquiry_type TEXT NOT NULL,
      message      TEXT NOT NULL,
      created_at   TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`,
    `CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection_id)`,
    `CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug)`,
    `CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id)`,
    `CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)`,
    `CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id)`,
    `CREATE INDEX IF NOT EXISTS idx_wishlist_items_user ON wishlist_items(user_id)`,
    `CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id)`,
    `CREATE TABLE IF NOT EXISTS sessions (
      token      TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,
  ], "write");

  // OAuth 칼럼 마이그레이션 — 이미 존재하면 무시
  try { await client.execute("ALTER TABLE users ADD COLUMN oauth_provider TEXT"); } catch {}
  try { await client.execute("ALTER TABLE users ADD COLUMN oauth_id TEXT"); } catch {}
}
