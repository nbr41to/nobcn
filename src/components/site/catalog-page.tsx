import {
  ArrowUpRight,
  Check,
  Command,
  MoveHorizontal,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { Catalog } from "./catalog";

export function CatalogPage() {
  return (
    <>
      <div className="catalog-hero mb-12">
        <p className="mb-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] hero-muted text-muted-foreground">
          <span className="size-1.5 rounded-full bg-brand" />A PERSONAL UI
          COLLECTION
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold leading-[1.65] tracking-tight sm:text-[38px]">
              日本語のための、
              <br />
              小さなUIライブラリ<span className="text-brand">。</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-8 hero-muted text-muted-foreground">
              いつもの開発に、ちょうどいい部品を。
              <br className="sm:hidden" />
              使って、試して、磨いていく。
              <br />
              shadcn/uiをベースにした、自分のためのコンポーネント集。
            </p>
          </div>
          <Link
            href="/docs/installation"
            className="mb-1 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground"
          >
            使いはじめる
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] hero-muted text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="size-3" />
            shadcn/ui + Base UI
          </span>
          <span className="flex items-center gap-1.5">
            <Palette className="size-3" />
            差し替えられるテーマ
          </span>
          <span className="flex items-center gap-1.5">
            <MoveHorizontal className="size-3" />
            Container queries
          </span>
          <span className="flex items-center gap-1.5">
            <Command className="size-3" />
            CLIで、手元に。
          </span>
        </div>
      </div>
      <Catalog />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-accent/35 p-6">
        <div>
          <p className="text-sm font-medium">UIの先にある、開発の引き出し。</p>
          <p className="mt-1 text-xs hero-muted text-muted-foreground">
            ライブラリの検証も、ちょっとした工夫も。実験室に残していきます。
          </p>
        </div>
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-xs font-medium text-primary"
        >
          実験室をのぞく
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </>
  );
}
