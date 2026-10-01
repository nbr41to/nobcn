import { ArrowUpRight, FlaskConical } from "lucide-react";
import Link from "next/link";
import { SkeletonLab } from "@/components/site/skeleton-lab";
export const metadata = { title: "実験室" };
export default function LabPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
        <FlaskConical className="size-3" />
        WORKBENCH / EXPERIMENTS
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        気になることを、試す場所。
      </h1>
      <p className="mt-5 text-sm leading-8 text-muted-foreground">
        新しいライブラリも、日々の小さな疑問も。
        <br />
        実験して、比べて、使える知識にしていきます。
      </p>
      <section className="mt-12">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Skeletonの形を試す</h2>
          <span className="rounded bg-accent px-2 py-0.5 text-[10px] text-accent-foreground">
            操作できます
          </span>
        </div>
        <p className="mt-3 text-xs leading-7 text-muted-foreground">
          行数と親の幅を変えて、レイアウトの変化を確認します。幅が24rem未満になるとアバター枠が隠れます。
        </p>
        <SkeletonLab />
        <Link
          href="/components/content-skeleton"
          className="inline-flex items-center gap-1 text-xs text-primary"
        >
          コンポーネントの仕様を見る
          <ArrowUpRight className="size-3" />
        </Link>
      </section>
      <section className="mt-12 border-t pt-8">
        <h2 className="text-lg font-semibold">次に試したいこと</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            [
              "Zodのアップデート検証",
              "同じ入力データで検証結果・エラー形式・型推論の変化を比較する。",
            ],
            [
              "Skeleton生成ツール",
              "実コンテンツから生成した骨格と、手書きの骨格を比較する。",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border bg-card p-5">
              <span className="rounded border px-2 py-0.5 text-[10px] text-muted-foreground">
                計画中・未実装
              </span>
              <h3 className="mt-3 text-sm font-medium">{title}</h3>
              <p className="mt-2 text-xs leading-7 text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
