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

**Next.js 15** アプリケーション：

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
- `src/components/` - カスタムコンポーネント
- `src/lib/` - ユーティリティ関数
- `src/hooks/` - カスタムフック

### shadcn/ui 設定

- **components.json**: shadcn/ui の設定ファイル
- **Style**: new-york スタイル、stone ベースカラー
- **Registry**: https://ui.shadcn.com/registry
- **パッケージ**: clsx, tailwind-merge, class-variance-authority, lucide-react

### 主要設定

- **TypeScript**: `@/*` パスマッピング（`./src/*`を指している）
- **Biome**: Next.js と React ドメインで設定、自動インポート整理
- **フォント**: `next/font/google` を使用した Geist Sans と Geist Mono
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
- フォント変数は root layout で定義、CSS で参照

### その他

- **Bun** を JavaScript ランタイムとして使用
- App Router 使用（Pages Router ではない）
- dev、build の両方で Turbopack 有効
- Biome が従来の ESLint/Prettier セットアップを代替
- すべてのスクリプト実行は `bun run` を使用
