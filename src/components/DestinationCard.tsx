"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import type { Destination } from "@/schemas/destinations";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(destination.price);

  const discountedPrice = destination.discount
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(destination.price * (1 - destination.discount / 100))
    : null;

  return (
    <Link href={`/destino/${destination.$id}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={destination.mainImage || "/placeholder.svg"}
            alt={destination.name}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {destination.discount && (
            <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">
              {destination.discount}% OFF
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{destination.name}</h3>
              <p className="text-sm text-muted-foreground">
                {destination.city ? `${destination.city}, ` : ""}
                {destination.country}
              </p>
            </div>
            <div className="text-right">
              {destination.discount ? (
                <>
                  <p className="text-sm line-through text-muted-foreground">
                    {formattedPrice}
                  </p>
                  <p className="font-bold text-primary">{discountedPrice}</p>
                </>
              ) : (
                <p className="font-bold">{formattedPrice}</p>
              )}
              <p className="text-xs text-muted-foreground">por pessoa</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <StarRating rating={destination.rating} />
            {destination.categories && destination.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {destination.categories.slice(0, 2).map((tag) => (
                  <Badge key={tag.name} variant="outline" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
