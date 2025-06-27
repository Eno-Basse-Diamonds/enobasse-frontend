import { RatingDistribution } from "../types/reviews";

export function calculateAverageRating(
  ratingDistribution: RatingDistribution[]
): number {
  const totalWeight = ratingDistribution.reduce(
    (sum, { percentage }) => sum + percentage,
    0
  );

  if (totalWeight === 0) return 0;

  const weightedSum = ratingDistribution.reduce(
    (sum, { stars, percentage }) => sum + stars * percentage,
    0
  );

  const average = weightedSum / totalWeight;
  return Math.round(average * 10) / 10;
}
