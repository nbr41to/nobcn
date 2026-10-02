# nobcn

日本語のWebアプリに馴染むUIコンポーネントを育てる、Next.jsドキュメントサイト / shadcn Registry / Storybook。

## 開発

Node.js 24 / Bun 1.3.14。作業ディレクトリは `~/dev/nobcn`。

```sh
bun install
bun run registry:build
bun run dev           # http://localhost:3000
bun run storybook     # http://localhost:6010
```

Next.js 16.3.8 / React 19.3.0 / Tailwind CSS 4.3.3 / Base UI 1.8.0 / Storybook 10.6.1。
依存関係はbun.lockで固定します。

## 構成

- `src/components/ui`: shadcn CLIで生成したBase UIプリミティブ。独自部品はここに混ぜません。
- `src/registry/components`: 配布する独自部品。データ取得や業務ルールを持ちません。
- `src/catalog`: カタログ情報、Next.jsと共有するデモ、状態と操作を検証するStories。
- `src/components/site`: ドキュメントサイト専用UI。
- `registry.json`: 10コンポーネントと4テーマの配布定義。`bun run registry:build`で`public/r`へ出力。
- `src/styles/tokens.css`: shadcn/tweakcn互換の意味的CSS変数。noblog・抹茶・墨・藍、ライト・ダーク。
- `public/themes`: 利用側へ持ち帰るCSS。`bun run themes:build`でtokens.cssからCSSとRegistryのcssVarsを同期します。Registryビルド時にも自動実行します。

## CLI

利用側を `bunx shadcn@latest init --base base` で初期設定してから実行します。

```sh
bunx shadcn@latest add http://localhost:3000/r/form-field.json
bunx shadcn@latest add http://localhost:3000/r/theme-noblog.json
```

Rootのregistry.jsonを含む変更をGitHubへ公開後、直接追加できます。

```sh
bunx shadcn@latest add nbr41to/nobcn/form-field
```

Base UI版のプリミティブを含むため、既存のRadix UIプリミティブとファイル名が衝突する場合はCLIの差分を確認してください。テーマは独立アイテムで、コンポーネント追加時に利用側テーマを上書きしません。

## 検証と公開

```sh
bunx playwright install chromium
bun run lint
bun run typecheck
bun run test:stories
bun run build
bun run build-storybook
```

`build`はRegistryを先に生成します。Next.jsをホスティングすると`/r/{name}.json`で配布できます。
`storybook-static`を別途静的ホスティングし、`NEXT_PUBLIC_STORYBOOK_URL`を設定してください。未設定時のリンク先はlocalhost:6010です。
GitHub Actionsで同じ検証を行い、RegistryとStorybookをartifactとして保存します。自動デプロイは未設定です。

## 既存コードからの変更

- shadcnは`base-nova`へ移行。Radix依存を削除。
- BreadcrumbはURLの自動分解から`items`の明示指定へ変更。
- FileInputの旧名`UploadedFileList`は互換エイリアスを維持。
- 作業前からあった`src/stories`のサンプルは保持し、Storybookの対象を`src/catalog`に限定。
- Zod更新の比較・自動Skeleton生成は実験室の計画項目で、まだ実装していません。

## 参照

- [shadcn Registry](https://ui.shadcn.com/docs/registry)
- [Base UI](https://base-ui.com/react/overview/quick-start)
- [Tailwind container queries](https://tailwindcss.com/docs/responsive-design#container-queries)
- [Storybook Next.js + Vite](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite)
- [tweakcn](https://tweakcn.com/)

## noblogテーマ

参照: [nbr41to/noblog @ 4c4866b](https://github.com/nbr41to/noblog/tree/4c4866b455f07875cdca62fb2c107dd671074b1c)。
Orange-100の背景 / Orange-50の紙面 / Slate-800の文字 / Orange-500の装飾を引き継ぎ、操作色はコントラストを確保したOrange-700を採用しました。ダーク配色はnobcnで新しく設計しています。
Noto Sans JP、Baloo 2、Fira CodeはFontsource経由で自己ホストします。テーマのRegistry項目にも依存パッケージとCSS importを含めています。
