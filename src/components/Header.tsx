"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { LoginDialog } from "@/components/auth/LoginDialog";

export default function Header() {
  const pathname = usePathname();
  const user = false;
  const routes = [
    { href: "/", label: "Início" },
    { href: "/destinos", label: "Destinos" },
    { href: "/promocoes", label: "Promoções" },
    { href: "/categorias", label: "Categorias" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10 justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 active:text-red-500"
          >
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="BlueDestination Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="hidden font-bold sm:inline-block">
              BlueDestination
            </span>
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.href
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline-block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/minha-conta">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/minha-conta/reservas">Minhas reservas</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/minha-conta/favoritos">Favoritos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <LoginDialog />
              <RegisterDialog />
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="BlueDestination Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <span className="font-bold">BlueDestination</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        pathname === route.href
                          ? "text-foreground"
                          : "text-foreground/60"
                      }`}
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 mt-auto">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4" />
                        <span>{user.name}</span>
                      </div>
                      <Link href="/minha-conta">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Minha conta
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <LoginDialog />
                      <RegisterDialog />
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
