"use client";
import { useEffect, useState } from "react";
import { ComponentDemo } from "@/catalog/demos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";
import { ComponentSource, type ComponentSourceFile } from "./component-source";

export function ComponentPlayground({
  name,
  code,
  sources,
}: {
  name: string;
  code: string;
  sources: ComponentSourceFile[];
}) {
  const [tab, setTab] = useState("preview");
  const [width, setWidth] = useState("full");
  return (
    <Tabs value={tab} onValueChange={setTab} className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="preview">プレビュー</TabsTrigger>
          <TabsTrigger value="code">使用例</TabsTrigger>
          <TabsTrigger value="source">実装コード</TabsTrigger>
        </TabsList>
        {tab === "preview" && (
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            コンテナ幅
            <select
              aria-label="プレビューのコンテナ幅"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="rounded-md border bg-card px-2 py-1.5"
            >
              <option value="full">100%</option>
              <option value="640">640px</option>
              <option value="320">320px</option>
            </select>
          </label>
        )}
      </div>
      <TabsContent value="preview">
        <div className="preview-grid mt-2 flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border bg-muted/20 p-4 sm:p-8">
          <div
            data-testid="preview-container"
            style={{
              width: width === "full" ? "100%" : `${width}px`,
              maxWidth: "100%",
            }}
            className="flex items-center justify-center"
          >
            <ComponentDemo name={name} />
          </div>
        </div>
        <p className="mt-2 text-right text-[10px] text-muted-foreground">
          親コンテナの幅で、レイアウトを確認。
        </p>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} />
      </TabsContent>
      <TabsContent value="source">
        <ComponentSource files={sources} />
      </TabsContent>
    </Tabs>
  );
}
export function InstallCommand({ name }: { name: string }) {
  const [origin, setOrigin] = useState("http://localhost:3000");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return (
    <CodeBlock
      code={`bunx shadcn@latest add ${origin}/r/${name}.json`}
      label="ターミナル"
    />
  );
}
