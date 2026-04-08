import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  baseHref: string; // e.g. "/blog" → ?page=N
};

export default function Pagination({ page, totalPages, baseHref }: Props) {
  if (totalPages <= 1) return null;

  const make = (p: number) =>
    p === 1 ? baseHref : `${baseHref}?page=${p}`;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  // Simple window of pages
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav
      className="mt-16 flex items-center justify-center gap-2 text-[11px] uppercase tracking-luxe text-taupe-700"
      aria-label="Pagination"
    >
      {prev ? (
        <Link
          href={make(prev)}
          className="px-4 py-2 border border-sand-400/60 rounded-full hover:bg-taupe-700 hover:text-cream-100 hover:border-taupe-700 transition-colors"
        >
          ← Prev
        </Link>
      ) : (
        <span className="px-4 py-2 border border-sand-300/40 rounded-full opacity-40">
          ← Prev
        </span>
      )}

      <div className="flex items-center gap-1">
        {start > 1 && (
          <>
            <PageLink href={make(1)} active={false}>
              1
            </PageLink>
            {start > 2 && <span className="px-2 text-taupe-600">…</span>}
          </>
        )}
        {pages.map((p) => (
          <PageLink key={p} href={make(p)} active={p === page}>
            {p}
          </PageLink>
        ))}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="px-2 text-taupe-600">…</span>
            )}
            <PageLink href={make(totalPages)} active={false}>
              {totalPages}
            </PageLink>
          </>
        )}
      </div>

      {next ? (
        <Link
          href={make(next)}
          className="px-4 py-2 border border-sand-400/60 rounded-full hover:bg-taupe-700 hover:text-cream-100 hover:border-taupe-700 transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 border border-sand-300/40 rounded-full opacity-40">
          Next →
        </span>
      )}
    </nav>
  );
}

function PageLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`w-9 h-9 grid place-items-center rounded-full transition-colors ${
        active
          ? "bg-taupe-700 text-cream-100"
          : "hover:bg-cream-200 text-taupe-700"
      }`}
    >
      {children}
    </Link>
  );
}
