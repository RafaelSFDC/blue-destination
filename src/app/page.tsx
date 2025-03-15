import Image from "next/image";
import { SearchForm } from "@/components/SearchForm";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  blogPosts,
  categories,
  popularDestinations,
  promotions,
  testimonials,
} from "@/lib/consts";
import { DestinationCard } from "@/components/DestinationCard";
import { CategoryCard } from "@/components/CategoryCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlogCard } from "../components/BlogCard";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Destino paradisíaco"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Descubra o mundo com a BlueDestination
            </h1>
            <p className="mt-6 text-lg md:text-xl">
              Encontre os melhores destinos e pacotes de viagem para suas
              próximas férias. Planeje sua aventura dos sonhos com facilidade e
              segurança.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Destinos Populares */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Destinos Populares
              </h2>
              <p className="mt-2 text-muted-foreground">
                Os destinos mais procurados pelos nossos viajantes
              </p>
            </div>
            <Link href="/destinos">
              <Button variant="ghost" className="gap-1">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularDestinations.map((destination) => (
              <DestinationCard
                key={destination.$id}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promoções */}
      <section className="bg-muted py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Promoções Especiais
              </h2>
              <p className="mt-2 text-muted-foreground">
                Aproveite nossas ofertas por tempo limitado
              </p>
            </div>
            <Link href="/promocoes">
              <Button variant="ghost" className="gap-1">
                Ver todas <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promotion) => (
              <DestinationCard key={promotion.$id} destination={promotion} />
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Explore por Categoria
            </h2>
            <p className="mt-2 text-muted-foreground">
              Encontre o tipo de viagem perfeito para você
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.$id + category.name}
                category={category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-muted py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              O que nossos clientes dizem
            </h2>
            <p className="mt-2 text-muted-foreground">
              Experiências reais de quem viajou conosco
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.userName}
                avatar={testimonial.userAvatar}
                rating={testimonial.rating}
                text={testimonial.comment}
                date={testimonial.date}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Blog de Viagens
              </h2>
              <p className="mt-2 text-muted-foreground">
                Dicas, inspirações e guias para suas próximas aventuras
              </p>
            </div>
            <Link href="/blog">
              <Button variant="ghost" className="gap-1">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.$id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Pronto para sua próxima aventura?
            </h2>
            <p className="mt-4 text-lg">
              Cadastre-se agora e receba ofertas exclusivas para os melhores
              destinos.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg">Explorar destinos</Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Fale conosco
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
