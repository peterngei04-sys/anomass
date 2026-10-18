import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
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
  metadataBase: new URL(
    "https://anomass.vercel.app"
  ),
  title: {
    default: "Anomass — Speak freely",
    template: "%s | Anomass",
  },
  description:
    "Send anonymous messages to your friends. No names attached.",
  applicationName: "Anomass",
  openGraph: {
    title: "Anomass — Speak freely",
    description:
      "Send anonymous messages to your friends. No names attached.",
    siteName: "Anomass",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Anomass — anonymous messages, real feelings.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anomass — Speak freely",
    description:
      "Send anonymous messages to your friends. No names attached.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
