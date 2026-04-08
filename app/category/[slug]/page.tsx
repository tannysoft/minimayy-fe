import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import CategoryStrip from "@/components/CategoryStrip";
import Sparkle from "@/components/Sparkle";
import {
  getCategoryBySlug,
  getPosts,
  stripHtml,
} from "@/lib/wp";
import type { Metadata } from "next";

export const revalidate = 600;

type Params = { slug: string };
type SearchParams = { page?: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category" };
  return {
    title: `${cat.name} Reviews`,
    description:
      stripHtml(cat.description, 180) ||
      `รีวิว ${cat.name} จาก Minimayy Blog — สกินแคร์ บิวตี้ และการดูแลผิว`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const { data: posts, totalPages } = await getPosts({
    page,
    perPage: 12,
    categories: cat.id,
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-sand-300/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 lg:py-28 text-center">
          <p className="text-[11px] uppercase tracking-luxe text-gold mb-6 flex items-center justify-center gap-3">
            <Sparkle size={10} />
            Category
            <Sparkle size={10} />
          </p>
          <h1 className="font-display text-5xl lg:text-7xl text-taupe-700 leading-[1]">
            <span className="italic">{cat.name}</span>
          </h1>
          {cat.description && (
            <p className="mt-6 max-w-xl mx-auto text-taupe-600">
              {stripHtml(cat.description, 200)}
            </p>
          )}
          <p className="mt-6 text-[11px] uppercase tracking-luxe text-taupe-600">
            {cat.count} Reviews
          </p>
        </div>
      </section>

      <CategoryStrip />

      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-20">
        {posts.length === 0 ? (
          <p className="text-center text-taupe-600">
            ไม่มีบทความในหมวดนี้
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostCard key={p.id} post={p} priority={i < 3} />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          baseHref={`/category/${slug}`}
        />
      </section>
    </>
  );
}
