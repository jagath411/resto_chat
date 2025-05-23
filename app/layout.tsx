import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <nav className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
            <h1 className="text-xl font-bold mb-6">Dashboard</h1>
            <Link href="/order" className="hover:bg-gray-800 p-2 rounded">
              Order
            </Link>
            <Link href="/payment" className="hover:bg-gray-800 p-2 rounded">
              Payment
            </Link>
            <Link
              href="/order-history"
              className="hover:bg-gray-800 p-2 rounded"
            >
              Order History
            </Link>
            <Link href="/about" className="hover:bg-gray-800 p-2 rounded">
              About
            </Link>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
