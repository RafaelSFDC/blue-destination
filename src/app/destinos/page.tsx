import { Suspense } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchForm } from "@/components/SearchForm";
import { DestinationsList } from "@/components/destination/DestinationList";
import { destinations } from "@/lib/consts";

export const metadata = {
  title: "Destinos | BlueDestination",
  description:
    "Explore os melhores destinos turísticos e encontre seu próximo lugar para visitar",
};

export default async function DestinosPage() {
  return (
    <>
      <main className="flex-1">
        <div className="w-full bg-primary text-primary-foreground p-4 md:p-8">
          <div className="mb-8 flex justify-between items-center text-center flex-col">
            <h1 className="text-3xl font-bold mb-4">Explore Nossos Destinos</h1>
            <p className="text-white max-w-3xl">
              Descubra lugares incríveis para sua próxima viagem. De praias
              paradisíacas a cidades históricas, temos opções para todos os
              gostos.
            </p>
          </div>

          <div className="text-muted-foreground mx-auto w-fit">
            <SearchForm />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 w-full">
          <Suspense fallback={<DestinosSkeletonLoader />}>
            <DestinationsListWrapper />
          </Suspense>
        </div>
      </main>
    </>
  );
}

async function DestinationsListWrapper() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Todos os Destinos</h2>
          <p className="text-muted-foreground">
            {destinations.length} destinos encontrados
          </p>
        </div>
      </div>

      <DestinationsList destinations={destinations} />

      {destinations.length > 24 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">Carregar Mais Destinos</Button>
        </div>
      )}
    </div>
  );
}

function DestinosSkeletonLoader() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
      </div>
    </div>
  );
}
