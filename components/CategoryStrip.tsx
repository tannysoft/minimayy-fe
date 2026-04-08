import Link from "next/link";
import { getCategories } from "@/lib/wp";
import Sparkle from "./Sparkle";

export default async function CategoryStrip() {
  const cats = await getCategories();
  const visible = cats.filter((c) => c.count > 0).slice(0, 10);

  return (
    <section className="border-y border-sand-300/40 bg-cream-200/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-6 flex items-center gap-6 overflow-x-auto no-scrollbar">
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-luxe text-taupe-600 flex-shrink-0">
          <Sparkle size={10} className="text-gold" />
          Categories
        </span>
        <ul className="flex items-center gap-1 sm:gap-2">
          {visible.map((c) => (
            <li key={c.id} className="flex-shrink-0">
              <Link
                href={`/category/${c.slug}`}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-taupe-700 px-4 py-2 rounded-full hover:bg-cream-100 hover:text-gold transition-colors whitespace-nowrap"
              >
                {c.name}
                <span className="text-[10px] text-sand-500">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
