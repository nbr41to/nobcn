import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "@/components/ui/card";
import { CardDemo } from "./demos";

const meta = {
  title: "Components/Card",
  component: Card,
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          "見出し・説明・本文・フッターを組み合わせるshadcn/uiのカードです。内部のコンテンツに応じて構造を選べます。",
      },
    },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <CardDemo /> };
export const JapaneseContent: Story = { render: () => <CardDemo /> };
