"use client";

import Link from "next/link";
import { HandCoins, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./menu-mobile";
import { logout } from "../_actions/logout";

export function Header() {
  async function handleLogout() {
    await logout();
  }

  return (
    <header className="border-b py-6 px-4 sticky top-0 z-50 bg-background/50 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between max-md:hidden">
        <div className="flex items-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
          <HandCoins className="h-6 w-6 mr-2 text-pink-600" />
          <span>DonArt</span>
        </div>

        <nav className="flex items-center space-x-4">
          <Button asChild variant="link">
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-white text-white"
            >
              Dashboard
            </Link>
          </Button>

          <Button asChild variant="link">
            <Link
              href="/dashboard/content-studio"
              className="text-sm font-medium transition-colors hover:text-white text-white"
            >
              Content Studio
            </Link>
          </Button>

          <Button asChild variant="link">
            <Link
              href="/dashboard/me"
              className="text-sm font-medium transition-colors hover:text-white text-white"
            >
              Meu perfil
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </nav>
      </div>

      <MobileMenu />
    </header>
  );
}
