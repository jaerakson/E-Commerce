import { wishlistRepo } from "../repositories";
import { v4 as uuid } from "uuid";

export async function getFolders(userId: string) {
  return wishlistRepo.getFolders(userId);
}

export async function createFolder(userId: string, input: { name: string; cover_image_url?: string; is_shared?: boolean }) {
  return wishlistRepo.createFolder({
    id: uuid(),
    user_id: userId,
    name: input.name,
    cover_image_url: input.cover_image_url ?? null,
    is_shared: input.is_shared ? 1 : 0,
  });
}

export async function updateFolder(id: string, data: { name?: string; cover_image_url?: string; is_shared?: boolean }) {
  const update: Record<string, unknown> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.cover_image_url !== undefined) update.cover_image_url = data.cover_image_url;
  if (data.is_shared !== undefined) update.is_shared = data.is_shared ? 1 : 0;
  return wishlistRepo.updateFolder(id, update);
}

export async function deleteFolder(id: string) {
  return wishlistRepo.deleteFolder(id);
}

export async function getWishlistItems(userId: string, folderId?: string | null) {
  return wishlistRepo.getItems(userId, folderId);
}

export async function addToWishlist(userId: string, input: { product_id: string; folder_id?: string }) {
  const exists = await wishlistRepo.isInWishlist(userId, input.product_id, input.folder_id ?? null);
  if (exists) {
    return { error: "Product already in wishlist" };
  }

  const item = await wishlistRepo.addItem({
    id: uuid(),
    user_id: userId,
    product_id: input.product_id,
    folder_id: input.folder_id ?? null,
  });
  return { item };
}

export async function removeFromWishlist(id: string) {
  return wishlistRepo.removeItem(id);
}
