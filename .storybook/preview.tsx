import type { Preview } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import { ModeProvider } from "../src/registry/components/mode-toggle";
import "../src/styles/globals.css";

function ThemeFrame({
  palette,
  mode,
  children,
}: {
  palette: string;
  mode: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    document.documentElement.lang = "ja";
  }, [palette]);
  return (
    <ModeProvider
      attribute="class"
      forcedTheme={mode}
      enableSystem={false}
      // Storybook mounts on the client; next-themes bootstrap is only needed during SSR.
      scriptProps={{ type: "application/json" }}
    >
      <div className="bg-background p-6 text-foreground">{children}</div>
    </ModeProvider>
  );
}

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    palette: {
      description: "テーマ",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "noblog", title: "noblog" },
          { value: "matcha", title: "抹茶" },
          { value: "sumi", title: "墨" },
          { value: "ai", title: "藍" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "表示モード",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "ライト" },
          { value: "dark", title: "ダーク" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { palette: "noblog", mode: "light" },
  decorators: [
    (Story, context) => (
      <ThemeFrame palette={context.globals.palette} mode={context.globals.mode}>
        <Story />
      </ThemeFrame>
    ),
  ],
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    a11y: { test: "error" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};
export default preview;
