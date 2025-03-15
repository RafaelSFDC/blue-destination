"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Camera, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ReviewItem } from "@/components/ReviewItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { user } from "@/lib/consts";
import { Review } from "@/schemas/reviews";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcular a distribuição de ratings
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews
      ? reviews.filter((review) => review.rating === star).length
      : 0;
    const percentage =
      reviews && reviews.length ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  // Calcular a média das avaliações
  const averageRating =
    reviews && reviews.length
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  // Enviar avaliação
  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Faça login para avaliar", {
        description: "Você precisa estar logado para deixar uma avaliação.",
      });
      return;
    }

    if (rating === 0) {
      toast.error("Selecione uma classificação", {
        description:
          "Você precisa selecionar uma classificação de 1 a 5 estrelas.",
      });
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Digite sua avaliação", {
        description:
          "Por favor, compartilhe sua experiência sobre este destino.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      toast.success("Avaliação enviada", {
        description:
          "Sua avaliação foi enviada com sucesso. Obrigado pelo feedback!",
      });

      setShowReviewForm(false);
      setReviewText("");
      setRating(0);

      // Idealmente, atualizaríamos a lista de avaliações aqui
      // Mas isso exigiria um estado global ou uma nova consulta ao servidor
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      toast("Erro ao enviar avaliação", {
        description:
          "Não foi possível enviar sua avaliação. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtrar avaliações com fotos
  const reviewsWithPhotos = reviews
    ? reviews.filter((review) => review.photos && review.photos.length > 0)
    : [];

  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            Todas ({reviews ? reviews.length : 0})
          </TabsTrigger>
          <TabsTrigger value="photos">
            Com fotos ({reviewsWithPhotos.length})
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Resumo das avaliações */}
          <Card className="md:w-1/3">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {reviews ? reviews.length : 0}{" "}
                  {reviews && reviews.length === 1 ? "avaliação" : "avaliações"}
                </div>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-2">
                    <div className="w-12 text-sm">{star} estrelas</div>
                    <Progress value={percentage} className="h-2" />
                    <div className="w-8 text-sm text-right">{count}</div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => setShowReviewForm(true)}
              >
                Avaliar este destino
              </Button>
            </CardContent>
          </Card>

          {/* Lista de avaliações */}
          <div className="md:w-2/3">
            <TabsContent value="all" className="space-y-4 mt-0">
              {reviews && reviews.length > 0 ? (
                <>
                  {(showAllReviews ? reviews : reviews.slice(0, 3)).map(
                    (review) => (
                      <ReviewItem key={review.$id} review={review} />
                    )
                  )}

                  {reviews.length > 3 && !showAllReviews && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowAllReviews(true)}
                    >
                      Ver todas as {reviews.length} avaliações
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <User className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    Nenhuma avaliação ainda
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Seja o primeiro a avaliar este destino!
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Avaliar este destino
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="photos" className="mt-0">
              {reviewsWithPhotos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {reviewsWithPhotos.flatMap((review) =>
                    review.photos?.map((photo: string, index: number) => (
                      <Dialog key={`${review.$id}-${index}`}>
                        <DialogTrigger asChild>
                          <div className="relative aspect-square cursor-pointer overflow-hidden rounded-md">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`Foto enviada por ${review.userName}`}
                              fill
                              className="object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                          <DialogHeader>
                            <DialogTitle>Foto de {review.userName}</DialogTitle>
                          </DialogHeader>
                          <div className="relative aspect-video w-full overflow-hidden rounded-md">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`Foto enviada por ${review.userName}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </DialogContent>
                      </Dialog>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    Nenhuma foto ainda
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Seja o primeiro a compartilhar fotos deste destino!
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Avaliar e compartilhar fotos
                  </Button>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Modal de avaliação */}
      <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Avaliar este destino</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Sua classificação
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium mb-2"
              >
                Sua avaliação
              </label>
              <textarea
                id="review"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Compartilhe sua experiência sobre este destino..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowReviewForm(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmitReview} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar avaliação"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
