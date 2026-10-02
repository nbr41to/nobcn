import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-20">
      <p className="font-mono text-xs text-muted-foreground">404</p>
      <h1 className="mt-4 text-2xl font-semibold">
        ページが見つかりませんでした
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        URLをご確認いただくか、一覧からお探しください。
      </p>
      <Link
        href="/components"
        className="mt-6 inline-block text-sm text-primary underline underline-offset-4"
      >
        コンポーネント一覧へ
      </Link>
    </div>
  );
}
