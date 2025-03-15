"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Calendar, Thermometer, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { ImageGallery } from "@/components/ImageGalery";
import { DestinationCard } from "@/components/DestinationCard";
import { PackagesList } from "@/components/PackageList";
import { ReviewsSection } from "@/components/destination/ReviewsSection";
import { FaqSection } from "@/components/destination/FaqSection";
import { BlogCard } from "../blog/BlogCard";
import { BlogPost } from "@/schemas/blog";
import { Destination } from "@/schemas/destinations";
import { Package } from "@/schemas/packages";
import { Review } from "@/schemas/reviews";

interface DestinationProfileProps {
  destination: Destination;
  packages: Package[];
  reviews: Review[];
  blogPosts: BlogPost[];
  similarDestinations: Destination[];
}

export function DestinationProfile({
  destination,
  packages,
  reviews,
  blogPosts,
  similarDestinations,
}: DestinationProfileProps) {
  const isFavorite = true;
  // Calcular a média das avaliações
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header com imagem de destaque */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={
            destination.mainImage || "/placeholder.svg?height=600&width=1200"
          }
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {destination.name}
                </h1>
                <div className="flex items-center mt-2">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{destination.region}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    <StarRating rating={averageRating} />
                    <span className="ml-2 font-medium">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm">{reviews.length} avaliações</span>
                </div>
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="icon"
                  className={
                    isFavorite
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-white/20 hover:bg-white/30"
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-white" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna principal */}
          <div className="lg:w-2/3 space-y-8">
            {/* Informações principais */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="descricao">
                  <TabsList className="mb-4">
                    <TabsTrigger value="descricao">Descrição</TabsTrigger>
                    <TabsTrigger value="clima">Clima</TabsTrigger>
                  </TabsList>
                  <TabsContent value="descricao" className="space-y-4">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: destination.description,
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="clima" className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Thermometer className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-medium">Clima</h3>
                        <p className="text-muted-foreground">
                          {destination.climate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-medium">
                          Melhor época para visitar
                        </h3>
                        <p className="text-muted-foreground">
                          {destination.bestTimeToVisit}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Galeria de imagens */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Galeria</h2>
              <ImageGallery images={destination.images || []} />
            </div>

            {/* Mapa interativo */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Localização</h2>
              {/* <MapView
                location={{
                  lat: destination.coordinates?.latitude || 0,
                  lng: destination.coordinates?.longitude || 0,
                  address: destination.location,
                }}
                pointsOfInterest={destination.points_of_interest || []}
              /> */}
            </div>

            {/* Pacotes disponíveis */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Pacotes disponíveis</h2>
              <PackagesList packages={packages} />
            </div>

            {/* Avaliações */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
              <ReviewsSection reviews={reviews} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Compartilhar */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Compartilhar</h3>
                {/* <SocialShare
                  url={`https://bluedestination.com/destino/${destination.$id}`}
                  title={`Conheça ${destination.name} - BlueDestination`}
                  description={`Descubra as maravilhas de ${destination.name} e planeje sua próxima viagem!`}
                /> */}
              </CardContent>
            </Card>

            {/* Informações rápidas */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Informações rápidas</h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>Fuso horário: {destination.timezone || "GMT-3"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <span>Idiomas: {destination.languages || "Português"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>
                    Região: {destination.region || "Não especificada"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {destination.categories &&
                    destination.categories.map((tag) => (
                      <Badge key={tag.name} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Artigos do blog */}
            {blogPosts && blogPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Artigos relacionados
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <BlogCard key={post.$id} blog={post} />
                  ))}
                </div>
                <Button variant="link" className="mt-2 p-0" asChild>
                  <Link href="/blog">Ver mais artigos</Link>
                </Button>
              </div>
            )}

            {/* Destinos similares */}
            {similarDestinations && similarDestinations.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Destinos similares</h3>
                <div className="space-y-4">
                  {similarDestinations.slice(0, 3).map((dest) => (
                    <DestinationCard key={dest.$id} destination={dest} />
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <FaqSection faqs={destination.faqs || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
