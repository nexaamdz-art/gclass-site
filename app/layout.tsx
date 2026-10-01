import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const barlowCondensed = localFont({
  src: "../public/fonts/BarlowCondensed-ExtraBold.woff2",
  weight: "800",
  variable: "--font-barlow-condensed",
  display: "swap",
});

const inter = localFont({
  src: "../public/fonts/Inter-Regular.woff2",
  weight: "400",
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ADADAF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "G63.",
  description: "Built boxy. On purpose. 585 HP V8.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable}`}
    >
      <body className="bg-[#ADADAF] text-[#0A0A0A] font-inter antialiased selection:bg-[#0A0A0A] selection:text-[#ADADAF] min-h-screen">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
