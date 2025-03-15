"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, SortAsc, Search, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PackagesListProps {
  packages: any[];
}

export function PackagesList({ packages: initialPackages }: PackagesListProps) {
  const [packages, setPackages] = useState(initialPackages || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price_asc");
  const [filters, setFilters] = useState({
    duration: [] as string[],
    type: [] as string[],
    priceRange: [0, 10000] as [number, number],
  });

  // Encontrar o preço mínimo e máximo para o slider
  const minPrice =
    initialPackages && initialPackages.length > 0
      ? Math.min(...initialPackages.map((pkg) => pkg.price || 0))
      : 0;
  const maxPrice =
    initialPackages && initialPackages.length > 0
      ? Math.max(...initialPackages.map((pkg) => pkg.price || 10000))
      : 10000;

  // Inicializar o filtro de preço com os valores mínimo e máximo
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }));
  }, [minPrice, maxPrice]);

  // Atualizar os filtros
  useEffect(() => {
    if (!initialPackages || initialPackages.length === 0) {
      setPackages([]);
      return;
    }

    let filteredPackages = [...initialPackages];

    // Aplicar filtro de busca
    if (searchQuery) {
      filteredPackages = filteredPackages.filter((pkg) =>
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Aplicar filtro de duração
    if (filters.duration.length > 0) {
      filteredPackages = filteredPackages.filter((pkg) =>
        filters.duration.includes(pkg.duration)
      );
    }

    // Aplicar filtro de tipo
    if (filters.type.length > 0) {
      filteredPackages = filteredPackages.filter((pkg) =>
        filters.type.includes(pkg.type)
      );
    }

    // Aplicar filtro de preço
    filteredPackages = filteredPackages.filter(
      (pkg) =>
        pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1]
    );

    // Aplicar ordenação
    switch (sortBy) {
      case "price_asc":
        filteredPackages.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price_desc":
        filteredPackages.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "duration_asc":
        filteredPackages.sort(
          (a, b) =>
            Number.parseInt(a.duration || "0") -
            Number.parseInt(b.duration || "0")
        );
        break;
      case "duration_desc":
        filteredPackages.sort(
          (a, b) =>
            Number.parseInt(b.duration || "0") -
            Number.parseInt(a.duration || "0")
        );
        break;
      case "popularity":
        filteredPackages.sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0)
        );
        break;
      default:
        break;
    }

    setPackages(filteredPackages);
  }, [initialPackages, searchQuery, sortBy, filters]);

  // Extrair opções únicas para os filtros
  const durationOptions =
    initialPackages && initialPackages.length > 0
      ? Array.from(
          new Set(
            initialPackages.map((pkg) => pkg.duration || "").filter(Boolean)
          )
        )
      : [];
  const typeOptions =
    initialPackages && initialPackages.length > 0
      ? Array.from(
          new Set(initialPackages.map((pkg) => pkg.type || "").filter(Boolean))
        )
      : [];

  // Formatar preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // Manipular mudança no filtro de duração
  const handleDurationChange = (duration: string) => {
    setFilters((prev) => {
      const newDurations = prev.duration.includes(duration)
        ? prev.duration.filter((d) => d !== duration)
        : [...prev.duration, duration];

      return { ...prev, duration: newDurations };
    });
  };

  // Manipular mudança no filtro de tipo
  const handleTypeChange = (type: string) => {
    setFilters((prev) => {
      const newTypes = prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type];

      return { ...prev, type: newTypes };
    });
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setFilters({
      duration: [],
      type: [],
      priceRange: [minPrice, maxPrice],
    });
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pacotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                {(filters.duration.length > 0 ||
                  filters.type.length > 0 ||
                  filters.priceRange[0] > minPrice ||
                  filters.priceRange[1] < maxPrice) && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.duration.length +
                      filters.type.length +
                      (filters.priceRange[0] > minPrice ||
                      filters.priceRange[1] < maxPrice
                        ? 1
                        : 0)}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filtros</h4>
                <Separator />

                {durationOptions.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Duração</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {durationOptions.map((duration) => (
                        <div
                          key={duration}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`duration-${duration}`}
                            checked={filters.duration.includes(duration)}
                            onCheckedChange={() =>
                              handleDurationChange(duration)
                            }
                          />
                          <Label
                            htmlFor={`duration-${duration}`}
                            className="text-sm"
                          >
                            {duration}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {typeOptions.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Tipo</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {typeOptions.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={filters.type.includes(type)}
                            onCheckedChange={() => handleTypeChange(type)}
                          />
                          <Label htmlFor={`type-${type}`} className="text-sm">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium">Faixa de preço</h5>
                    <span className="text-xs text-muted-foreground">
                      {formatPrice(filters.priceRange[0])} -{" "}
                      {formatPrice(filters.priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={100}
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: value as [number, number],
                      }))
                    }
                    className="py-4"
                  />
                </div>

                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <SortAsc className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Ordenar por" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Menor preço</SelectItem>
              <SelectItem value="price_desc">Maior preço</SelectItem>
              <SelectItem value="duration_asc">Menor duração</SelectItem>
              <SelectItem value="duration_desc">Maior duração</SelectItem>
              <SelectItem value="popularity">Popularidade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mostrar filtros ativos */}
      {(filters.duration.length > 0 ||
        filters.type.length > 0 ||
        filters.priceRange[0] > minPrice ||
        filters.priceRange[1] < maxPrice) && (
        <div className="flex flex-wrap gap-2">
          {filters.duration.map((duration) => (
            <Badge
              key={duration}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {duration}
              <button
                onClick={() => handleDurationChange(duration)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remover</span>
              </button>
            </Badge>
          ))}

          {filters.type.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {type}
              <button
                onClick={() => handleTypeChange(type)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remover</span>
              </button>
            </Badge>
          ))}

          {(filters.priceRange[0] > minPrice ||
            filters.priceRange[1] < maxPrice) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {formatPrice(filters.priceRange[0])} -{" "}
              {formatPrice(filters.priceRange[1])}
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [minPrice, maxPrice],
                  }))
                }
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remover</span>
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Lista de pacotes */}
      {packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.$id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={
                    pkg.cover_image || "/placeholder.svg?height=200&width=400"
                  }
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{pkg.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{pkg.duration}</span>
                </div>
                <p className="mt-2 text-sm line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      A partir de
                    </span>
                    <p className="text-xl font-bold">
                      {formatPrice(pkg.price || 0)}
                    </p>
                  </div>
                  <Button asChild>
                    <Link href={`/pacote/${pkg.$id}`}>Ver detalhes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Nenhum pacote encontrado com os filtros selecionados.
          </p>
          <Button variant="link" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
