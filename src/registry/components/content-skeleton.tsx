import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";

export function ContentSkeleton({
  rows = 3,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  const count = Math.min(
    10,
    Math.max(1, Math.floor(Number.isFinite(rows) ? rows : 3)),
  );
  return (
    <div
      role="status"
      aria-label="コンテンツを読み込み中"
      className={cn(
        "@container/skeleton w-full space-y-4 rounded-xl border bg-card p-5",
        className,
      )}
    >
      <span className="sr-only">読み込み中です。しばらくお待ちください。</span>
      <div aria-hidden="true" className="space-y-5">
        {Array.from({ length: count }, (_, index) => (
          <div // biome-ignore lint/suspicious/noArrayIndexKey: Fixed decorative skeleton rows have no identity or state.
            key={`skeleton-${index}`}
            className="flex items-center gap-4"
          >
            <Skeleton className="hidden size-10 shrink-0 rounded-lg @sm/skeleton:block motion-reduce:animate-none" />
            <div className="flex-1 space-y-2.5">
              <Skeleton className="h-3 w-2/5 motion-reduce:animate-none" />
              <Skeleton className="h-2.5 w-4/5 motion-reduce:animate-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
