import Sparkle from "@/components/Sparkle";

export default function Loading() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="flex flex-col items-center gap-4 text-taupe-600">
        <Sparkle size={28} className="text-gold animate-twinkle" />
        <p className="text-[11px] uppercase tracking-luxe">Loading…</p>
      </div>
    </div>
  );
}
