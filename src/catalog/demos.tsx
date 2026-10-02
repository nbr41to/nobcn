"use client";

import { ArrowUpRight, Check, Plus } from "lucide-react";
import { useId, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/registry/components/breadcrumb";
import { ContentSkeleton } from "@/registry/components/content-skeleton";
import { EmptyState } from "@/registry/components/empty-state";
import { FileInput } from "@/registry/components/file-input";
import { FormField } from "@/registry/components/form-field";
import { ModeToggle } from "@/registry/components/mode-toggle";

export function ButtonDemo() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button className="h-10 px-4" onClick={() => setSaved(!saved)}>
        {saved ? <Check /> : <Plus />}
        {saved ? "保存しました" : "変更を保存"}
      </Button>
      <Button
        variant="outline"
        className="h-10 px-4"
        onClick={() => setSaved(false)}
      >
        キャンセル
      </Button>
      <span role="status" className="sr-only">
        {saved ? "変更を保存しました" : "編集できます"}
      </span>
    </div>
  );
}
export function InputDemo() {
  const id = useId();
  return (
    <div className="w-full max-w-xs space-y-2">
      <label htmlFor={id} className="text-xs font-medium">
        プロジェクト名
      </label>
      <Input id={id} placeholder="例：暮らしの手帖" className="h-10 bg-card" />
    </div>
  );
}
export function BadgeDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Badge>公開中</Badge>
      <Badge variant="secondary">下書き</Badge>
      <Badge variant="outline">確認待ち</Badge>
    </div>
  );
}
export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            WORKSPACE
          </span>
          <ArrowUpRight className="size-4 text-muted-foreground" />
        </div>
        <CardTitle>日々のアイデアを、ひとつに。</CardTitle>
        <CardDescription className="text-xs leading-6">
          チームの小さな気づきを育てる場所。
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">個人プロジェクト</span>
        <Badge variant="outline">進行中</Badge>
      </CardFooter>
    </Card>
  );
}
export function FormFieldDemo() {
  return (
    <div className="w-full max-w-sm">
      <FormField
        label="メールアドレス"
        type="email"
        required
        placeholder="you@example.com"
        description="確認メールをお送りします。"
      />
    </div>
  );
}
export function EmptyStateDemo() {
  const [created, setCreated] = useState(false);
  return (
    <div className="w-full">
      <EmptyState
        title={created ? "最初のプロジェクト" : "まだプロジェクトがありません"}
        description={
          created
            ? "プロジェクトを作成しました（プレビュー）。"
            : "最初のアイデアを、ここから。"
        }
        icon={created ? <Check className="size-5" /> : undefined}
        action={
          <Button
            className="h-10 px-4"
            variant={created ? "outline" : "default"}
            onClick={() => setCreated(!created)}
          >
            {created ? (
              "元に戻す"
            ) : (
              <>
                <Plus />
                作成する
              </>
            )}
          </Button>
        }
      />
      <p role="status" className="sr-only">
        {created ? "プロジェクトを作成しました" : "プロジェクトはありません"}
      </p>
    </div>
  );
}
export function FileInputDemo() {
  return (
    <div className="w-full max-w-lg">
      <FileInput />
    </div>
  );
}
export function SkeletonDemo() {
  return <ContentSkeleton rows={3} />;
}
export function BreadcrumbDemo() {
  return (
    <Breadcrumb
      items={[
        { label: "ホーム", href: "/" },
        { label: "コンポーネント", href: "/components" },
        { label: "パンくず" },
      ]}
    />
  );
}
export function ModeToggleDemo() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">お好みの明るさで。</span>
      <ModeToggle />
    </div>
  );
}

const demos = {
  button: ButtonDemo,
  input: InputDemo,
  badge: BadgeDemo,
  card: CardDemo,
  "form-field": FormFieldDemo,
  "empty-state": EmptyStateDemo,
  "file-input": FileInputDemo,
  "content-skeleton": SkeletonDemo,
  breadcrumb: BreadcrumbDemo,
  "mode-toggle": ModeToggleDemo,
};
export function ComponentDemo({ name }: { name: string }) {
  const Demo = demos[name as keyof typeof demos];
  return Demo ? <Demo /> : null;
}
