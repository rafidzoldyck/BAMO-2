import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BAMO — Bengali Ani-Manhwa Obsession",
  description: "Minimalist community for Bengali Anime & Manhwa enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] text-[#111827] antialiased`}>
        {children}
      </body>
    </html>
  );
}
