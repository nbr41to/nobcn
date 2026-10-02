"use client";

import { FileText, Trash2, Upload } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export interface FileInputProps {
  label?: string;
  accept?: string;
  disabled?: boolean;
  name?: string;
  onFilesChange?: (files: File[]) => void;
}

function fileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

/** Local selection only. The caller owns upload, validation and persistence. */
export function FileInput({
  label = "ファイルを添付",
  accept,
  disabled,
  name,
  onFilesChange,
}: FileInputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  function update(next: File[]) {
    if (inputRef.current) {
      const transfer = new DataTransfer();
      for (const file of next) transfer.items.add(file);
      inputRef.current.files = transfer.files;
    }
    setFiles(next);
    onFilesChange?.(next);
  }
  return (
    <div className="@container/files w-full space-y-3">
      <div className="rounded-xl border border-dashed bg-card p-5">
        <label
          htmlFor={id}
          className="mb-3 flex items-center gap-2 text-sm font-medium"
        >
          <Upload aria-hidden="true" className="size-4 text-muted-foreground" />
          {label}
        </label>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          multiple
          accept={accept}
          disabled={disabled}
          aria-describedby={`${id}-help`}
          className="block w-full min-w-0 text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs file:font-medium file:text-secondary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-50"
          onChange={(event) => {
            const incoming = Array.from(event.target.files ?? []);
            update([
              ...new Map(
                [...files, ...incoming].map((file) => [fileKey(file), file]),
              ).values(),
            ]);
          }}
        />
        <p
          id={`${id}-help`}
          className="mt-3 text-xs leading-6 text-muted-foreground"
        >
          複数のファイルを選択できます。まだ送信されません。
        </p>
      </div>
      <p role="status" className="text-xs text-muted-foreground">
        {files.length === 0
          ? "ファイルは選択されていません"
          : `${files.length}件のファイルを選択中`}
      </p>
      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={fileKey(file)}
            className="flex min-w-0 items-center gap-2 rounded-lg border bg-card px-3 py-2"
          >
            <FileText
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground"
            />
            <span className="min-w-0 flex-1 break-all text-xs">
              {file.name}
            </span>
            <span className="hidden shrink-0 text-xs text-muted-foreground @sm/files:inline">
              {Math.max(1, Math.round(file.size / 1024))} KB
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              aria-label={`${file.name}を削除`}
              onClick={() =>
                update(files.filter((item) => fileKey(item) !== fileKey(file)))
              }
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** @deprecated Use FileInput. Kept for existing consumers. */
export const UploadedFileList = FileInput;
