// Active repository implementations.
// @libsql/client가 로컬 SQLite와 Turso 모두 지원하므로 구현체 분기 불필요.

import { SqliteProductRepository } from "./sqlite/product.repo";
import { SqliteCollectionRepository } from "./sqlite/collection.repo";
import { SqliteUserRepository } from "./sqlite/user.repo";
import { SqliteAddressRepository } from "./sqlite/address.repo";
import { SqliteCartRepository } from "./sqlite/cart.repo";
import { SqliteOrderRepository } from "./sqlite/order.repo";
import { SqliteCouponRepository } from "./sqlite/coupon.repo";
import { SqliteReviewRepository } from "./sqlite/review.repo";
import { SqliteWishlistRepository } from "./sqlite/wishlist.repo";
import { SqliteContactRepository } from "./sqlite/contact.repo";

export const productRepo = new SqliteProductRepository();
export const collectionRepo = new SqliteCollectionRepository();
export const userRepo = new SqliteUserRepository();
export const addressRepo = new SqliteAddressRepository();
export const cartRepo = new SqliteCartRepository();
export const orderRepo = new SqliteOrderRepository();
export const couponRepo = new SqliteCouponRepository();
export const reviewRepo = new SqliteReviewRepository();
export const wishlistRepo = new SqliteWishlistRepository();
export const contactRepo = new SqliteContactRepository();
