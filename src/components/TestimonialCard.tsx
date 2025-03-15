import Image from "next/image";
import { StarRating } from "./StarRating";

interface TestimonialCardProps {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export function TestimonialCard({
  name,
  avatar,
  rating,
  text,
  date,
}: TestimonialCardProps) {
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={name}
          width={50}
          height={50}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
        </div>
      </div>
      <div className="mt-4">
        <StarRating rating={rating} size="sm" />
        <p className="mt-2 text-sm">{text}</p>
        <p className="mt-2 text-xs text-muted-foreground">{formatDate(date)}</p>
      </div>
    </div>
  );
}
