import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { FormField } from "@/registry/components/form-field";

const meta = {
  title: "Components/Form Field",
  component: FormField,
  args: {
    label: "メールアドレス",
    type: "email",
    required: true,
    description: "確認メールをお送りします。",
    placeholder: "you@example.com",
  },
  parameters: {
    docs: {
      description: {
        component:
          "必須表示と入力例を備えた日本語フォームの最小単位。ラベルと補足、エラーを自動生成したIDで入力欄に関連付けます。",
      },
    },
  },
} satisfies Meta<typeof FormField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Invalid: Story = {
  args: {
    defaultValue: "example",
    error: "メールアドレスを正しい形式で入力してください。",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/メールアドレス/);
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "確認メールをお送りします。 メールアドレスを正しい形式で入力してください。",
    );
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const LongLabel: Story = {
  args: {
    label: "プロジェクトの担当者に連絡するためのメールアドレス",
    description:
      "ご入力いただいたメールアドレスは、プロジェクトの更新通知にのみ使用します。",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};
