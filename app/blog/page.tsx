import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Sparkle from "@/components/Sparkle";
import { getPosts } from "@/lib/wp";
import CategoryStrip from "@/components/CategoryStrip";

export const revalidate = 600;

export const metadata = {
  title: "All Reviews",
  description:
    "รวมบทความรีวิวสกินแคร์ทั้งหมดจาก Minimayy Blog — คลีนเซอร์ มอยเจอไรเซอร์ เซรั่ม และวิธีดูแลผิว",
};

type SearchParams = { page?: string };

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const { data: posts, totalPages } = await getPosts({
    page,
    perPage: 12,
  });

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-sand-300/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 lg:py-28 text-center">
          <p className="text-[11px] uppercase tracking-luxe text-taupe-600 mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sand-400" />
            Journal
            <span className="h-px w-10 bg-sand-400" />
          </p>
          <h1 className="font-display text-5xl lg:text-7xl text-taupe-700 leading-[1]">
            All <span className="italic text-gold">Reviews</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-taupe-600">
            รวมบทความรีวิวสกินแคร์ บิวตี้ และวิธีดูแลผิวจาก Minimayy Blog
            ตั้งแต่ปี 2013
          </p>
        </div>
        <Sparkle
          size={22}
          className="absolute left-[15%] top-24 text-gold/60 animate-twinkle hidden md:block"
        />
        <Sparkle
          size={14}
          className="absolute right-[18%] bottom-16 text-gold/60 animate-twinkle hidden md:block"
        />
      </section>

      <CategoryStrip />

      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-20">
        {posts.length === 0 ? (
          <p className="text-center text-taupe-600">ไม่มีบทความในขณะนี้</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostCard key={p.id} post={p} priority={i < 3} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} baseHref="/blog" />
      </section>
    </>
  );
}
