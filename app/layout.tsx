import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spiritual Tattoo Studio — Custom Tattoo Art",
  description:
    "Original blackwork, fine-line, large-scale, and cover-up tattoos created in a private appointment-only studio.",
  keywords: [
    "custom tattoo studio",
    "blackwork tattoo",
    "fine line tattoo",
    "tattoo consultation",
    "Spiritual Tattoo Studio",
  ],
  openGraph: {
    title: "Spiritual Tattoo Studio — Custom Tattoo Art",
    description:
      "One-of-one tattoos designed around anatomy, movement, and longevity.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
