export type ComponentCategory =
  | "基本"
  | "フォーム"
  | "フィードバック"
  | "ナビゲーション";
export interface ComponentEntry {
  slug: string;
  name: string;
  label: string;
  category: ComponentCategory;
  description: string;
  detail: string;
  source: string;
  story: string;
  cq: boolean;
  props: string[][];
  code: string;
  notes: string[];
}
export const components: ComponentEntry[] = [
  {
    slug: "button",
    name: "Button",
    label: "ボタン",
    category: "基本",
    description: "操作の意図を、短く明確に伝える。",
    detail:
      "主操作・補助操作・取り消しを、視覚的な優先順位で整理します。Base UIのキーボード操作とフォーカス管理を利用します。",
    source: "src/components/ui/button.tsx",
    story: "components-button",
    cq: false,
    props: [
      [
        "variant",
        "default | secondary | outline | ghost | destructive | link",
        "default",
        "操作の優先度と意味",
      ],
      [
        "size",
        "default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg",
        "default",
        "表示サイズ",
      ],
      ["disabled", "boolean", "false", "操作できない状態"],
      [
        "render",
        "ReactElement | function",
        "—",
        "リンクなどへの要素の差し替え",
      ],
    ],
    code: 'import { Button } from "@/components/ui/button";\n\n<Button onClick={save}>変更を保存</Button>\n<Button variant="outline">キャンセル</Button>',
    notes: [
      "「送信」より「申し込みを送信」のように、結果が伝わる言葉を使います。",
      "非同期処理中はdisabledとaria-busyを指定し、ラベルでも状況を伝えます。",
      "Base UIではasChildではなくrenderを使います。リンク化するときはnativeButton={false}も指定します。",
    ],
  },
  {
    slug: "input",
    name: "Input",
    label: "入力欄",
    category: "基本",
    description: "書きやすく、読み返しやすい入力欄。",
    detail:
      "Base UIのInputを使う最小の入力プリミティブです。日本語の入力例、補足文、エラーまで必要な場合はForm Fieldを使います。",
    source: "src/components/ui/input.tsx",
    story: "components-input",
    cq: false,
    props: [
      ["type", "HTML input type", "text", "入力の種類"],
      ["disabled", "boolean", "false", "編集不可"],
      ["aria-invalid", "boolean", "false", "入力エラー"],
      ["placeholder", "string", "—", "入力例。ラベルの代わりにはしません"],
    ],
    code: 'import { Input } from "@/components/ui/input";\n\n<label htmlFor="project">プロジェクト名</label>\n<Input id="project" placeholder="例：暮らしの手帖" />',
    notes: [
      "プレースホルダーだけで用途を伝えず、必ずラベルを関連付けます。",
      "IMEの変換確定とフォーム送信を混同しないように、独自のEnter処理はisComposingを確認します。",
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    label: "バッジ",
    category: "基本",
    description: "状態を、色だけに頼らず伝える。",
    detail:
      "公開・下書き・確認中など、短い状態表示に使います。色に加えてテキストを持たせます。",
    source: "src/components/ui/badge.tsx",
    story: "components-badge",
    cq: false,
    props: [
      [
        "variant",
        "default | secondary | outline | destructive | ghost | link",
        "default",
        "状態の見た目",
      ],
      ["children", "ReactNode", "—", "表示するラベル"],
    ],
    code: 'import { Badge } from "@/components/ui/badge";\n\n<Badge>公開中</Badge>\n<Badge variant="secondary">下書き</Badge>',
    notes: [
      "「緑だから成功」ではなく「完了」のテキストも表示します。",
      "操作を行う要素にはButtonを使います。",
    ],
  },
  {
    slug: "card",
    name: "Card",
    label: "カード",
    category: "基本",
    description: "関連する情報を、ひとつのまとまりに。",
    detail:
      "見出し・説明・本文・フッターを組み合わせるshadcn/uiのカードです。内部のコンテンツに応じて構造を選べます。",
    source: "src/components/ui/card.tsx",
    story: "components-card",
    cq: true,
    props: [
      ["size", "default | sm", "default", "カード内の余白"],
      [
        "children",
        "ReactNode",
        "—",
        "Header / Content / Footerなどの組み合わせ",
      ],
    ],
    code: 'import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";\n\n<Card>\n  <CardHeader>\n    <CardTitle>チームのワークスペース</CardTitle>\n    <CardDescription>日々のアイデアを、ひとつの場所に。</CardDescription>\n  </CardHeader>\n</Card>',
    notes: [
      "長い日本語の見出しを切り捨てず、複数行で読めるようにします。",
      "CardHeaderはコンテナとして定義されています。独自レイアウトは親の幅を基準に調整します。",
    ],
  },
  {
    slug: "form-field",
    name: "Form Field",
    label: "フォームフィールド",
    category: "フォーム",
    description: "ラベル、補足、エラーをひとつに。",
    detail:
      "必須表示と入力例を備えた日本語フォームの最小単位。ラベルと補足、エラーを自動生成したIDで入力欄に関連付けます。",
    source: "src/registry/components/form-field.tsx",
    story: "components-form-field",
    cq: true,
    props: [
      ["label", "string", "必須", "入力欄のラベル"],
      ["description", "string", "—", "入力の補足"],
      ["error", "string", "—", "修正方法が伝わるエラー"],
      ["required", "boolean", "false", "HTMLの必須指定と必須ラベル"],
      ["...props", "Input props", "—", "name、value、onChangeなど"],
    ],
    code: 'import { FormField } from "@/components/form-field";\n\n<FormField\n  label="メールアドレス"\n  name="email"\n  type="email"\n  required\n  description="確認メールをお送りします。"\n  placeholder="you@example.com"\n/>',
    notes: [
      "エラーは「入力が不正です」ではなく、修正方法が分かる文にします。",
      "検証ロジックを持たないため、Zodやフォームライブラリと組み合わせられます。",
      "フォントサイズは画面幅ではなく、このフィールドが入るコンテナ幅で変わります。",
    ],
  },
  {
    slug: "file-input",
    name: "File Input",
    label: "ファイル選択",
    category: "フォーム",
    description: "添付する前に、選択内容を確かめる。",
    detail:
      "複数ファイルの追加・重複除外・個別削除に対応します。選択内容はネイティブinputと同期し、FormDataにも反映されます。アップロード処理は利用側が実装します。",
    source: "src/registry/components/file-input.tsx",
    story: "components-file-input",
    cq: true,
    props: [
      ["label", "string", "ファイルを添付", "入力欄のラベル"],
      ["accept", "string", "—", "ファイル選択ダイアログへのヒント"],
      ["name", "string", "—", "FormDataのフィールド名"],
      ["disabled", "boolean", "false", "追加と削除を無効化"],
      ["onFilesChange", "(files: File[]) => void", "—", "選択変更時の通知"],
    ],
    code: 'import { FileInput } from "@/components/file-input";\n\n<FileInput\n  name="attachments"\n  accept=".pdf,.png,.jpg"\n  onFilesChange={(files) => console.log(files)}\n/>',
    notes: [
      "acceptは検証ではありません。ファイルサイズと形式は送信先でも検証します。",
      "名前・サイズ・更新日時が一致するファイルを重複として扱います。",
      "狭いコンテナでは補足サイズを省略し、長いファイル名は折り返します。",
    ],
  },
  {
    slug: "empty-state",
    name: "Empty State",
    label: "空の状態",
    category: "フィードバック",
    description: "何もないときこそ、次の一歩を。",
    detail:
      "データがない理由と、次にできることを示します。親コンテナが32rem以上になると横並び、それ未満では縦並びになります。",
    source: "src/registry/components/empty-state.tsx",
    story: "components-empty-state",
    cq: true,
    props: [
      ["title", "string", "必須", "現在の状態"],
      ["description", "string", "—", "理由や次の行動"],
      ["icon", "ReactNode", "Inbox", "装飾アイコン"],
      ["action", "ReactNode", "—", "次の操作への導線"],
    ],
    code: 'import { EmptyState } from "@/components/empty-state";\nimport { Button } from "@/components/ui/button";\n\n<EmptyState\n  title="まだプロジェクトがありません"\n  description="最初のアイデアを、ここから。"\n  action={<Button onClick={create}>作成する</Button>}\n/>',
    notes: [
      "検索結果なし・初回利用・読み込み失敗は区別します。",
      "ライブラリはデータ取得を行いません。状態とアクションをPropsで渡します。",
    ],
  },
  {
    slug: "content-skeleton",
    name: "Content Skeleton",
    label: "読み込み中",
    category: "フィードバック",
    description: "読み込みの間にも、情報のかたちを。",
    detail:
      "リストの読み込み中に使うプレースホルダー。視覚的な骨格とスクリーンリーダー向けの状態通知を用意します。",
    source: "src/registry/components/content-skeleton.tsx",
    story: "components-content-skeleton",
    cq: true,
    props: [
      ["rows", "number", "3", "行数。1〜10に丸めます"],
      ["className", "string", "—", "幅や余白の追加"],
    ],
    code: 'import { ContentSkeleton } from "@/components/content-skeleton";\n\n<ContentSkeleton rows={3} />',
    notes: [
      "無限に表示せず、取得失敗時はエラーと再試行手段を示します。",
      "prefers-reduced-motionに従ってアニメーションを止めます。",
      "幅24rem未満ではアバター枠を省略します。",
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    label: "パンくずリスト",
    category: "ナビゲーション",
    description: "今いる場所を、日本語で案内する。",
    detail:
      "URLを機械的に翻訳せず、日本語ラベルを明示するパンくずリスト。Next.jsのルーティングに依存せず利用できます。",
    source: "src/registry/components/breadcrumb.tsx",
    story: "components-breadcrumb",
    cq: false,
    props: [
      [
        "items",
        "{ label: string; href?: string }[]",
        "必須",
        "階層順の項目。末尾は現在地",
      ],
    ],
    code: 'import { Breadcrumb } from "@/components/breadcrumb";\n\n<Breadcrumb items={[\n  { label: "ホーム", href: "/" },\n  { label: "プロジェクト", href: "/projects" },\n  { label: "暮らしの手帖" },\n]} />',
    notes: [
      '末尾をaria-current="page"で示します。',
      "従来の自動URL分解方式から、itemsを明示する方式に変更しています。",
      "幅が足りないときは折り返し、階層を隠しません。",
    ],
  },
  {
    slug: "mode-toggle",
    name: "Mode Toggle",
    label: "表示モード",
    category: "ナビゲーション",
    description: "明るさを、使う人の好みに合わせる。",
    detail:
      "ライト・ダーク・システムを選べるメニュー。next-themesが選択を保持し、システムの変更にも追従します。",
    source: "src/registry/components/mode-toggle.tsx",
    story: "components-mode-toggle",
    cq: false,
    props: [
      ["ModeToggle", "propsなし", "—", "表示モードの選択メニュー"],
      ["ModeProvider", "ThemeProvider props", "—", 'attribute="class"を指定'],
    ],
    code: 'import { ModeProvider, ModeToggle } from "@/components/mode-toggle";\n\n<ModeProvider attribute="class" defaultTheme="system" enableSystem>\n  <ModeToggle />\n</ModeProvider>',
    notes: [
      "アプリのルートでModeProviderを一度だけ設定します。",
      "Next.jsではhtmlにsuppressHydrationWarningを設定します。",
      "Storybookではツールバーの表示モードが優先されます。選択状態とメニュー操作を確認できます。",
    ],
  },
];
