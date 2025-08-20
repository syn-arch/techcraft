"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, BarChart3, MoreHorizontal, ShoppingBag, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currencyIDR } from "@/lib/utils";

// ---- Demo data ----
const sales = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 22 },
  { month: "Apr", value: 19 },
  { month: "May", value: 26 },
  { month: "Jun", value: 31 },
  { month: "Jul", value: 29 },
  { month: "Aug", value: 35 },
];

const orders = [
  {
    id: "#INV-1008",
    customer: "Dewi Anggraeni",
    date: "2025-08-16",
    amount: 890000,
    status: "Paid",
  },
  {
    id: "#INV-1007",
    customer: "Budi Santoso",
    date: "2025-08-15",
    amount: 420000,
    status: "Pending",
  },
  {
    id: "#INV-1006",
    customer: "Siti Aisyah",
    date: "2025-08-14",
    amount: 1575000,
    status: "Paid",
  },
  {
    id: "#INV-1005",
    customer: "Andi Wijaya",
    date: "2025-08-13",
    amount: 275000,
    status: "Refund",
  },
];

function StatCard({
  title,
  value,
  delta,
  up = true,
  icon: Icon,
}: {
  title: string;
  value: string;
  delta: string;
  up?: boolean;
  icon: React.ElementType;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs mt-1 flex items-center gap-1 ${
            up ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {up ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}{" "}
          {delta}
        </p>
      </CardContent>
    </Card>
  );
}
export default function Dashboard() {
  return (
    <>
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Selamat datang kembali, User 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan performa hari ini.
          </p>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pendapatan"
          value={currencyIDR(45250000)}
          delta="+12.4% dari minggu lalu"
          up
          icon={BarChart3}
        />
        <StatCard
          title="Pesanan"
          value="1.284"
          delta="+3.1%"
          up
          icon={ShoppingBag}
        />
        <StatCard
          title="Konversi"
          value="2.8%"
          delta="-0.4%"
          up={false}
          icon={ArrowDownRight}
        />
        <StatCard
          title="Pengguna Aktif"
          value="3.912"
          delta="+5.6%"
          up
          icon={Users2}
        />
      </div>

      {/* Chart & Progress */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Penjualan 8 Bulan Terakhir</CardTitle>
            <CardDescription>
              Performa penjualan per bulan (ribuan)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sales}
                margin={{ left: 0, right: 8, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="currentColor"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="currentColor"
                      stopOpacity={0.03}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis className="text-xs" tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{ borderRadius: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="currentColor"
                  fill="url(#fill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Bulan Ini</CardTitle>
            <CardDescription>Progress terhadap target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Penjualan</span>
                <span className="text-muted-foreground">72%</span>
              </div>
              <Progress value={72} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Pengguna Baru</span>
                <span className="text-muted-foreground">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Tiket Selesai</span>
                <span className="text-muted-foreground">86%</span>
              </div>
              <Progress value={86} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
