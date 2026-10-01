"use client";
import { useState } from "react";
import { ContentSkeleton } from "@/registry/components/content-skeleton";
import { CodeBlock } from "./code-block";
export function SkeletonLab() {
  const [rows, setRows] = useState(3);
  const [width, setWidth] = useState(520);
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-8 rounded-t-xl border bg-card p-5">
        <label className="flex items-center gap-3 text-xs">
          行数{" "}
          <input
            aria-label="Skeletonの行数"
            type="range"
            min="1"
            max="6"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <output>{rows}</output>
        </label>
        <label className="flex items-center gap-3 text-xs">
          コンテナ幅{" "}
          <input
            aria-label="Skeletonの幅"
            type="range"
            min="240"
            max="720"
            step="20"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <output>{width}px</output>
        </label>
      </div>
      <div className="preview-grid flex min-h-64 items-center justify-center rounded-b-xl border border-t-0 p-5">
        <div style={{ width, maxWidth: "100%" }}>
          <ContentSkeleton rows={rows} />
        </div>
      </div>
      <CodeBlock code={`<ContentSkeleton rows={${rows}} />`} />
    </div>
  );
}
