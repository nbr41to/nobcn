"use client";
import { cn } from "cn";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { components } from "@/catalog/components";
import { ComponentDemo } from "@/catalog/demos";

const categories = [
  "すべて",
  "基本",
  "フォーム",
  "フィードバック",
  "ナビゲーション",
];
export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("すべて");
  const normalized = query.normalize("NFKC").trim().toLocaleLowerCase("ja");
  const filtered = components.filter(
    (item) =>
      (category === "すべて" || category === item.category) &&
      `${item.name} ${item.label} ${item.description}`
        .normalize("NFKC")
        .toLocaleLowerCase("ja")
        .includes(normalized),
  );
  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 border-b pb-5 xl:flex-row xl:items-center">
        <div className="flex flex-wrap gap-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-md px-3 py-2 text-xs transition-colors",
                category === item
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {item}
              {item === "すべて" && (
                <span className="ml-2 opacity-60">{components.length}</span>
              )}
            </button>
          ))}
        </div>
        <label className="flex h-10 items-center gap-2 rounded-lg border bg-card px-3">
          <Search className="size-3.5 text-muted-foreground" />
          <span className="sr-only">コンポーネントを検索</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="コンポーネントを検索…"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none"
          />
        </label>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <p role="status" className="text-xs text-muted-foreground">
          {filtered.length} components
        </p>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <SlidersHorizontal className="size-3" />
          プレビューを操作できます
        </span>
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-sm">一致するコンポーネントがありません</p>
          <button
            type="button"
            className="mt-3 text-xs text-primary underline underline-offset-4"
            onClick={() => {
              setQuery("");
              setCategory("すべて");
            }}
          >
            検索条件をリセット
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.slug}
              className="catalog-card group min-w-0 overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-sm"
            >
              <div className="preview-grid relative flex min-h-[228px] items-center justify-center border-b bg-muted/30 p-5">
                <span className="absolute left-4 top-3 font-mono text-[9px] text-muted-foreground/60">
                  {String(components.indexOf(item) + 1).padStart(2, "0")}
                </span>
                <div className="flex w-full items-center justify-center pt-3">
                  <ComponentDemo name={item.slug} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/components/${item.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold tracking-tight"
                  >
                    {item.name}
                    <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <span className="rounded border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-6 text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center gap-2 border-t pt-3 text-[9px] text-muted-foreground">
                  <span className="size-1 rounded-full bg-primary" />
                  Base UI
                  {item.cq && (
                    <>
                      <span className="mx-1 opacity-40">/</span>Container ready
                    </>
                  )}
                  <Link
                    href={`/components/${item.slug}`}
                    aria-label={`${item.name}のドキュメント`}
                    className="ml-auto flex items-center gap-1"
                  >
                    Docs
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
