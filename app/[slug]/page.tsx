import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Sparkle from "@/components/Sparkle";
import { Leaves } from "@/components/Ornament";
import {
  formatDate,
  getFeaturedImage,
  getPostBySlug,
  getPostTerms,
  getPosts,
  stripHtml,
} from "@/lib/wp";
import type { Metadata } from "next";

export const revalidate = 600;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  const title = stripHtml(post.title.rendered, 140);
  const description = stripHtml(post.excerpt.rendered, 180);
  const img = getFeaturedImage(post);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: img.src ? [{ url: img.src }] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const img = getFeaturedImage(post);
  const { categories, tags } = getPostTerms(post);
  const title = stripHtml(post.title.rendered, 200);

  const relatedCat = categories[0]?.slug;
  const { data: related } = relatedCat
    ? await getPosts({
        perPage: 3,
        categories: categories[0]?.id,
        exclude: post.id,
      })
    : { data: [] };

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden">
        <Leaves className="absolute -left-6 top-10 w-32 text-sand-400/40 pointer-events-none hidden md:block" />
        <div className="mx-auto max-w-4xl px-5 lg:px-10 pt-16 pb-14 text-center">
          <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-luxe text-taupe-600 mb-8">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold">
              Blog
            </Link>
            {categories[0] && (
              <>
                <span>/</span>
                <Link
                  href={`/category/${categories[0].slug}`}
                  className="hover:text-gold"
                >
                  {categories[0].name}
                </Link>
              </>
            )}
          </nav>

          {categories[0] && (
            <p className="mb-5 flex items-center justify-center gap-2">
              <Sparkle size={10} className="text-gold" />
              <Link
                href={`/category/${categories[0].slug}`}
                className="text-[11px] uppercase tracking-luxe text-gold hover:text-taupe-700 transition-colors"
              >
                {categories[0].name}
              </Link>
            </p>
          )}

          <h1
            className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-taupe-700 leading-[1.2] tracking-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] uppercase tracking-luxe text-taupe-600">
            <span>By Minimayy</span>
            <Sparkle size={8} className="text-gold" />
            <time>{formatDate(post.date)}</time>
          </div>
        </div>
      </header>

      {/* Featured image */}
      {img.src && (
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lift bg-cream-200">
            <Image
              src={img.src}
              alt={img.alt || title}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 lg:px-10 py-16">
        <div
          className="prose-editorial"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {tags.length > 0 && (
          <div className="mt-14 pt-8 border-t border-sand-300/40">
            <p className="text-[11px] uppercase tracking-luxe text-taupe-600 mb-4">
              Tags
            </p>
            <ul className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tag/${t.slug}`}
                    className="inline-block text-[11px] uppercase tracking-luxe text-taupe-700 border border-sand-400/60 rounded-full px-3.5 py-1.5 hover:bg-taupe-700 hover:text-cream-100 hover:border-taupe-700 transition-colors"
                  >
                    #{t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-taupe-700 border-b border-taupe-700 pb-1 hover:text-gold hover:border-gold transition-colors"
          >
            ← All Reviews
          </Link>
          <Link
            href="/about#contact"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-taupe-700 border border-taupe-700 px-5 py-2 rounded-full hover:bg-taupe-700 hover:text-cream-100 transition-colors"
          >
            Work with Me
            <Sparkle size={10} />
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-sand-300/40 bg-cream-200/50">
          <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20">
            <p className="text-[11px] uppercase tracking-luxe text-gold mb-3 flex items-center gap-2">
              <Sparkle size={10} /> You may also love
            </p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-taupe-700 mb-12">
              More from Minimayy
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
