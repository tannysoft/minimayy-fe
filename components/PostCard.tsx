import Image from "next/image";
import Link from "next/link";
import type { WPPost } from "@/lib/types";
import { formatDate, getFeaturedImage, getPostTerms, stripHtml } from "@/lib/wp";
import Sparkle from "./Sparkle";

type Props = {
  post: WPPost;
  variant?: "default" | "feature" | "list";
  priority?: boolean;
};

export default function PostCard({
  post,
  variant = "default",
  priority = false,
}: Props) {
  const img = getFeaturedImage(post);
  const { categories, tags } = getPostTerms(post);
  const title = stripHtml(post.title.rendered, 140);
  const excerpt = stripHtml(post.excerpt.rendered, 160);
  const href = `/${post.slug}`;
  const visibleTags = tags.slice(0, 3);

  if (variant === "feature") {
    return (
      <article className="group relative grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 relative aspect-[16/11] overflow-hidden rounded-2xl bg-cream-200 shadow-soft">
          {img.src ? (
            <Image
              src={img.src}
              alt={img.alt || title}
              fill
              priority={priority}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
          ) : (
            <Placeholder />
          )}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-cream-100/90 backdrop-blur text-[10px] uppercase tracking-luxe text-taupe-700 px-3 py-1.5 rounded-full">
              Featured
            </span>
          </div>
        </div>

        <div className="md:col-span-5">
          {categories[0] && (
            <p className="relative z-20 mb-3">
              <Link
                href={`/category/${categories[0].slug}`}
                className="text-[11px] uppercase tracking-luxe text-gold hover:text-taupe-700 transition-colors"
              >
                {categories[0].name}
              </Link>
            </p>
          )}
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-taupe-700 leading-[1.15] group-hover:text-gold transition-colors">
            {/* Title link stretches to cover the whole card via ::after */}
            <Link
              href={href}
              className="after:absolute after:inset-0 after:z-10 after:content-['']"
            >
              {title}
            </Link>
          </h2>
          <p className="font-article mt-4 text-base text-taupe-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          {visibleTags.length > 0 && (
            <ul className="relative z-20 mt-5 flex flex-wrap gap-1.5">
              {visibleTags.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tag/${t.slug}`}
                    className="inline-block text-[10px] uppercase tracking-luxe text-taupe-700 border border-sand-400/50 rounded-full px-3 py-1 hover:bg-taupe-700 hover:text-cream-100 hover:border-taupe-700 transition-colors"
                  >
                    #{t.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-taupe-600">
            <time>{formatDate(post.date)}</time>
            <Sparkle size={8} className="text-gold" />
            <span>Read Review</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="group relative flex gap-5 py-5 border-b border-sand-300/40 last:border-b-0">
        <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-cream-200">
          {img.src ? (
            <Image
              src={img.src}
              alt={img.alt || title}
              fill
              sizes="112px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Placeholder />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {categories[0] && (
            <p className="relative z-20 mb-1.5">
              <Link
                href={`/category/${categories[0].slug}`}
                className="text-[10px] uppercase tracking-luxe text-gold hover:text-taupe-700 transition-colors"
              >
                {categories[0].name}
              </Link>
            </p>
          )}
          <h3 className="font-display font-bold text-lg text-taupe-700 leading-snug line-clamp-2 group-hover:text-gold transition-colors">
            <Link
              href={href}
              className="after:absolute after:inset-0 after:z-10 after:content-['']"
            >
              {title}
            </Link>
          </h3>
          <time className="block mt-2 text-[11px] uppercase tracking-luxe text-taupe-600">
            {formatDate(post.date)}
          </time>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-soft">
        {img.src ? (
          <Image
            src={img.src}
            alt={img.alt || title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Placeholder />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-taupe-800/40 to-transparent" />
        {categories[0] && (
          <Link
            href={`/category/${categories[0].slug}`}
            className="absolute top-4 left-4 z-20 bg-cream-100/90 backdrop-blur text-[10px] uppercase tracking-luxe text-taupe-700 px-3 py-1.5 rounded-full hover:bg-taupe-700 hover:text-cream-100 transition-colors"
          >
            {categories[0].name}
          </Link>
        )}
      </div>
      <div className="pt-5">
        <h3 className="font-display font-bold text-2xl text-taupe-700 leading-tight line-clamp-2 group-hover:text-gold transition-colors">
          {/* Title link stretches to cover the whole card via ::after */}
          <Link
            href={href}
            className="after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {title}
          </Link>
        </h3>
        <p className="font-article mt-3 text-base text-taupe-600 leading-relaxed line-clamp-2">
          {excerpt}
        </p>
        {visibleTags.length > 0 && (
          <ul className="relative z-20 mt-4 flex flex-wrap gap-1.5">
            {visibleTags.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/tag/${t.slug}`}
                  className="inline-block text-[10px] uppercase tracking-luxe text-taupe-700 border border-sand-400/50 rounded-full px-3 py-1 hover:bg-taupe-700 hover:text-cream-100 hover:border-taupe-700 transition-colors"
                >
                  #{t.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <time className="block mt-4 text-[11px] uppercase tracking-luxe text-taupe-600">
          {formatDate(post.date)}
        </time>
      </div>
    </article>
  );
}

function Placeholder() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-cream-200 text-sand-400">
      <Sparkle size={36} />
    </div>
  );
}
