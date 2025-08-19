import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Craft",
  description: "A platform for tech enthusiasts to connect, learn, and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${workSans.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
