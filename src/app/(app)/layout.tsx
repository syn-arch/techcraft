"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Menu,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  LayoutGrid,
  Users2,
  ShoppingBag,
  BarChart3,
  Settings,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

function currencyIDR(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

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

export default function SimpleDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Topbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="font-semibold text-lg">io.park – Dashboard</div>
          <div className="ml-auto flex items-center gap-2 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search…" className="pl-8 w-[260px]" />
              </div>
              <Badge variant="secondary" className="hidden lg:inline-flex">
                v1.0
              </Badge>
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
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
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="container max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <nav className="space-y-1">
            {[
              { name: "Overview", icon: LayoutGrid },
              { name: "Orders", icon: ShoppingBag },
              { name: "Customers", icon: Users2 },
              { name: "Reports", icon: BarChart3 },
              { name: "Settings", icon: Settings },
            ].map((item) => (
              <Button
                key={item.name}
                variant={item.name === "Overview" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <item.icon className="h-4 w-4" /> {item.name}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="space-y-6">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-end justify-between"
          >
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Selamat datang kembali, Ady 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Ringkasan performa hari ini.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Export
              </Button>
              <Button size="sm">Tambah Data</Button>
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
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="month"
                      className="text-xs"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      className="text-xs"
                      tickLine={false}
                      axisLine={false}
                    />
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

          {/* Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pesanan Terbaru</CardTitle>
                <CardDescription>
                  Pembaharuan dalam 7 hari terakhir
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                Lihat semua <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Tanggal
                    </TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Aksi</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">{o.id}</TableCell>
                      <TableCell>{o.customer}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {o.date}
                      </TableCell>
                      <TableCell className="text-right">
                        {currencyIDR(o.amount)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={
                            o.status === "Paid"
                              ? "default"
                              : o.status === "Pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {o.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-xs text-muted-foreground text-center py-4">
            © {new Date().getFullYear()} Your Company. Built with Next.js,
            Tailwind CSS & shadcn/ui.
          </div>
        </main>
      </div>
    </div>
  );
}
