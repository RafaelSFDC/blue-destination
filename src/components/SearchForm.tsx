"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, MapPinIcon, SearchIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formSchema = z.object({
  destination: z.string().min(2, { message: "Destino é obrigatório" }),
  checkIn: z.date({ required_error: "Data de ida é obrigatória" }),
  checkOut: z.date({ required_error: "Data de volta é obrigatória" }),
  travelers: z
    .string()
    .min(1, { message: "Número de viajantes é obrigatório" }),
  category: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SearchForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      travelers: "2",
      category: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsLoading(true);

    // Construir query params para a página de resultados
    const params = new URLSearchParams();
    params.append("destination", values.destination);
    params.append("checkIn", values.checkIn.toISOString());
    params.append("checkOut", values.checkOut.toISOString());
    params.append("travelers", values.travelers);
    if (values.category) {
      params.append("category", values.category);
    }

    // Navegar para a página de resultados com os parâmetros
    router.push(`/resultados?${params.toString()}`);
  }

  return (
    <div className="w-fit rounded-lg bg-white p-6 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 flex-wrap"
        >
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Para onde você quer ir?</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cidade, país ou região"
                      className="pl-9"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ida</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volta</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const checkIn = form.getValues("checkIn");
                        return date < new Date() || (checkIn && date < checkIn);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="travelers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Viajantes</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UsersIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="pl-9">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 pessoa</SelectItem>
                        <SelectItem value="2">2 pessoas</SelectItem>
                        <SelectItem value="3">3 pessoas</SelectItem>
                        <SelectItem value="4">4 pessoas</SelectItem>
                        <SelectItem value="5">5+ pessoas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-auto" disabled={isLoading}>
            <SearchIcon className="mr-2 h-4 w-4" />
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
