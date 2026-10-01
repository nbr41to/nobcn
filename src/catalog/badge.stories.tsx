import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "公開中" },
  parameters: {
    docs: {
      description: {
        component:
          "公開・下書き・確認中など、短い状態表示に使います。色に加えてテキストを持たせます。",
      },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Draft: Story = {
  args: { variant: "secondary", children: "下書き" },
};
export const Invalid: Story = {
  args: { variant: "destructive", children: "要確認" },
};
