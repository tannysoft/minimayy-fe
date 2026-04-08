import Link from "next/link";
import Sparkle from "./Sparkle";
import { Swirl } from "./Ornament";

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@minimayyblog" },
  { label: "TikTok", href: "https://www.tiktok.com/@minimayyblog" },
  { label: "Instagram", href: "https://www.instagram.com/minimayyblog" },
  { label: "Facebook", href: "https://www.facebook.com/minimayyblog" },
  { label: "X", href: "https://twitter.com/minimayyblog" },
];

export default function Footer() {
  return (
    <footer className="relative bg-cream-200 border-t border-sand-300/40 mt-24">
      <Swirl className="absolute -top-10 right-8 w-56 text-sand-400/40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <Sparkle size={20} className="text-gold animate-twinkle" />
              <span className="font-display text-3xl text-taupe-700">
                Minimayy Blog
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-taupe-600">
              รีวิวสกินแคร์ และวิธีดูแลผิว เหมาะสำหรับคนที่อยากมีผิวสวย หน้าใส
              ไร้สิว ดูอ่อนกว่าวัย เขียนด้วยความตั้งใจตั้งแต่ปี 2013
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-luxe text-taupe-600">
              Skincare · Beauty · Holistic Wellness
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-luxe text-taupe-700 mb-5">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-taupe-600">
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/category/facial-care-review"
                  className="hover:text-gold transition-colors"
                >
                  Facial Care
                </Link>
              </li>
              <li>
                <Link
                  href="/category/moisturizer-review"
                  className="hover:text-gold transition-colors"
                >
                  Moisturizer
                </Link>
              </li>
              <li>
                <Link
                  href="/category/cleanser-review"
                  className="hover:text-gold transition-colors"
                >
                  Cleanser
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gold transition-colors"
                >
                  About Minimayy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-[11px] uppercase tracking-luxe text-taupe-700 mb-5">
              Let&apos;s Collaborate
            </h4>
            <ul className="space-y-2 text-sm text-taupe-600">
              <li>
                <span className="text-taupe-700">LINE:</span> @minimayyblog
              </li>
              <li>
                <span className="text-taupe-700">Email:</span>{" "}
                <a
                  href="mailto:minimayyblog@gmail.com"
                  className="hover:text-gold transition-colors"
                >
                  minimayyblog@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-luxe text-taupe-700 border border-sand-400/60 rounded-full px-4 py-1.5 hover:bg-taupe-700 hover:text-cream-100 hover:border-taupe-700 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-sand-300/40 flex flex-col sm:flex-row gap-4 items-center justify-between text-[11px] uppercase tracking-luxe text-taupe-600">
          <p>© {new Date().getFullYear()} Minimayy Blog · All Rights Reserved</p>
          <p className="flex items-center gap-2">
            Crafted with
            <Sparkle size={10} className="text-gold" />
            in Bangkok
          </p>
        </div>
      </div>
    </footer>
  );
}
