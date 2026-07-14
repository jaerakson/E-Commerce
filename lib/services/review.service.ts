import { reviewRepo } from "../repositories";
import { v4 as uuid } from "uuid";
import type { PaginationParams } from "../repositories/interfaces";

export async function getProductReviews(productId: string, pagination: PaginationParams) {
  return reviewRepo.findByProductId(productId, pagination);
}

export async function getAllReviews(pagination: PaginationParams) {
  return reviewRepo.findAll(pagination);
}

export async function getReviewStats(productId?: string) {
  return reviewRepo.getStats(productId);
}

export async function createReview(
  userId: string,
  input: {
    product_id: string;
    rating: number;
    title?: string;
    body: string;
    location?: string;
    occupation?: string;
    image_url?: string;
  },
) {
  if (input.rating < 1 || input.rating > 5) {
    return { error: "Rating must be between 1 and 5" };
  }

  const review = await reviewRepo.create({
    id: uuid(),
    user_id: userId,
    product_id: input.product_id,
    rating: input.rating,
    title: input.title ?? null,
    body: input.body,
    location: input.location ?? null,
    occupation: input.occupation ?? null,
    image_url: input.image_url ?? null,
    verified: 0,
  });

  return { review };
}
