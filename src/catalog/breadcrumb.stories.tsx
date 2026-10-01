import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Breadcrumb } from "@/registry/components/breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { label: "ホーム", href: "/" },
      { label: "コンポーネント", href: "/components" },
      { label: "パンくずリスト" },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          "URLを機械的に翻訳せず、日本語ラベルを明示するパンくずリスト。Next.jsのルーティングに依存せず利用できます。",
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CurrentPage: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("パンくずリスト")).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(canvas.getByRole("link", { name: "ホーム" })).toHaveAttribute(
      "href",
      "/",
    );
  },
};
