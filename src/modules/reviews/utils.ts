import { RatingDistribution } from "./types";

/**
 * Calculate the weighted average rating from a rating distribution.
 *
 * @description Computes the average rating by weighting each star level by
 * its percentage of total ratings. Returns the result rounded to one decimal
 * place.
 * @param ratingDistribution - Array of distribution objects with stars and
 * percentage fields
 * @returns The weighted average rating, or 0 if the distribution is empty
 */
export function calculateAverageRating(ratingDistribution: RatingDistribution[]): number {
  const totalWeight = ratingDistribution.reduce((sum, { percentage }) => sum + percentage, 0);

  if (totalWeight === 0) return 0;

  const weightedSum = ratingDistribution.reduce(
    (sum, { stars, percentage }) => sum + stars * percentage,
    0,
  );

  const average = weightedSum / totalWeight;
  return Math.round(average * 10) / 10;
}
