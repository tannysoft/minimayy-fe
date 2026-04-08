import Link from "next/link";
import Sparkle, { SparkleOutline } from "./Sparkle";
import { Leaves, Swirl } from "./Ornament";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative ornaments */}
      <Leaves className="absolute -left-8 top-16 w-40 text-sand-400/50 pointer-events-none hidden md:block" />
      <Swirl className="absolute right-0 bottom-10 w-72 text-sand-400/40 pointer-events-none hidden lg:block" />
      <Sparkle
        size={28}
        className="absolute left-[12%] top-24 text-gold/60 animate-twinkle hidden md:block"
      />
      <SparkleOutline
        size={20}
        className="absolute right-[18%] top-32 text-taupe-700/50 animate-twinkle hidden md:block"
      />
      <Sparkle
        size={14}
        className="absolute left-[40%] bottom-24 text-gold/60 animate-twinkle hidden md:block"
      />

      <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-luxe text-taupe-600 mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sand-400" />
            Est. 2013 · Skincare Review
            <span className="h-px w-10 bg-sand-400" />
          </p>

          <h1 className="font-sans font-semibold text-5xl sm:text-6xl lg:text-8xl leading-[1.05] tracking-tight text-taupe-700">
            <span className="block">รีวิวสกินแคร์</span>
            <span className="block text-gold mt-2">หน้าใส หน้าเด็ก</span>
          </h1>

          <p className="mt-10 max-w-2xl mx-auto text-base sm:text-lg text-taupe-600 leading-relaxed">
            รีวิวผลิตภัณฑ์ และวิธีดูแลผิวอย่างละเอียด
            เหมาะสำหรับคนที่อยากมีผิวสวย ไร้สิว ดูอ่อนกว่าวัย
            <span className="block mt-2 font-display italic text-taupe-700">
              — Skincare Review by Minimayy Blog —
            </span>
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-taupe-700 text-cream-100 px-7 py-3.5 text-[11px] uppercase tracking-luxe rounded-full hover:bg-gold transition-colors"
            >
              Explore Reviews
              <Sparkle size={12} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-taupe-700 text-taupe-700 px-7 py-3.5 text-[11px] uppercase tracking-luxe rounded-full hover:bg-taupe-700 hover:text-cream-100 transition-colors"
            >
              About Minimayy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
