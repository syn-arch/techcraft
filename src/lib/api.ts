// lib/api.ts
export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  return fetch(process.env.NEXT_PUBLIC_API_URL! + input, {
    ...init,
    // penting untuk kirim/terima cookie
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}
