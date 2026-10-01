import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContentSkeleton } from "@/registry/components/content-skeleton";

const meta = {
  title: "Components/Content Skeleton",
  component: ContentSkeleton,
  args: { rows: 3 },
  parameters: {
    docs: {
      description: {
        component:
          "リストの読み込み中に使うプレースホルダー。視覚的な骨格とスクリーンリーダー向けの状態通知を用意します。",
      },
    },
  },
} satisfies Meta<typeof ContentSkeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const SingleRow: Story = { args: { rows: 1 } };
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};
