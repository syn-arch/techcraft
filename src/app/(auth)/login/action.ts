// app/(auth)/login/actions.ts
"use server";

import { cookies, headers } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // 1. ambil CSRF cookie
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    cache: "no-store",
  });

  // 2. login
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      // forward cookie ke Node (penting saat server render)
      cookie: (await headers()).get("cookie") ?? "",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? "Login gagal");
  }
}
