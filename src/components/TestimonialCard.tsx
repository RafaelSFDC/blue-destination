import Image from "next/image";
import { StarRating } from "./StarRating";

interface TestimonialCardProps {
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export function TestimonialCard({
  name,
  avatar,
  location,
  rating,
  text,
  date,
}: TestimonialCardProps) {
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
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <div className="mt-4">
        <StarRating rating={rating} size="sm" />
        <p className="mt-2 text-sm">{text}</p>
        <p className="mt-2 text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
