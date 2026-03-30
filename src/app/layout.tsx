import type { Metadata } from "next";
import { League_Spartan, Inter } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ABN Group | Strategy, Digital & Brand Excellence",
  description:
    "ABN Group builds world-class digital experiences, brands and strategies for ambitious businesses ready to lead their market.",
  openGraph: {
    title: "ABN Group | Strategy, Digital & Brand Excellence",
    description:
      "ABN Group builds world-class digital experiences, brands and strategies for ambitious businesses ready to lead their market.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
