"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { StarRating } from "../StarRating";

interface Destination {
  $id: string;
  name: string;
  description: string;
  mainImage: string;
  country: string;
  city?: string;
  region: string;
  rating: number;
  category: string[];
}

interface DestinationsListProps {
  destinations: Destination[];
}

export function DestinationsList({ destinations }: DestinationsListProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const categories = Array.from(
    new Set(destinations.flatMap((d) => d.category || []).filter(Boolean))
  );

  const filteredDestinations = filter
    ? destinations.filter((d) => d.category && d.category.includes(filter))
    : destinations;

  return (
    <div className="space-y-6">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={filter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map((destination) => (
          <Card
            key={destination.$id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={
                  destination.mainImage ||
                  "/placeholder.svg?height=250&width=500"
                }
                alt={destination.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">
                  {destination.name}
                </h3>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {destination.city ? `${destination.city}, ` : ""}
                  {destination.country}
                </span>
              </div>
              <StarRating rating={destination.rating} />
              <p className="text-sm mt-2 line-clamp-2">
                {destination.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <div className="flex flex-wrap gap-1">
                {destination.category?.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
                {(destination.category?.length || 0) > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{destination.category!.length - 2}
                  </Badge>
                )}
              </div>
              <Button size="sm" asChild>
                <Link href={`/destino/${destination.$id}`}>Ver Mais</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">
            Nenhum destino encontrado
          </h3>
          <p className="text-muted-foreground">
            Tente outro filtro ou retorne para todos os destinos.
          </p>
          {filter && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setFilter(null)}
            >
              Mostrar todos os destinos
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
