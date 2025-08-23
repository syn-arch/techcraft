"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// 1) Schema validasi dengan Zod
const schema = z.object({
  name: z.string(),
});

export type FormValues = z.infer<typeof schema>;

// 2) Komponen Form
export default function UserForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  // 3) Submit handler (contoh: kirim ke API route /api/users)
  const onSubmit = async (values: FormValues) => {
    // Simulasi request
    await new Promise((r) => setTimeout(r, 600));

    // Contoh panggil API:
    // const res = await fetch("/api/users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
    // if (!res.ok) throw new Error("Gagal menyimpan");

    toast.success("Pengguna berhasil ditambahkan!");

    form.reset();
  };

  return (
    <div className="w-full grid place-items-center p-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tambah Role</CardTitle>
          <Link href="/role">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowLeft /> Kembali
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Nama" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting ? "Menyimpan…" : "Simpan"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
