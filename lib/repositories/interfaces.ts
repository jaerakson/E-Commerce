// Repository interfaces — DB 구현체와 분리된 계약.
// SQLite → PostgreSQL 등 전환 시 이 인터페이스를 구현하는 새 클래스만 추가.

// ── Common ──────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ── Product ─────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number; // cents
  image_url: string;
  badge: string | null;
  category: string;
  material: string | null;
  collection_id: string | null;
  sizes: string | null; // JSON string
  colors: string | null; // JSON string
  in_stock: number;
  created_at: string;
}

export interface ProductFilter {
  category?: string;
  material?: string;
  collection_id?: string;
  search?: string;
  min_price?: number; // cents
  max_price?: number; // cents
  badge?: string;
  in_stock?: boolean;
  sort?: "price_asc" | "price_desc" | "newest" | "name";
}

export interface IProductRepository {
  findAll(filter: ProductFilter, pagination: PaginationParams): Promise<PaginatedResult<Product>>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  create(data: Omit<Product, "created_at">): Promise<Product>;
  update(id: string, data: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

// ── Collection ──────────────────────────────────────────

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface ICollectionRepository {
  findAll(): Promise<Collection[]>;
  findById(id: string): Promise<Collection | null>;
  findBySlug(slug: string): Promise<Collection | null>;
  create(data: Omit<Collection, "created_at">): Promise<Collection>;
}

// ── User ────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type UserPublic = Omit<User, "password_hash">;

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Omit<User, "created_at" | "updated_at">): Promise<User>;
  update(id: string, data: Partial<Omit<User, "id" | "created_at">>): Promise<User | null>;
}

// ── Address ─────────────────────────────────────────────

export interface Address {
  id: string;
  user_id: string;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  zip: string;
  country: string;
  is_default: number;
  created_at: string;
}

export interface IAddressRepository {
  findByUserId(userId: string): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  create(data: Omit<Address, "created_at">): Promise<Address>;
  update(id: string, data: Partial<Address>): Promise<Address | null>;
  delete(id: string): Promise<boolean>;
}

// ── Cart ────────────────────────────────────────────────

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  size: string | null;
  color: string | null;
  quantity: number;
  created_at: string;
}

export interface CartItemWithProduct extends CartItem {
  product_name: string;
  product_price: number;
  product_image_url: string;
}

export interface ICartRepository {
  findByUserId(userId: string): Promise<CartItemWithProduct[]>;
  addItem(data: Omit<CartItem, "created_at">): Promise<CartItem>;
  updateQuantity(id: string, quantity: number): Promise<CartItem | null>;
  removeItem(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<void>;
}

// ── Order ───────────────────────────────────────────────

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  subtotal: number;
  shipping_fee: number;
  tax: number;
  discount: number;
  total: number;
  delivery_method: string;
  address_id: string | null;
  coupon_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  size: string | null;
  color: string | null;
  quantity: number;
  unit_price: number;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface IOrderRepository {
  findByUserId(userId: string): Promise<Order[]>;
  findById(id: string): Promise<OrderWithItems | null>;
  create(order: Omit<Order, "created_at" | "updated_at">, items: Omit<OrderItem, "id">[]): Promise<OrderWithItems>;
  updateStatus(id: string, status: string): Promise<Order | null>;
}

// ── Review ──────────────────────────────────────────────

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string | null;
  body: string;
  location: string | null;
  occupation: string | null;
  image_url: string | null;
  verified: number;
  created_at: string;
}

export interface ReviewWithUser extends Review {
  user_first_name: string;
  user_last_name: string;
  user_avatar_url: string | null;
}

export interface ReviewStats {
  average_rating: number;
  total_count: number;
  recommend_percent: number;
}

export interface IReviewRepository {
  findByProductId(productId: string, pagination: PaginationParams): Promise<PaginatedResult<ReviewWithUser>>;
  findAll(pagination: PaginationParams): Promise<PaginatedResult<ReviewWithUser>>;
  getStats(productId?: string): Promise<ReviewStats>;
  create(data: Omit<Review, "created_at">): Promise<Review>;
}

// ── Wishlist ────────────────────────────────────────────

export interface WishlistFolder {
  id: string;
  user_id: string;
  name: string;
  cover_image_url: string | null;
  is_shared: number;
  created_at: string;
}

export interface WishlistFolderWithCount extends WishlistFolder {
  item_count: number;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  folder_id: string | null;
  created_at: string;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product_name: string;
  product_price: number;
  product_image_url: string;
  product_badge: string | null;
  product_material: string | null;
}

export interface IWishlistRepository {
  getFolders(userId: string): Promise<WishlistFolderWithCount[]>;
  createFolder(data: Omit<WishlistFolder, "created_at">): Promise<WishlistFolder>;
  updateFolder(id: string, data: Partial<WishlistFolder>): Promise<WishlistFolder | null>;
  deleteFolder(id: string): Promise<boolean>;
  getItems(userId: string, folderId?: string | null): Promise<WishlistItemWithProduct[]>;
  addItem(data: Omit<WishlistItem, "created_at">): Promise<WishlistItem>;
  removeItem(id: string): Promise<boolean>;
  isInWishlist(userId: string, productId: string, folderId?: string | null): Promise<boolean>;
}

// ── Coupon ───────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  min_order: number;
  active: number;
  expires_at: string | null;
  created_at: string;
}

export interface ICouponRepository {
  findByCode(code: string): Promise<Coupon | null>;
}

// ── Contact ─────────────────────────────────────────────

export interface ContactInquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  inquiry_type: string;
  message: string;
  created_at: string;
}

export interface IContactRepository {
  create(data: Omit<ContactInquiry, "created_at">): Promise<ContactInquiry>;
}
