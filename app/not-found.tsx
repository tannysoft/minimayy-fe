import Link from "next/link";
import Sparkle from "@/components/Sparkle";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-28 text-center">
      <Sparkle size={28} className="text-gold animate-twinkle mx-auto" />
      <h1 className="mt-6 font-display text-6xl lg:text-8xl text-taupe-700 leading-none">
        404
      </h1>
      <p className="mt-6 font-display text-2xl text-taupe-700 italic">
        ไม่พบหน้าที่คุณกำลังมองหา
      </p>
      <p className="mt-3 text-taupe-600">
        ลองกลับไปที่หน้าแรก หรือสำรวจบทความรีวิวของ Minimayy ดูนะคะ
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-taupe-700 text-cream-100 px-6 py-3 text-[11px] uppercase tracking-luxe rounded-full hover:bg-gold transition-colors"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 border border-taupe-700 text-taupe-700 px-6 py-3 text-[11px] uppercase tracking-luxe rounded-full hover:bg-taupe-700 hover:text-cream-100 transition-colors"
        >
          All Reviews
        </Link>
      </div>
    </section>
  );
}
