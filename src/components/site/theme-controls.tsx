"use client";
import { useState } from "react";
import { ModeToggle } from "@/registry/components/mode-toggle";

export function ThemeControls({ initialPalette }: { initialPalette: string }) {
  const [palette, setPalette] = useState(initialPalette);
  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2 rounded-lg border bg-card px-2.5 py-1.5 text-xs">
        <span className="size-2.5 rounded-full bg-brand" aria-hidden="true" />
        <span className="sr-only">カラーテーマ</span>
        <select
          aria-label="カラーテーマ"
          value={palette}
          className="max-w-24 bg-transparent outline-none"
          onChange={(event) => {
            const value = event.target.value;
            setPalette(value);
            document.documentElement.dataset.palette = value;
            // biome-ignore lint/suspicious/noDocumentCookie: Synchronous cookie keeps the next server render in sync; supports browsers without Cookie Store.
            document.cookie = `nobcn-palette=${value}; path=/; max-age=31536000; SameSite=Lax`;
          }}
        >
          <option value="noblog">noblog</option>
          <option value="matcha">抹茶</option>
          <option value="sumi">墨</option>
          <option value="ai">藍</option>
        </select>
      </label>
      <ModeToggle />
    </div>
  );
}
