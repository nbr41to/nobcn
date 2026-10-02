import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";
import { ModeToggle } from "@/registry/components/mode-toggle";

const meta = {
  title: "Components/Mode Toggle",
  component: ModeToggle,
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          "ライト・ダーク・システムを選べるメニュー。next-themesが選択を保持し、システムの変更にも追従します。",
      },
    },
  },
} satisfies Meta<typeof ModeToggle>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Keyboard: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    canvas.getByRole("button", { name: "表示モードを変更" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.getByRole("menuitemradio", { name: "ダーク" })).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "表示モードを変更" }),
      ).toHaveFocus(),
    );
  },
};
