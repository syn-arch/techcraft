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
import { cn, getCookie } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

interface AuthCardProps {
  type: "login" | "register";
  loading?: boolean; // optional: kalau mau dikontrol dari parent
  className?: string;
}

export function AuthCard({
  type,
  loading: loadingProp = false,
  className,
}: AuthCardProps) {
  const isLogin = type === "login";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(loadingProp);

  

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const fd = new FormData(e.currentTarget);

      // 1) CSRF
      const csrf = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
        {
          credentials: "include",
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      if (!csrf.ok) throw new Error("Gagal inisiasi CSRF");

      const xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) throw new Error("XSRF-TOKEN cookie tidak ditemukan");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        body: JSON.stringify({
          ...(isLogin
            ? {
                email: fd.get("email"),
                password: fd.get("password"),
              }
            : {
                name: fd.get("name"),
                email: fd.get("email"),
                password: fd.get("password"),
                password_confirmation: fd.get("password_confirmation"),
              }),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message ?? (isLogin ? "Login gagal" : "Registrasi gagal")
        );
      }

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

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
                name="password_confirmation"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

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
              <Link
                href="/register"
                className="text-mysecondary hover:underline"
              >
                Daftar sekarang
              </Link>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <Link href="/login" className="text-mysecondary hover:underline">
                Masuk
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
