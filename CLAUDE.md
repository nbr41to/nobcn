# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## 概要

このプロダクトは shadcn/ui の registry という機能を用いて、ここで開発された、components や utils、あるいはデザインシステムを他でも再利用できる仕組みを提供します。

shadcn/ui の registry に関しては以下を確認してください。

https://ui.shadcn.com/docs/registry

## 開発コマンド

### アプリケーション実行

- `bun run dev` - Bun ランタイム + Turbopack を使用した開発サーバー起動
- `bun run build` - Bun ランタイム + Turbopack を使用した本番用ビルド
- `bun run start` - Bun ランタイムを使用した本番用サーバー起動

### コード品質

- `bun run lint` - Bun ランタイム + Biome linter とチェッカー実行
- `bun run format` - Bun ランタイム + Biome を使用したコードフォーマット

## 技術スタック

**Next.js 16** アプリケーション：

- **Bun** JavaScript ランタイム
- **React 19** with TypeScript
- **Tailwind CSS 4** スタイリング
- **shadcn/ui** UI コンポーネントライブラリ
- **Biome** リンターとフォーマッター（ESLint/Prettier の代替）
- **Turbopack** 高速バンドリング

## アーキテクチャ

### プロジェクト構造

- `src/app/` - Next.js App Router ディレクトリ
- `src/components/ui/` - shadcn/ui コンポーネント
- `src/registry/components/` - 配布するカスタムコンポーネント
- `src/catalog/` - カタログ、共通デモ、Storybook
- `src/components/site/` - サイト専用UI
- `src/lib/` - ユーティリティ関数
- `src/hooks/` - カスタムフック

### shadcn/ui 設定

- **components.json**: shadcn/ui の設定ファイル
- **Style**: base-nova（Base UI版）、noblogを標準テーマに使用
- **Registry**: https://ui.shadcn.com/registry
- **パッケージ**: clsx, tailwind-merge, class-variance-authority, lucide-react

### 主要設定

- **TypeScript**: `@/*` パスマッピング（`./src/*`を指している）
- **Biome**: Next.js と React ドメインで設定、自動インポート整理
- **フォント**: Fontsourceで自己ホストするNoto Sans JP / Baloo 2 / Fira Code
- **スタイリング**: CSS 変数によるテーマ設定、自動ダークモード対応

## 開発ノート

### shadcn/ui コンポーネント

- `npx shadcn@latest add [component]` でコンポーネント追加
- components.json でカスタマイズ可能
- registry 機能により再利用可能なコンポーネント作成

### スタイリングアプローチ

- Tailwind ユーティリティクラス中心
- CSS 変数によるテーマカラー（`--background`, `--foreground`）
- `prefers-color-scheme` による自動ダークモード
- フォントと配色は src/styles/tokens.css に定義。Registryビルドで配布用CSSとcssVarsを同期

### その他

- **Bun** を JavaScript ランタイムとして使用
- App Router 使用（Pages Router ではない）
- dev、build の両方で Turbopack 有効。buildはRegistryを先に生成
- `bun run storybook` は http://localhost:6010 で起動
- `bun run test:stories` でChromium上の操作とアクセシビリティを検証
- Biome が従来の ESLint/Prettier セットアップを代替
- すべてのスクリプト実行は `bun run` を使用

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
