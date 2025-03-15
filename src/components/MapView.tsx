"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  type: "attraction" | "restaurant" | "hotel" | "other";
}

interface MapViewProps {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  pointsOfInterest: PointOfInterest[];
}

export function MapView({ location, pointsOfInterest }: MapViewProps) {
  const [selectedPoint, setSelectedPoint] = useState<PointOfInterest | null>(
    null
  );

  // Aqui seria implementada a integração com Google Maps ou Mapbox
  // Para fins de demonstração, estamos apenas simulando a visualização

  const getIconForType = (type: PointOfInterest["type"]) => {
    switch (type) {
      case "attraction":
        return "🏛️";
      case "restaurant":
        return "🍽️";
      case "hotel":
        return "🏨";
      default:
        return "📍";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-center text-muted-foreground">
            Mapa interativo seria carregado aqui
            <br />
            <span className="text-sm">
              (Integração com Google Maps ou Mapbox)
            </span>
          </p>
        </div>
        <div className="absolute bottom-4 left-4 rounded-md bg-background p-2 shadow-md">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{location.address}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Pontos de interesse próximos</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {pointsOfInterest.map((point) => (
            <Button
              key={point.id}
              variant="outline"
              className="justify-start gap-2"
              onClick={() => setSelectedPoint(point)}
            >
              <span>{getIconForType(point.type)}</span>
              <span className="truncate">{point.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {selectedPoint && (
        <div className="rounded-lg border p-4">
          <div className="mb-2 flex items-center gap-2">
            <span>{getIconForType(selectedPoint.type)}</span>
            <h4 className="font-medium">{selectedPoint.name}</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedPoint.description}
          </p>
        </div>
      )}
    </div>
  );
}
