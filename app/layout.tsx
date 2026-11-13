import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/resume";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  title: `${profile.name} — terminal`,
  description: profile.tagline,
  authors: [{ name: profile.name, url: "https://alexhoule.com" }],
  keywords: [
    "Alex Houle",
    "Computer Science",
    "University of New Hampshire",
    "networking",
    "systems programming",
    "cybersecurity",
    "Linux",
  ],
  openGraph: {
    title: `${profile.name} — terminal`,
    description: profile.tagline,
    type: "profile",
    url: "https://alexhoule.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0e12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
