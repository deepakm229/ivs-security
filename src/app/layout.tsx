import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { Providers } from "@/components/providers";
import { SITE_NAME, getSiteUrl } from "@/lib/constants";
import { SITE_CITY } from "@/lib/site-contact";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = getSiteUrl();
const city = SITE_CITY;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Security Guard Services in ${city}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "IVS Security provides trained security personnel for residential buildings, commercial sites, and events. Request a quote for reliable manpower services.",
  openGraph: {
    title: `${SITE_NAME} | Security Guard Services`,
    description:
      "Reliable security manpower for residential, commercial, and event requirements.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white pb-20 text-slate-900 antialiased md:pb-0">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileCTA />
        </Providers>
      </body>
    </html>
  );
}
