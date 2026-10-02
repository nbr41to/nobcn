import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Components/Input",
  component: Input,
  args: { "aria-label": "プロジェクト名", placeholder: "例：暮らしの手帖" },
  parameters: {
    docs: {
      description: {
        component:
          "Base UIのInputを使う最小の入力プリミティブです。日本語の入力例、補足文、エラーまで必要な場合はForm Fieldを使います。",
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, value: "編集できません" },
};
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "確認してください" },
};
export const JapaneseInput: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox");
    await userEvent.type(input, "暮らしの手帖");
    await expect(input).toHaveValue("暮らしの手帖");
  },
};
