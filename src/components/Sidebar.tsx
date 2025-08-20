import Link from "next/link";
import { Button } from "./ui/button";
import {
  Menu,
  LayoutGrid,
  Users2,
  BarChart3,
  ShieldCheck,
  Package,
  ShoppingCart,
  User,
  Folder,
  LogOut,
  UsersRound,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "Data Klien",
    url: "/client",
    icon: Users2,
  },
  {
    name: "Data User",
    url: "/user",
    icon: UsersRound,
  },
  {
    name: "Data Role",
    url: "/role",
    icon: ShieldCheck,
  },
  {
    name: "Data Paket",
    url: "/package",
    icon: Package,
  },
  {
    name: "Data Order",
    url: "/order",
    icon: ShoppingCart,
  },
  {
    name: "Data Project",
    url: "/project",
    icon: Folder,
  },
  {
    name: "Laporan",
    url: "/report",
    icon: BarChart3,
  },
  {
    name: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    name: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block">
      <nav className="space-y-1">
        {menu.map((item) => (
          <Link
            href={`${item.url}`}
            className="hover:cursor-pointer"
            key={item.name}
          >
            <Button
              key={item.name}
              variant={item.name === "Overview" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <item.icon className="h-4 w-4" /> {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
