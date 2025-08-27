import { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

const InputMultiFileListControlComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFiles, setInputFiles] = useState<FileList | null>(null);

  const selectedFileArray: File[] = useMemo(() => {
    return inputFiles ? [...Array.from(inputFiles)] : [];
  }, [inputFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!inputRef.current?.files) return;
    const newFileArray = [
      ...selectedFileArray,
      ...Array.from(e.target.files),
    ].filter(
      (file, index, self) =>
        self.findIndex((f) => f.name === file.name) === index, // 重複を削除
    );
    const dt = new DataTransfer();
    newFileArray.forEach((file) => {
      dt.items.add(file);
    });
    inputRef.current.files = dt.files; // input内のFileListを更新
    setInputFiles(dt.files); // Reactのstateを更新
  };

  const handleDelete = (index: number) => {
    if (!inputRef.current?.files) return;
    const dt = new DataTransfer();
    selectedFileArray.forEach((file, i) => {
      if (i !== index) {
        dt.items.add(file);
      }
    });
    inputRef.current.files = dt.files; // input内のFileListを更新
    setInputFiles(dt.files); // Reactのstateを更新
  };

  return (
    <div>
      <Input type="file" multiple onChange={handleChange} ref={inputRef} />
      <div className="w-fit space-y-3">
        {selectedFileArray.map((file, index) => (
          <div
            key={file.name}
            className="flex items-center justify-between gap-2"
          >
            <div>{file.name}</div>
            <button type="button" onClick={() => handleDelete(index)}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { InputMultiFileListControlComponent };
