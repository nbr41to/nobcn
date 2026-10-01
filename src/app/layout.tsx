import { Github } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  MobileNavigation,
  Navigation,
  TopNavigation,
} from "@/components/site/navigation";
import { ThemeControls } from "@/components/site/theme-controls";
import { ModeProvider } from "@/registry/components/mode-toggle";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "nobcn — 日本語のための、小さなUIライブラリ。",
    template: "%s | nobcn",
  },
  description:
    "shadcn/uiとBase UIを土台に、日本語のインターフェースを育てる。テーマを差し替えられるコンポーネントと、フロントエンドの開発ノート。",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storedPalette = (await cookies()).get("nobcn-palette")?.value;
  const palette =
    storedPalette && ["noblog", "matcha", "sumi", "ai"].includes(storedPalette)
      ? storedPalette
      : "noblog";
  return (
    <html lang="ja" data-palette={palette} suppressHydrationWarning>
      <body>
        <ModeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only z-50 rounded bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            本文へスキップ
          </a>
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
            <div className="mx-auto flex h-[72px] max-w-[1536px] items-center gap-10 px-5 lg:px-9">
              <Link
                href="/"
                aria-label="nobcn ホーム"
                className="flex items-center gap-2.5"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-foreground font-mono text-xl font-semibold text-background">
                  n<span className="text-brand">.</span>
                </span>
                <span className="brand-wordmark text-[28px] leading-none">
                  nobcn
                </span>
                <span className="ml-1 hidden rounded border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground sm:inline">
                  UI COLLECTION
                </span>
              </Link>
              <TopNavigation />
              <div className="ml-auto flex items-center gap-3">
                <ThemeControls initialPalette={palette} />
                <span className="hidden h-5 border-l sm:block" />
                <a
                  href="https://github.com/nbr41to/nobcn"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHubリポジトリ"
                  className="hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground sm:block"
                >
                  <Github className="size-4" />
                </a>
              </div>
            </div>
          </header>
          <MobileNavigation />
          <div className="mx-auto flex max-w-[1536px]">
            <aside className="sticky top-[73px] hidden h-[calc(100dvh-73px)] w-60 shrink-0 overflow-y-auto border-r px-6 py-9 lg:block">
              <Navigation />
            </aside>
            <div className="min-w-0 flex-1">
              <main
                id="main"
                className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-12 lg:py-12"
              >
                {children}
              </main>
              <footer className="mx-5 mt-10 flex flex-wrap items-center justify-between gap-3 border-t py-6 text-[11px] text-muted-foreground sm:mx-8 lg:mx-12">
                <span>丁寧なUIを、少しずつ。</span>
                <span className="font-mono">
                  Built with shadcn/ui & Base UI <span className="mx-2">·</span>{" "}
                  nobcn
                </span>
              </footer>
            </div>
          </div>
        </ModeProvider>
      </body>
    </html>
  );
}
