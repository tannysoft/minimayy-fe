import Link from "next/link";
import Sparkle from "@/components/Sparkle";
import { Leaves, Swirl } from "@/components/Ornament";

export const metadata = {
  title: "About",
  description:
    "Minimayy Blog มีจุดเริ่มต้นมาจากเว็บไซต์ minimayy.com ตั้งแต่ปี 2013 พื้นที่รวบรวมและแบ่งปันเรื่องสกินแคร์",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Leaves className="absolute left-0 top-20 w-48 text-sand-400/40 pointer-events-none hidden md:block" />
        <Swirl className="absolute right-0 bottom-0 w-80 text-sand-400/40 pointer-events-none hidden lg:block" />

        <div className="mx-auto max-w-5xl px-5 lg:px-10 pt-24 pb-20 text-center">
          <p className="text-[11px] uppercase tracking-luxe text-taupe-600 mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sand-400" />
            Hi! I Am
            <span className="h-px w-10 bg-sand-400" />
          </p>
          <h1 className="font-display text-6xl lg:text-8xl text-taupe-700 leading-[1]">
            Minimayy<span className="text-gold">blog</span>
          </h1>
          <p className="mt-10 max-w-2xl mx-auto text-taupe-600 leading-relaxed">
            Minimayy Blog มีจุดเริ่มต้นมาจากเว็บไซต์{" "}
            <span className="text-taupe-700">minimayy.com</span>{" "}
            ตั้งแต่ปี 2013 เมย์ชอบเรื่องผิวและสกินแคร์มาก ทั้งชอบใช้ และชอบบอกต่อ
            จึงสร้างเว็บขึ้นมาเพื่อเป็นพื้นที่รวบรวม
            และแบ่งปันกับทุกคนที่สนใจเรื่องเดียวกัน
          </p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-sand-300/40 bg-cream-200/60"
      >
        <Swirl className="absolute -top-6 left-0 w-72 text-sand-400/40 pointer-events-none hidden md:block" />
        <div className="mx-auto max-w-4xl px-5 lg:px-10 py-24 text-center relative">
          <Sparkle size={22} className="text-gold animate-twinkle mx-auto" />
          <h2 className="mt-6 font-display text-5xl lg:text-6xl text-taupe-700 leading-tight">
            Let&apos;s Collaborate!
          </h2>
          <p className="mt-6 text-taupe-600">
            สนใจร่วมงาน หรือส่งผลิตภัณฑ์รีวิว ติดต่อได้ตามช่องทางด้านล่าง
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="rounded-2xl border border-sand-400/50 bg-cream-50 p-8">
              <p className="text-[11px] uppercase tracking-luxe text-taupe-600">
                LINE Add
              </p>
              <p className="mt-2 font-display text-xl sm:text-2xl text-taupe-700 whitespace-nowrap">
                @minimayyblog
              </p>
            </div>
            <div className="rounded-2xl border border-sand-400/50 bg-cream-50 p-8">
              <p className="text-[11px] uppercase tracking-luxe text-taupe-600">
                Email
              </p>
              <a
                href="mailto:minimayyblog@gmail.com"
                className="mt-2 block font-display text-base sm:text-lg lg:text-xl text-taupe-700 hover:text-gold transition-colors whitespace-nowrap"
              >
                minimayyblog@gmail.com
              </a>
            </div>
          </div>

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-2 bg-taupe-700 text-cream-100 px-8 py-4 text-[11px] uppercase tracking-luxe rounded-full hover:bg-gold transition-colors"
          >
            Read the Latest Reviews
            <Sparkle size={12} />
          </Link>
        </div>
      </section>
    </>
  );
}
