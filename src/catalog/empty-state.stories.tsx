import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { EmptyState } from "@/registry/components/empty-state";
import { EmptyStateDemo } from "./demos";

const meta = {
  title: "Components/Empty State",
  component: EmptyState,
  args: {
    title: "まだプロジェクトがありません",
    description: "最初のアイデアを、ここから。",
  },
  parameters: {
    docs: {
      description: {
        component:
          "データがない理由と、次にできることを示します。親コンテナが32rem以上になると横並び、それ未満では縦並びになります。",
      },
    },
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Narrow: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      getComputedStyle(canvasElement.querySelector(".flex") ?? canvasElement)
        .flexDirection,
    ).toBe("column");
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};
export const Wide: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      getComputedStyle(canvasElement.querySelector(".flex") ?? canvasElement)
        .flexDirection,
    ).toBe("row");
  },
  decorators: [
    (Story) => (
      <div style={{ width: 720, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};
export const CreateAndUndo: Story = {
  render: () => <EmptyStateDemo />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "作成する" }));
    await expect(canvas.getByText("最初のプロジェクト")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "元に戻す" }));
    await expect(
      canvas.getByText("まだプロジェクトがありません"),
    ).toBeVisible();
  },
};
