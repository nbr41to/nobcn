import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent } from "storybook/test";
import { FileInput } from "@/registry/components/file-input";

const meta = {
  title: "Components/File Input",
  component: FileInput,
  args: { name: "attachments" },
  parameters: {
    docs: {
      description: {
        component:
          "複数ファイルの追加・重複除外・個別削除に対応します。選択内容はネイティブinputと同期し、FormDataにも反映されます。アップロード処理は利用側が実装します。",
      },
    },
  },
} satisfies Meta<typeof FileInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };
export const SelectionAndRemoval: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("ファイルを添付") as HTMLInputElement;
    const file = new File(["hello"], "日本語の企画書.pdf", {
      type: "application/pdf",
      lastModified: 1,
    });
    const second = new File(["another"], "補足資料.pdf", {
      type: "application/pdf",
      lastModified: 2,
    });
    const selectFiles = (files: File[]) => {
      const transfer = new DataTransfer();
      for (const file of files) transfer.items.add(file);
      input.files = transfer.files;
      fireEvent.change(input);
    };
    selectFiles([file]);
    await expect(canvas.getByText("日本語の企画書.pdf")).toBeVisible();
    selectFiles([file, second]);
    await expect(input.files).toHaveLength(2);
    await userEvent.click(
      canvas.getByRole("button", { name: "日本語の企画書.pdfを削除" }),
    );
    await expect(input.files).toHaveLength(1);
    await expect(input.files?.[0].name).toBe("補足資料.pdf");
    await userEvent.click(
      canvas.getByRole("button", { name: "補足資料.pdfを削除" }),
    );
    await expect(input.files).toHaveLength(0);
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "ファイルは選択されていません",
    );
  },
};
