import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Button } from "@/components/ui/button";
import { ButtonDemo } from "./demos";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "変更を保存" },
  parameters: {
    docs: {
      description: {
        component:
          "主操作・補助操作・取り消しを、視覚的な優先順位で整理します。Base UIのキーボード操作とフォーカス管理を利用します。",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline", children: "キャンセル" },
};
export const Disabled: Story = { args: { disabled: true } };
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(
        [
          "default",
          "secondary",
          "outline",
          "ghost",
          "destructive",
          "link",
        ] as const
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};
export const Interaction: Story = {
  render: () => <ButtonDemo />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "変更を保存" }));
    await expect(
      canvas.getByRole("button", { name: "保存しました" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "キャンセル" }));
    await expect(
      canvas.getByRole("button", { name: "変更を保存" }),
    ).toBeVisible();
  },
};
