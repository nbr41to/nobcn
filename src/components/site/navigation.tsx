"use client";
import { cn } from "cn";
import {
  ArrowUpRight,
  BookOpen,
  Box,
  FlaskConical,
  Palette,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/catalog/components";

const guides = [
  { href: "/docs", label: "はじめに", icon: BookOpen },
  { href: "/docs/installation", label: "インストール", icon: Box },
  { href: "/themes", label: "テーマ", icon: Palette },
  { href: "/docs/container-queries", label: "コンテナクエリ", icon: Sparkles },
];
export function Navigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const linkClass = (active: boolean) =>
    cn(
      "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[13px] transition-colors",
      active
        ? "bg-accent font-medium text-accent-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );
  return (
    <nav
      aria-label={
        mobile ? "モバイルナビゲーション" : "ドキュメントナビゲーション"
      }
      className="space-y-7"
    >
      <div>
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
          GET STARTED
        </p>
        <div className="space-y-1">
          {guides.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(pathname === href)}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon className="size-3.5" />
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Link
          href="/components"
          className="mb-3 flex items-center justify-between px-3 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground"
        >
          COMPONENTS
          <span className="font-mono">
            {components.length.toString().padStart(2, "0")}
          </span>
        </Link>
        <div className="space-y-0.5">
          {components.map((component) => (
            <Link
              href={`/components/${component.slug}`}
              key={component.slug}
              className={linkClass(
                pathname === `/components/${component.slug}`,
              )}
              aria-current={
                pathname === `/components/${component.slug}`
                  ? "page"
                  : undefined
              }
            >
              <span>{component.name}</span>
              {component.cq && (
                <span
                  className="ml-auto size-1 rounded-full bg-primary/50"
                  title="コンテナクエリ対応"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
          WORKBENCH
        </p>
        <Link href="/lab" className={linkClass(pathname === "/lab")}>
          <FlaskConical className="size-3.5" />
          実験室
          <span className="ml-auto rounded border px-1 font-mono text-[9px]">
            LAB
          </span>
        </Link>
        <Link
          href="/docs/contributing"
          className={linkClass(pathname === "/docs/contributing")}
        >
          <BookOpen className="size-3.5" />
          開発ノート
        </Link>
        <a
          href={
            process.env.NEXT_PUBLIC_STORYBOOK_URL || "http://localhost:6010"
          }
          className={linkClass(false)}
          target="_blank"
          rel="noreferrer"
        >
          Storybook
          <ArrowUpRight className="ml-auto size-3.5" />
        </a>
      </div>
      {!mobile && (
        <div className="mx-3 rounded-lg border bg-card p-3.5">
          <p className="text-xs font-medium">小さく作って、育てていく。</p>
          <p className="mt-1 text-[11px] leading-6 text-muted-foreground">
            使いながら磨く、
            <br />
            自分のためのUIコレクション。
          </p>
          <span className="mt-3 block font-mono text-[10px] text-muted-foreground">
            nobcn / v0.1
          </span>
        </div>
      )}
    </nav>
  );
}
export function TopNavigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="メインナビゲーション"
      className="hidden items-center gap-7 text-xs md:flex"
    >
      {[
        { href: "/components", label: "Components" },
        { href: "/docs", label: "Docs" },
        { href: "/lab", label: "Lab" },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground",
            pathname.startsWith(item.href) ||
              (pathname === "/" && item.href === "/components")
              ? "font-semibold text-foreground"
              : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
export function MobileNavigation() {
  const pathname = usePathname();
  return (
    <details
      key={pathname}
      className="group border-b bg-background px-5 py-3 lg:hidden"
    >
      <summary className="text-xs font-medium">ドキュメントメニュー</summary>
      <div className="max-h-[65vh] overflow-y-auto py-5">
        <Navigation mobile />
      </div>
    </details>
  );
}
