"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "../StarRating";

interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  discount?: number;
  tags?: string[];
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function DestinationCard({
  id,
  name,
  location,
  image,
  price,
  rating,
  discount,
  tags,
  isFavorite = false,
  onFavoriteToggle,
}: DestinationCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const discountedPrice = discount
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price * (1 - discount / 100))
    : null;

  return (
    <Link href={`/destino/${id}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-background/80 hover:bg-background/90"
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          {discount && (
            <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">
              {discount}% OFF
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <div className="text-right">
              {discount ? (
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
            <StarRating rating={rating} />
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
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
