import { cn } from "cn";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "@container/empty w-full rounded-xl border border-dashed bg-card",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 p-6 text-center @lg/empty:flex-row @lg/empty:p-8 @lg/empty:text-left">
        <div
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted text-muted-foreground"
        >
          {icon ?? <Inbox className="size-5" />}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-7">{title}</p>
          {description && (
            <p className="text-xs leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
