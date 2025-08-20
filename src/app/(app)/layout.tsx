"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";
import { Toaster } from "sonner";

export default function SimpleDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Toaster position="bottom-right" />
      {/* Topbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="font-semibold text-lg">TechCraft – Dashboard</div>
          <div className="ml-auto flex items-center gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src="https://i.pravatar.cc/100?img=13"
                    alt="Ady"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="container max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        <Sidebar />
        <main className="space-y-6">
          {children}

          <div className="text-xs text-muted-foreground text-center py-4">
            © {new Date().getFullYear()} Tech Craft. Built with Next.js &copy;{" "}
            <Link
              href="https://twitter.com/techcraft"
              target="_blank"
              rel="noreferrer"
            >
              @techcraft
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
