import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import QuickView from "@/components/QuickView";
import SizeGuideModal from "@/components/SizeGuide";
import Toaster from "@/components/Toaster";

export const metadata: Metadata = {
  title: { default: "SOLID Racks — Streetwear & Urban Fashion", template: "%s — SOLID Racks" },
  description: "Modern streetwear and urban essentials for men and women. Oversized hoodies, heavyweight tees, cargos and accessories. Own your everyday.",
};

export const viewport: Viewport = { themeColor: "#080808" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Allura&family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <StoreProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <QuickView />
          <SizeGuideModal />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
