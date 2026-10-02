export const guides = {
  introduction: {
    title: "はじめに",
    subtitle: "自分の手で育てる、UIの道具箱。",
    sections: [
      {
        title: "nobcnについて",
        text: "nobcnは、日本語のWebアプリを作るための個人UIコレクションです。shadcn/uiのBase UI版を土台に、コンポーネントのソースを自分のプロジェクトへ取り込んで使います。必要なところを直し、その知見をまたここに戻していきます。",
      },
      {
        title: "3つの場所で、同じコンポーネントを",
        text: "Next.jsのサイトでは、使い方と実際の操作を確認します。Storybookでは、通常・エラー・無効・狭い幅などの状態を管理します。Registryから配布されるのも同じ実装です。ドキュメント用の見本と実際のコードが別物にならないようにします。",
      },
      {
        title: "大切にしていること",
        bullets: [
          "日本語の長い見出し、行間、折り返し、入力補助を丁寧に扱う。",
          "色や角丸をCSS変数に分離し、アプリごとにテーマを差し替える。",
          "画面幅ではなく、部品が置かれるコンテナ幅に応じて組み替える。",
          "空・読み込み中・エラー・成功と、その次の操作まで設計する。",
          "データ取得や業務ルールは利用側が持ち、UIはPropsで状態を受け取る。",
        ],
      },
      {
        title: "いま使えるもの",
        text: "最初のカタログは10コンポーネントと4テーマです。Zodのバージョン比較やSkeleton生成ツールは今後の実験対象として整理しています。実験段階の内容を、安定した配布APIと混ぜない方針です。",
      },
    ],
  },
  installation: {
    title: "インストール",
    subtitle: "必要な部品だけを、CLIで手元に。",
    sections: [
      {
        title: "1. Base UI版のshadcn/uiを準備",
        text: "ReactとTailwind CSS v4を使うプロジェクトで実行します。既存のRadix UI用プリミティブと名前が重なる場合は、CLIが表示する差分を確認してください。nobcnはBase UI版のファイルを配布します。",
        code: "bunx shadcn@latest init --base base",
      },
      {
        title: "2. ローカルのRegistryから追加",
        text: "このリポジトリでRegistryを生成し、Next.jsを起動します。利用側プロジェクトで、詳細ページの導入コマンドを実行してください。各JSONには必要なプリミティブと依存パッケージが含まれます。",
        code: "# nobcn側\nbun install\nbun run registry:build\nbun run dev\n\n# 利用側プロジェクト\nbunx shadcn@latest add http://localhost:3000/r/form-field.json",
        language: "shell",
      },
      {
        title: "3. テーマを追加",
        text: "noblog・抹茶・墨・藍の4つのテーマを用意しています。テーマはshadcn/uiと同じCSS変数を使います。部品を追加するたびにテーマを上書きしないよう、独立したRegistryアイテムとして配布します。",
        code: "bunx shadcn@latest add http://localhost:3000/r/theme-noblog.json",
        language: "shell",
      },
      {
        title: "GitHubから配布する",
        text: "ルートのregistry.jsonを含む変更をGitHubへ公開すると、以下の形式で直接インストールできます。ブランチ上の変更を試す場合は末尾に#ブランチ名、再現性を重視する場合は#コミットSHAを指定します。",
        code: "bunx shadcn@latest add nbr41to/nobcn/form-field\nbunx shadcn@latest add nbr41to/nobcn/theme-noblog",
        language: "shell",
      },
      {
        title: "Webサイトとして公開する",
        text: "Next.jsを公開すると、/r/{name}.jsonからも追加できます。buildコマンドはRegistryを先に生成します。Storybookは別途静的ホスティングし、NEXT_PUBLIC_STORYBOOK_URLにそのURLを指定してください。未設定時はローカルのlocalhost:6010へリンクします。",
        code: "bun run build\nbun run build-storybook",
        language: "shell",
      },
    ],
  },
  "container-queries": {
    title: "コンテナクエリ",
    subtitle: "画面ではなく、置かれた場所に合わせる。",
    sections: [
      {
        title: "同じ画面にも、違う幅がある",
        text: "サイドバー、ダイアログ、2カラムの本文。同じ画面幅でも、コンポーネントが使える幅は異なります。内部レイアウトはコンテナクエリを使い、ページ全体のナビゲーションにはビューポートのブレークポイントを使います。",
      },
      {
        title: "Tailwind CSS v4の書き方",
        text: "外側を名前付きコンテナにし、その子要素で@lg/emptyのように指定します。Empty Stateは32rem以上で横並び、それ未満で縦並びになります。コンテナ自身に対してクエリを適用しない点に注意します。",
        code: '<div className="@container/empty">\n  <div className="flex flex-col @lg/empty:flex-row">\n    {/* アイコン、本文、アクション */}\n  </div>\n</div>',
      },
      {
        title: "コンポーネントの確認方法",
        bullets: [
          "詳細ページのプレビューで、100%・640px・320pxを切り替える。",
          "StorybookのNarrow / Wideで、同じビューポート内の親幅を変える。",
          "日本語の長いラベルとエラー、長いファイル名でも折り返しを確認する。",
          "狭い幅で情報や操作が消えないかを確認する。",
        ],
      },
      {
        title: "対応状況",
        text: "Form Field、File Input、Empty State、Content Skeletonは名前付きコンテナを使います。Cardにはshadcn/ui標準のCardHeaderコンテナがあります。シンプルなButtonやBadgeには不要なクエリを追加していません。",
      },
    ],
  },
  contributing: {
    title: "開発ノート",
    subtitle: "試して、確かめて、再利用できるかたちへ。",
    sections: [
      {
        title: "実装の置き場所",
        code: "src/components/ui/       shadcn/uiのBase UI版プリミティブ\nsrc/registry/components/ 配布する独自コンポーネント\nsrc/catalog/             一覧情報・共通デモ・Stories\nsrc/components/site/    ドキュメントサイト専用UI\nsrc/app/                Next.jsのルート\nsrc/styles/tokens.css   テーマの契約\nregistry.json           配布アイテムの定義",
        language: "text",
      },
      {
        title: "コンポーネントを追加する",
        bullets: [
          "業務ルールを持たないPropsで、src/registry/componentsに実装する。",
          "src/catalog/components.tsに説明・Props・注意点を追加する。",
          "共通デモとStoryを作り、通常だけでなくエラー・無効・狭い幅を表現する。",
          "registry.jsonに実装と依存するBase UIプリミティブを登録する。",
          "Registryを生成し、別のプロジェクトにCLIで追加して確かめる。",
        ],
      },
      {
        title: "検証コマンド",
        code: "bun run lint\nbun run typecheck\nbun run test:stories\nbun run build\nbun run build-storybook",
        language: "shell",
        text: "Storybookの操作テストはChromiumで実行します。初回はbunx playwright install chromiumが必要です。GitHub Actionsでも同じ検証を行い、StorybookとRegistryを成果物として保存します。",
      },
      {
        title: "実験を残すとき",
        text: "目的・対象バージョン・比較条件・結果・採用判断をセットで記録します。Zodの更新なら入力データとエラー形式、Skeleton生成ならレイアウト差分と読み込み完了時のずれを観察します。実験から部品へ昇格するときに、APIとStoryを整えます。",
      },
      {
        title: "既存実装からの変更",
        text: "Breadcrumbはpathnameの自動分解から、itemsで日本語ラベルを明示するAPIに変更しました。FileInputには旧名UploadedFileListを互換エイリアスとして残しています。既存のStorybookサンプルはsrc/storiesに保存し、カタログからは除外しています。",
      },
    ],
  },
} satisfies Record<
  string,
  {
    title: string;
    subtitle: string;
    sections: {
      title: string;
      text?: string;
      bullets?: string[];
      code?: string;
      language?: string;
    }[];
  }
>;
