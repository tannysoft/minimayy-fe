import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Sparkle from "@/components/Sparkle";
import { getPosts, getTagBySlug, stripHtml } from "@/lib/wp";
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
  const decoded = decodeURIComponent(slug);
  const tag = await getTagBySlug(decoded);
  if (!tag) return { title: "Tag" };
  return {
    title: `#${tag.name}`,
    description:
      stripHtml(tag.description, 180) ||
      `รีวิวที่แท็ก ${tag.name} จาก Minimayy Blog`,
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const decoded = decodeURIComponent(slug);

  const tag = await getTagBySlug(decoded);
  if (!tag) notFound();

  const { data: posts, totalPages } = await getPosts({
    page,
    perPage: 12,
    tags: tag.id,
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-sand-300/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 lg:py-28 text-center">
          <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-luxe text-taupe-600 mb-8">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/tags" className="hover:text-gold">
              Tags
            </Link>
          </nav>

          <p className="text-[11px] uppercase tracking-luxe text-gold mb-5 flex items-center justify-center gap-2">
            <Sparkle size={10} /> Tag
          </p>
          <h1 className="font-display text-5xl lg:text-7xl text-taupe-700 leading-[1] italic">
            #{tag.name}
          </h1>
          {tag.description && (
            <p className="mt-6 max-w-xl mx-auto text-taupe-600">
              {stripHtml(tag.description, 200)}
            </p>
          )}
          <p className="mt-6 text-[11px] uppercase tracking-luxe text-taupe-600">
            {tag.count} Reviews
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-20">
        {posts.length === 0 ? (
          <p className="text-center text-taupe-600">
            ไม่มีบทความในแท็กนี้
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
          baseHref={`/tag/${slug}`}
        />
      </section>
    </>
  );
}
