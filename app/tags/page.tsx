import Link from "next/link";
import Sparkle from "@/components/Sparkle";
import { Leaves, Swirl } from "@/components/Ornament";
import { getTags } from "@/lib/wp";

export const revalidate = 600;

export const metadata = {
  title: "Tags",
  description:
    "รวมแท็กทั้งหมดของ Minimayy Blog — ส่วนผสม, ประเภทสกินแคร์, และคีย์เวิร์ดบิวตี้ที่น่าสนใจ",
};

export default async function TagsPage() {
  const { data: tags } = await getTags({ perPage: 100 });
  const top = tags.slice(0, 20);
  const maxCount = top[0]?.count ?? 1;

  // Weighted sizing for the cloud
  const sizeFor = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.75) return "text-4xl lg:text-5xl";
    if (ratio > 0.5) return "text-3xl lg:text-4xl";
    if (ratio > 0.3) return "text-2xl lg:text-3xl";
    if (ratio > 0.15) return "text-xl lg:text-2xl";
    return "text-lg lg:text-xl";
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-sand-300/40">
        <Leaves className="absolute -left-4 top-14 w-40 text-sand-400/40 pointer-events-none hidden md:block" />
        <Swirl className="absolute right-0 bottom-6 w-64 text-sand-400/40 pointer-events-none hidden lg:block" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 lg:py-28 text-center">
          <p className="text-[11px] uppercase tracking-luxe text-gold mb-6 flex items-center justify-center gap-3">
            <Sparkle size={10} /> Explore by
          </p>
          <h1 className="font-display text-5xl lg:text-7xl text-taupe-700 leading-[1]">
            All <span className="italic">Tags</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-taupe-600">
            ค้นหาบทความรีวิวด้วยแท็ก — ตั้งแต่ส่วนผสม
            ประเภทสกินแคร์ ไปจนถึงประเด็นผิวที่คุณสนใจ
          </p>
        </div>
      </section>

      {/* Featured cloud */}
      {top.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 lg:px-10 py-16">
          <p className="text-[11px] uppercase tracking-luxe text-taupe-600 mb-8 flex items-center gap-2">
            <Sparkle size={10} className="text-gold" /> Trending
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-4 items-baseline justify-center">
            {top.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/tag/${t.slug}`}
                  className={`font-display ${sizeFor(
                    t.count
                  )} text-taupe-700 hover:text-gold italic transition-colors`}
                >
                  #{t.name}
                  <sup className="ml-1 text-xs not-italic text-sand-500">
                    {t.count}
                  </sup>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Full list */}
      <section className="border-t border-sand-300/40 bg-cream-200/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16">
          <p className="text-[11px] uppercase tracking-luxe text-gold mb-6 flex items-center gap-2">
            <Sparkle size={10} /> All Tags
          </p>
          {tags.length === 0 ? (
            <p className="text-taupe-600 text-center">ไม่มีแท็กในขณะนี้</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tag/${t.slug}`}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-taupe-700 border border-sand-400/60 bg-cream-50 rounded-full px-4 py-2 hover:bg-taupe-700 hover:text-cream-100 hover:border-taupe-700 transition-colors"
                  >
                    {t.name}
                    <span className="text-[10px] text-sand-500 group-hover:text-cream-200">
                      {t.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
