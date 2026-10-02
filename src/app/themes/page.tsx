import { Download, Paintbrush } from "lucide-react";
import {
  BadgeDemo,
  ButtonDemo,
  CardDemo,
  FormFieldDemo,
} from "@/catalog/demos";
import { CodeBlock } from "@/components/site/code-block";
export const metadata = { title: "テーマ" };
export default function ThemesPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
        DESIGN TOKENS
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        同じ部品に、違う表情を。
      </h1>
      <p className="mt-5 text-sm leading-8 text-muted-foreground">
        画面右上のテーマと表示モードを切り替えて、色と角丸の変化を試してください。
        <br />
        アプリごとの個性はテーマに。コンポーネントの使い方は、そのままに。
      </p>
      <div className="preview-grid mt-8 grid items-center gap-8 rounded-xl border bg-muted/20 p-6 sm:grid-cols-2 sm:p-10">
        <CardDemo />
        <div className="space-y-7">
          <FormFieldDemo />
          <ButtonDemo />
          <BadgeDemo />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {[
          "background",
          "foreground",
          "primary",
          "secondary",
          "accent",
          "border",
        ].map((token) => (
          <div
            key={token}
            className="overflow-hidden rounded-lg border bg-card"
          >
            <div
              className="h-14 border-b"
              style={{ background: `var(--${token})` }}
            />
            <p className="p-2 text-center font-mono text-[9px] text-muted-foreground">
              {token}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-xl border bg-card p-6">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
          DESIGN REFERENCE
        </p>
        <h2 className="brand-wordmark mt-2 text-3xl">
          From noblog, with curiosity.
        </h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">
          noblogの淡いオレンジの紙面、濃いネイビーの文字、鮮やかな差し色を受け継ぎました。日本語はNoto
          Sans JP、英字の見出しはBaloo 2、コードはFira
          Code。影と角丸は控えめに、ドキュメントを読みやすく整えています。
        </p>
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px]">
          {["#ffedd5", "#fff7ed", "#1e293b", "#f97316"].map((color) => (
            <span
              key={color}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2"
            >
              <span
                className="size-3 rounded-sm border"
                style={{ background: color }}
              />
              {color}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-7 text-muted-foreground">
          オレンジのリンクは読みやすさのため #c2410c
          に調整。ダークモードは同じ色の役割を保って新しく設計しました。フォントは同梱し、外部のフォントサーバーには接続しません。
        </p>
        <a
          className="mt-4 inline-block text-xs text-primary underline underline-offset-4"
          href="https://github.com/nbr41to/noblog/tree/4c4866b455f07875cdca62fb2c107dd671074b1c"
          target="_blank"
          rel="noreferrer"
        >
          参照したnoblogのソース ↗
        </a>
      </section>
      <div className="docs-prose">
        <h2>テーマを持ち帰る</h2>
        <p>
          4つのCSSには、ライトとダークの両方のトークンが含まれます。既存のテーマ定義を置き換えるか、shadcn
          CLIでtheme-noblog / theme-matcha / theme-sumi / theme-aiを追加します。
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["noblog", "noblog", "オレンジの紙面と、ネイビーの文字。"],
          ["matcha", "抹茶", "落ち着きのある緑。"],
          ["sumi", "墨", "輪郭のはっきりした無彩色。"],
          ["ai", "藍", "すっきりとした青。"],
        ].map(([id, title, description]) => (
          <a
            key={id}
            href={`/themes/${id}.css`}
            download
            className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:bg-muted"
          >
            <Paintbrush className="size-4 text-muted-foreground" />
            <div>
              <span className="text-sm font-medium">{title}</span>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {description}
              </p>
            </div>
            <Download className="ml-auto size-3.5" />
          </a>
        ))}
      </div>
      <div className="docs-prose">
        <h2>tweakcnのテーマを使う</h2>
        <p>
          <a
            href="https://tweakcn.com/editor/theme"
            target="_blank"
            rel="noreferrer"
          >
            tweakcn
          </a>
          で作成したCSSの :root と .dark を、src/styles/tokens.css
          のトークン定義に置き換えます。このサイトのdata-palette付きプリセットも削除・更新してください。残すと、プリセット側の値が優先されます。
        </p>
        <h2>見た目と振る舞いを分ける</h2>
        <p>
          配布するコンポーネントではbg-primaryやtext-muted-foregroundなど意味を持つトークンを使います。固定のブランド色を埋め込まないことで、アプリごとのCSSだけで外観を変えられます。
        </p>
      </div>
      <CodeBlock
        label="CSS / トークンの例"
        code={
          ":root {\n  --primary: #c2410c;\n  --primary-foreground: #ffffff;\n  --radius: 0.5rem;\n}"
        }
      />
    </article>
  );
}
