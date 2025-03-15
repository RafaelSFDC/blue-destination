"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      // Conectar com o Appwrite para inscrição na newsletter

      toast("Inscrição realizada com sucesso!", {
        description: "Você receberá nossas melhores ofertas por email.",
      });

      form.reset();
    } catch {
      toast.error("Erro ao se inscrever", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="BlueDestination Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="font-bold">BlueDestination</span>
            </Link>
            <p className="text-sm">
              Sua próxima aventura começa aqui. Descubra destinos incríveis e
              crie memórias inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary-foreground/80">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-primary-foreground/80">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-primary-foreground/80">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary-foreground/80">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Destinos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Praias
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Montanhas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Cidades
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Internacionais
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Pacotes em promoção
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground/80">
                  Política de privacidade
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Newsletter</h3>
            <p className="mb-4 text-sm">
              Receba ofertas exclusivas e dicas de viagem diretamente no seu
              email.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="seu@email.com"
                            {...field}
                            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                            disabled={isLoading}
                          />
                          <Button
                            type="submit"
                            variant="secondary"
                            size="sm"
                            disabled={isLoading}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            {isLoading ? "Enviando..." : "Enviar"}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} BlueDestination. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
