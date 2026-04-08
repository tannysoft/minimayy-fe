import Link from "next/link";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import CategoryStrip from "@/components/CategoryStrip";
import Sparkle from "@/components/Sparkle";
import { Arch } from "@/components/Ornament";
import { getPosts } from "@/lib/wp";

export const revalidate = 600;

export default async function HomePage() {
  const { data: posts } = await getPosts({ perPage: 13 });
  const [feature, ...rest] = posts;
  const primary = rest.slice(0, 6);
  const secondary = rest.slice(6, 12);

  return (
    <>
      <Hero />
      <CategoryStrip />

      {/* Featured */}
      {feature && (
        <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 lg:pt-28">
          <SectionHeading
            eyebrow="Editor's Pick"
            title="Featured Review"
            subtitle="รีวิวล่าสุดที่คัดมาแล้ว"
          />
          <div className="mt-14">
            <PostCard post={feature} variant="feature" priority />
          </div>
        </section>
      )}

      {/* Latest grid */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-24 lg:pt-32">
        <SectionHeading
          eyebrow="Fresh from the Vanity"
          title="Latest Reviews"
          subtitle="รวมบทความสกินแคร์และบิวตี้อัปเดตใหม่ทุกสัปดาห์"
        />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      {/* Secondary list with ornament */}
      {secondary.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-28">
          <div className="relative grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 relative">
              <Arch className="absolute -top-6 -left-4 w-48 text-sand-400/50 pointer-events-none hidden lg:block" />
              <div className="relative">
                <p className="text-[11px] uppercase tracking-luxe text-gold mb-4 flex items-center gap-2">
                  <Sparkle size={10} /> More to Read
                </p>
                <h2 className="font-display text-4xl lg:text-5xl text-taupe-700 leading-tight">
                  Continue your <br />
                  <span className="italic">beauty edit</span>
                </h2>
                <p className="mt-6 text-sm text-taupe-600 leading-relaxed max-w-sm">
                  บทความเพิ่มเติมสำหรับคนที่อยากดูแลผิวอย่างลึกซึ้ง —
                  ตั้งแต่ส่วนผสม ไปจนถึงรูทีนประจำวัน
                </p>
                <Link
                  href="/blog"
                  className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-taupe-700 border-b border-taupe-700 pb-1 hover:text-gold hover:border-gold transition-colors"
                >
                  View All Reviews →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-x-10">
                {secondary.map((p) => (
                  <PostCard key={p.id} post={p} variant="list" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 lg:px-10 py-24 text-center">
        <Sparkle size={22} className="text-gold animate-twinkle mx-auto" />
        <h2 className="mt-5 font-display text-4xl lg:text-5xl text-taupe-700 leading-tight">
          Let&apos;s get{" "}
          <span className="italic">collaboration</span> familiar
        </h2>
        <p className="mt-5 text-taupe-600 max-w-xl mx-auto">
          สนใจร่วมงานกับ Minimayy Blog? เรารีวิวผลิตภัณฑ์อย่างจริงใจ
          ให้ข้อมูลส่วนผสมและการใช้งานที่เป็นประโยชน์กับผู้อ่าน
        </p>
        <Link
          href="/about#contact"
          className="mt-8 inline-flex items-center gap-2 bg-taupe-700 text-cream-100 px-8 py-4 text-[11px] uppercase tracking-luxe rounded-full hover:bg-gold transition-colors"
        >
          Collaborate with Us
          <Sparkle size={12} />
        </Link>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-luxe text-gold mb-3 flex items-center gap-2">
          <Sparkle size={10} /> {eyebrow}
        </p>
        <h2 className="font-display text-4xl lg:text-5xl text-taupe-700 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm text-taupe-600 max-w-md">{subtitle}</p>
        )}
      </div>
      <div className="hidden sm:block h-px flex-1 bg-sand-400/40 ml-10 mb-4" />
    </div>
  );
}
