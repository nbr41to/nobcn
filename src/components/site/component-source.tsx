"use client";

import { useId, useState } from "react";
import { CodeBlock } from "./code-block";

export interface ComponentSourceFile {
  path: string;
  target: string;
  code: string;
}

export function ComponentSource({ files }: { files: ComponentSourceFile[] }) {
  const id = useId();
  const [selectedPath, setSelectedPath] = useState(files[0].path);
  const file = files.find((entry) => entry.path === selectedPath) ?? files[0];

  return (
    <div className="mt-4 min-w-0">
      <p className="text-xs leading-7 text-muted-foreground">
        Registryで配布する実装です。依存するUI部品もファイルを切り替えて確認できます。
      </p>
      <div className="mt-4 flex min-w-0 flex-col gap-2">
        <label htmlFor={id} className="text-xs font-medium">
          ソースファイル（{files.length}）
        </label>
        <select
          id={id}
          value={file.path}
          onChange={(event) => setSelectedPath(event.target.value)}
          className="w-full min-w-0 rounded-md border bg-card px-3 py-2 font-mono text-xs"
        >
          {files.map((entry, index) => (
            <option key={entry.path} value={entry.path}>
              {entry.path}
              {index === 0 ? "（本体）" : ""}
            </option>
          ))}
        </select>
        <p className="break-all text-[11px] leading-6 text-muted-foreground">
          インストール先：<code>{file.target}</code>
        </p>
      </div>
      <CodeBlock
        key={file.path}
        label={file.path.split("/").pop()}
        code={file.code}
        scrollable
      />
    </div>
  );
}
