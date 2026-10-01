"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CodeBlock({
  code,
  label = "tsx",
}: {
  code: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  return (
    <div className="my-4 overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="font-mono text-[11px] text-muted-foreground">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span role="status" className="text-[10px] text-muted-foreground">
            {status}
          </span>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="コードをコピー"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(code);
                setStatus("コピーしました");
              } catch {
                setStatus("コピーできませんでした。コードを選択してください。");
              }
            }}
          >
            {status === "コピーしました" ? <Check /> : <Copy />}
          </Button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-7">
        <code>{code}</code>
      </pre>
    </div>
  );
}
