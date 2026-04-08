import type { WPCategory, WPPost, WPTag } from "./types";

const API =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://www.minimayy.com/wp-json/wp/v2";

// ISR: revalidate WordPress data every 10 minutes
const REVALIDATE = 600;

async function wpFetch<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<{ data: T; totalPages: number; total: number }> {
  const url = new URL(`${API}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`WP API ${res.status} ${res.statusText} @ ${url.pathname}`);
  }

  const totalPages = Number(res.headers.get("x-wp-totalpages") || "1");
  const total = Number(res.headers.get("x-wp-total") || "0");
  const data = (await res.json()) as T;
  return { data, totalPages, total };
}

export async function getPosts(opts: {
  page?: number;
  perPage?: number;
  categories?: number;
  tags?: number;
  search?: string;
  exclude?: number;
} = {}) {
  return wpFetch<WPPost[]>("/posts", {
    page: opts.page ?? 1,
    per_page: opts.perPage ?? 12,
    _embed: 1,
    categories: opts.categories,
    tags: opts.tags,
    search: opts.search,
    exclude: opts.exclude,
  });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const { data } = await wpFetch<WPPost[]>("/posts", {
    slug,
    _embed: 1,
  });
  return data[0] ?? null;
}

export async function getCategories(): Promise<WPCategory[]> {
  const { data } = await wpFetch<WPCategory[]>("/categories", {
    per_page: 100,
    orderby: "count",
    order: "desc",
    hide_empty: true,
  });
  return data;
}

export async function getCategoryBySlug(
  slug: string
): Promise<WPCategory | null> {
  const { data } = await wpFetch<WPCategory[]>("/categories", { slug });
  return data[0] ?? null;
}

export async function getTags(opts: {
  perPage?: number;
  page?: number;
} = {}): Promise<{ data: WPTag[]; totalPages: number; total: number }> {
  return wpFetch<WPTag[]>("/tags", {
    per_page: opts.perPage ?? 100,
    page: opts.page ?? 1,
    orderby: "count",
    order: "desc",
    hide_empty: true,
  });
}

export async function getTagBySlug(slug: string): Promise<WPTag | null> {
  const { data } = await wpFetch<WPTag[]>("/tags", { slug });
  return data[0] ?? null;
}

// Helpers for rendered data
export function getFeaturedImage(post: WPPost): {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
} {
  const m = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!m) return { src: null, alt: "" };
  const sizes = m.media_details?.sizes;
  const large =
    sizes?.large?.source_url ||
    sizes?.medium_large?.source_url ||
    m.source_url;
  return {
    src: large,
    alt: m.alt_text || "",
    width: m.media_details?.width,
    height: m.media_details?.height,
  };
}

export function getPostTerms(post: WPPost): {
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
} {
  const terms = post._embedded?.["wp:term"] ?? [];
  const flat = terms.flat();
  return {
    categories: flat
      .filter((t) => t.taxonomy === "category")
      .map(({ id, name, slug }) => ({ id, name, slug })),
    tags: flat
      .filter((t) => t.taxonomy === "post_tag")
      .map(({ id, name, slug }) => ({ id, name, slug })),
  };
}

export function stripHtml(html: string, max = 180): string {
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export function formatDate(iso: string, locale = "th-TH"): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
