import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComponentSources } from "@/catalog/component-source";
import { components } from "@/catalog/components";
import {
  ComponentPlayground,
  InstallCommand,
} from "@/components/site/component-playground";

export function generateStaticParams() {
  return components.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      components.find((item) => item.slug === slug)?.name ?? "コンポーネント",
  };
}
export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = components.find((component) => component.slug === slug);
  if (!item) notFound();
  const sources = await getComponentSources(slug);
  const next = components[(components.indexOf(item) + 1) % components.length];
  const storybook =
    process.env.NEXT_PUBLIC_STORYBOOK_URL || "http://localhost:6010";
  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1">
        <Link
          href="/components"
          className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground"
        >
          <ArrowLeft className="size-3" />
          コンポーネント一覧
        </Link>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="rounded border px-2 py-0.5">{item.category}</span>
          {item.cq && (
            <span className="rounded bg-accent px-2 py-0.5 text-accent-foreground">
              Container ready
            </span>
          )}
        </div>
        <h1 className="brand-wordmark mt-4 text-[44px] leading-tight">
          {item.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {item.label} — {item.description}
        </p>
        <p className="mt-6 max-w-2xl text-sm leading-8 text-muted-foreground">
          {item.detail}
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <a
            href={`${storybook}/?path=/docs/${item.story}--docs`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1"
          >
            Storybookで開く
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href={`/r/${slug}.json`}
            className="inline-flex items-center gap-1"
          >
            Registry JSON
            <ArrowUpRight className="size-3" />
          </a>
        </div>
        <section id="preview" aria-label="プレビュー">
          <ComponentPlayground
            key={slug}
            name={slug}
            code={item.code}
            sources={sources}
          />
        </section>
        <section id="installation" className="mt-12">
          <h2 className="text-lg font-semibold">インストール</h2>
          <p className="mt-3 text-xs leading-7 text-muted-foreground">
            Base
            UI版のshadcn/uiを設定したプロジェクトで実行します。必要なプリミティブも一緒に追加されます。
          </p>
          <InstallCommand name={slug} />
          <Link
            href="/docs/installation"
            className="text-xs text-primary underline underline-offset-4"
          >
            初期設定とテーマの導入方法
          </Link>
        </section>
        <section id="api" className="mt-12">
          <h2 className="mb-5 text-lg font-semibold">Props</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted">
                <tr>
                  {["Prop", "型", "初期値", "説明"].map((label) => (
                    <th
                      key={label}
                      className="whitespace-nowrap px-4 py-3 font-medium"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.props.map((prop) => (
                  <tr key={prop[0]} className="border-t">
                    {prop.map((value, index) => (
                      <td
                        key={["prop", "type", "default", "description"][index]}
                        className={`px-4 py-4 ${index < 2 ? "font-mono text-[11px]" : "text-muted-foreground"}`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section id="guidelines" className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">使うときのポイント</h2>
          <ul className="space-y-3">
            {item.notes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-sm leading-7 text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-3 size-1 shrink-0 rounded-full bg-primary"
                />
                {note}
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-12 border-t pt-6">
          <Link
            href={`/components/${next.slug}`}
            className="ml-auto flex w-fit items-center gap-4"
          >
            <span className="text-right">
              <span className="block text-[10px] text-muted-foreground">
                次のコンポーネント
              </span>
              <span className="text-sm font-medium">{next.name}</span>
            </span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </article>
      <aside className="hidden w-36 shrink-0 xl:block">
        <nav
          aria-label="ページ内目次"
          className="sticky top-28 space-y-3 text-xs text-muted-foreground"
        >
          <p className="mb-5 text-[10px] font-semibold tracking-wider">
            ON THIS PAGE
          </p>
          {[
            ["preview", "プレビュー"],
            ["installation", "インストール"],
            ["api", "Props"],
            ["guidelines", "使うときのポイント"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="block hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
