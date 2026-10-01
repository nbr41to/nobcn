import { mkdir, readFile, writeFile } from "node:fs/promises";

const source = await readFile("src/styles/tokens.css", "utf8");
const registry = JSON.parse(await readFile("registry.json", "utf8"));
function block(selector: string): Record<string, string> {
  const start = source.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`Theme selector not found: ${selector}`);
  const body = source.slice(
    start + selector.length + 2,
    source.indexOf("}", start),
  );
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim(),
    ]),
  );
}
const base = block(":root");
const dark = block(".dark");
await mkdir("public/themes", { recursive: true });
for (const [palette, label] of [
  ["noblog", "noblog"],
  ["matcha", "抹茶"],
  ["sumi", "墨"],
  ["ai", "藍"],
]) {
  const light = { ...base };
  const night = { ...base, ...dark };
  if (palette !== "noblog") {
    const override = block(`:root[data-palette="${palette}"]`);
    Object.assign(light, override);
    Object.assign(
      night,
      override,
      block(`:root[data-palette="${palette}"].dark`),
    );
  }
  const item = registry.items.find(
    (item: { name: string }) => item.name === `theme-${palette}`,
  );
  if (!item) throw new Error(`Registry theme not found: ${palette}`);
  item.cssVars = { light, dark: night };
  const declarations = (values: Record<string, string>) =>
    Object.entries(values)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");
  await writeFile(
    `public/themes/${palette}.css`,
    `@import "@fontsource-variable/noto-sans-jp";\n@import "@fontsource-variable/baloo-2";\n@import "@fontsource-variable/fira-code";\n/* nobcn / ${label} — generated from src/styles/tokens.css */\n:root {\n${declarations(light)}\n}\n.dark {\n${declarations(night)}\n}\n`,
  );
}
await writeFile("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
console.log("Synced 4 themes from src/styles/tokens.css");
