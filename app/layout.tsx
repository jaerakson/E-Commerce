import type { Metadata } from "next";
import { Anton, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./stitch-pages.css";
import Providers from "./providers";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const inter = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "AETHER — Premium E-Commerce",
  description:
    "Cinematic dark-mode luxury e-commerce. A curated selection of premium essentials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${anton.variable} ${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* Material Symbols icon font used across the Stitch (AETHER) designs */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-pure-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
