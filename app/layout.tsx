import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Mali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sansLatin = Inter({
  subsets: ["latin"],
  variable: "--font-sans-latin",
  display: "swap",
});

// Loopless Thai display (ไม่มีหัว) used for the hero title
const thaiDisplay = Mali({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Minimayy Blog – รีวิวสกินแคร์ หน้าใส หน้าเด็ก",
    template: "%s · Minimayy Blog",
  },
  description:
    "รีวิวสกินแคร์ และวิธีดูแลผิวเหมาะสำหรับคนที่อยากมีผิวสวย หน้าใส ไร้สิว ดูอ่อนกว่าวัย Skincare Review by Minimayy Blog",
  keywords: [
    "รีวิวสกินแคร์",
    "สกินแคร์",
    "หน้าใส",
    "หน้าเด็ก",
    "ดูแลผิว",
    "Minimayy",
    "Minimayy Blog",
    "skincare review",
  ],
  openGraph: {
    title: "Minimayy Blog – รีวิวสกินแคร์ หน้าใส หน้าเด็ก",
    description:
      "รีวิวสกินแคร์ และวิธีดูแลผิวเหมาะสำหรับคนที่อยากมีผิวสวย หน้าใส ไร้สิว ดูอ่อนกว่าวัย",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sansLatin.variable} ${thaiDisplay.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/now8udk.css"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans thai-text">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
