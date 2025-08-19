"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  type: "login" | "register";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  className?: string;
}

export function AuthCard({
  type,
  onSubmit,
  loading,
  className,
}: AuthCardProps) {
  const isLogin = type === "login";
  return (
    <Card className={cn("w-full max-w-sm mx-auto", className)}>
      <CardHeader>
        <CardTitle>{isLogin ? "Masuk" : "Daftar"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "Gunakan email dan password untuk masuk."
            : "Buat akun baru dengan mengisi form berikut."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nama lengkap"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirm">Konfirmasi Password</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? isLogin
                ? "Sedang masuk..."
                : "Sedang mendaftar..."
              : isLogin
              ? "Masuk"
              : "Daftar"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          {isLogin ? (
            <>
              Belum punya akun?{" "}
              <a href="/register" className="text-mysecondary hover:underline">
                Daftar sekarang
              </a>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <a href="/login" className="text-mysecondary hover:underline">
                Masuk
              </a>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
