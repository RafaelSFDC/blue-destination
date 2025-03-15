import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { DestinationProfile } from "@/components/destination/DestinationProfile";
import { getBlogPosts } from "@/actions/blog";
import { getPackages } from "@/actions/packages";
import { getReviews } from "@/actions/reviews";
import { getDestination, getDestinations } from "@/actions/destination";

export const metadata = {
  title: "Detalhes do Destino | BlueDestination",
  description:
    "Conheça todos os detalhes deste incrível destino e planeje sua viagem",
};

interface DestinationPageProps {
  params: {
    id: string;
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  try {
    // Buscar dados do destino primeiro, pois precisamos validar se existe
    const destination = await getDestination(params.id);
    if (!destination) {
      return notFound();
    }

    const [
      packagesResponse,
      reviewsResponse,
      blogPostsResponse,
      similarDestinationsResponse,
    ] = await Promise.all([
      getPackages({ destinationId: params.id }),
      getReviews({ destinationId: params.id }),
      getBlogPosts({ tags: [destination.name] }),
      getDestinations({
        region: destination.region,
        categories: destination.categories,
        excludeId: params.id,
      }),
    ]);

    return (
      <Suspense fallback={<DestinationSkeleton />}>
        <DestinationProfile
          destination={destination}
          packages={packagesResponse.documents || []}
          reviews={reviewsResponse.documents || []}
          blogPosts={blogPostsResponse.documents || []}
          similarDestinations={similarDestinationsResponse.documents || []}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Erro ao carregar página do destino:", error);
    return notFound();
  }
}

function DestinationSkeleton() {
  return (
    <div className="space-y-8">
      <div className="relative h-[50vh] w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="container mx-auto px-4 space-y-8">
        <Skeleton className="h-12 w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
