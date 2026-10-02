import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BadgeDemo, ButtonDemo, FormFieldDemo } from "./demos";

const meta = {
  title: "Foundations/Themes",
  parameters: {
    docs: {
      description: {
        component:
          "テーマと明暗の組み合わせ。同じ実装でコントラストと日本語の表示を確認します。",
      },
    },
  },
  render: () => (
    <div className="max-w-lg space-y-8">
      <FormFieldDemo />
      <ButtonDemo />
      <BadgeDemo />
    </div>
  ),
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const MatchaLight: Story = {
  globals: { palette: "matcha", mode: "light" },
};
export const MatchaDark: Story = {
  globals: { palette: "matcha", mode: "dark" },
};
export const SumiLight: Story = { globals: { palette: "sumi", mode: "light" } };
export const SumiDark: Story = { globals: { palette: "sumi", mode: "dark" } };
export const AiLight: Story = { globals: { palette: "ai", mode: "light" } };
export const AiDark: Story = { globals: { palette: "ai", mode: "dark" } };

export const NoblogLight: Story = {
  globals: { palette: "noblog", mode: "light" },
};
export const NoblogDark: Story = {
  globals: { palette: "noblog", mode: "dark" },
};
