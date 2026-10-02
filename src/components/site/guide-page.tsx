import Link from "next/link";
import { guides } from "@/catalog/guides";
import { CodeBlock } from "./code-block";

export function GuidePage({ slug }: { slug: keyof typeof guides }) {
  const guide: {
    title: string;
    subtitle: string;
    sections: {
      title: string;
      text?: string;
      code?: string;
      language?: string;
      bullets?: string[];
    }[];
  } = guides[slug];
  return (
    <article className="max-w-3xl">
      <p className="mb-5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
        DOCUMENTATION
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">{guide.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">{guide.subtitle}</p>
      <div className="docs-prose">
        {guide.sections.map((section, index) => (
          <section id={`section-${index + 1}`} key={section.title}>
            <h2>{section.title}</h2>
            {section.text && <p>{section.text}</p>}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.code && (
              <CodeBlock
                code={section.code}
                label={section.language ?? "tsx"}
              />
            )}
          </section>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-5 border-t pt-6 text-xs text-primary">
        <Link href="/components">コンポーネント一覧 →</Link>
        <Link href="/themes">テーマ →</Link>
        <a
          href="https://ui.shadcn.com/docs/registry"
          target="_blank"
          rel="noreferrer"
        >
          shadcn/ui Registry公式 ↗
        </a>
        <a
          href="https://tailwindcss.com/docs/responsive-design#container-queries"
          target="_blank"
          rel="noreferrer"
        >
          Tailwind公式 ↗
        </a>
      </div>
    </article>
  );
}
