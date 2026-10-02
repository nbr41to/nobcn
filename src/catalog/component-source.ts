import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import registry from "../../registry.json";

// Only paths explicitly registered for distribution can be displayed.
export async function getComponentSources(name: string) {
  const item = registry.items.find((entry) => entry.name === name);
  if (!item?.files?.length) {
    throw new Error(`Registry source files are missing: ${name}`);
  }
  return Promise.all(
    item.files.map(async (file) => ({
      path: file.path,
      target: file.target,
      // next.config.ts explicitly includes only the distributed component sources.
      code: await readFile(
        path.join(/* turbopackIgnore: true */ process.cwd(), file.path),
        "utf8",
      ),
    })),
  );
}
