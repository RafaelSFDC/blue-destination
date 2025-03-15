import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarRating({
  rating,
  max = 5,
  size = "sm",
  showValue = true,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  const starSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const starSize = starSizes[size];

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${starSize} fill-yellow-400 text-yellow-400`}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${starSize} text-muted-foreground/20`} />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${starSize} text-muted-foreground/20`}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
