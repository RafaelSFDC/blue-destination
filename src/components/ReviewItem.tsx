import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "./StarRating";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Review } from "@/schemas/reviews";

export function ReviewItem({ review }: { review: Review }) {
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  // Obter iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={review.userAvatar} alt={review.userName} />
            <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{review.userName}</h4>
            <p className="text-xs text-muted-foreground">
              {formatDate(review.date)}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      {review.tripDate && (
        <div className="rounded-md bg-muted px-3 py-1 text-xs">
          Viajou em {formatDate(review.tripDate)}
        </div>
      )}
      <p className="text-sm">{review.comment}</p>
    </div>
  );
}
