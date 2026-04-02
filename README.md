# 一関高専 電算部 公式Webサイト

一関高専電子計算機部（電算部）の公式Webサイトのソースコードです。
部活の概要、各班の紹介、活動実績、および部員の制作物（WORKS）を掲載しています。

本サイトは **GitHub Pages** への静的エクスポート（Static Export）を前提に設計されており、サーバーサイドの動的処理を持たない構成になっています。

## 電算部HPリポジトリの遷移 (R8/04/01現在)

1. [official-web](https://github.com/inct-densan-org/official-web)
   ~ 2026/03/31  
   Netlifyで運用.  
   [archive](https://densan.netlify.app)
   
2. [new-official-web](https://github.com/inct-densan-org/new-official-web)
   (開発中止?)
   
3. [official-web-renewal](https://github.com/inct-densan-org/official-web-renewal)
   (開発中止?)
   
4. This  
   2026/04/01 ~  
   GitHub PagesのUser Siteでホスティング.

## 🛠 技術スタック

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [motion (Framer Motion)](https://motion.dev/), [Three.js (React Three Fiber)](https://docs.pmnd.rs/react-three-fiber/)
* **UI Components**: [Swiper](https://swiperjs.com/) (カルーセル)
* **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown), [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize), `@tailwindcss/typography`

## 🚀 ローカル環境での実行方法

Node.js (v18以上推奨) がインストールされていることを確認し、以下のコマンドを実行してください。

```bash
# 1. パッケージのインストール
pnpm install

# 2. ローカルサーバーの立ち上げ
pnpm run dev

```

ブラウザで http://localhost:3000 にアクセスするとサイトが表示されます。

## 📝 コンテンツの更新・運用マニュアル

設定ファイルとMarkdownファイルの編集だけでサイトを更新できるようになっています。
基本的なデータはすべて `public/config.ts` （または `.json` / `.js`）で一元管理されています。

### 1. グループ（班）情報の変更

班の名前や説明文、表示される画像を更新したい場合は以下の手順を行います。

1. `public/config.ts` 内の `divisionsData`（または該当の変数）を編集します。
2. スライダーに表示する画像は `public/group/` フォルダ内に `[設定したpath].webp` などの形式で配置してください。

### 2. 活動実績（ACTIVITIES）の追加

大会の結果やイベントの参加記録を追加する場合は、`public/config.ts` の `activitiesData` に追記します。

```typescript
// 追加例
{
  "year": "2024",
  "month": "10",
  "items": [
    {
      "title": "全国高専プログラミングコンテスト 課題部門",
      "desc": "最優秀賞",
      "url": "[http://www.procon.gr.jp/](http://www.procon.gr.jp/)" // リンク先がない場合は "" (空文字) にする
    }
  ]
}
```

※ 直近の2件以外は、サイト上で「全て表示」ボタンを押した際に展開されます。

### 3. 作品（WORKS）の追加

部員の制作物やプロジェクトの紹介記事を追加する手順です。Markdownファイルで記事を執筆できます。

1. **フォルダの作成**
   `public/works/` ディレクトリの中に、作品の識別用ID（英数字ハイフンのみ）で新しいフォルダを作成します。
   例: `public/works/my-awesome-game/`
2. **Markdownと画像の配置**
   作成したフォルダ内に、紹介文を書いた `summary.md` と、記事内で使用する画像ファイルを配置します。
   *Markdown内での画像指定は、フォルダ名を意識せずファイル名のみでOKです。*
   *ファイルサイズの大きい画像はサイトの読み込み速度を低下させます。 webpなどの軽量なファイル形式に変換することを推奨します。*
   おすすめツール: [https://saruwakakun.com/tools/png-jpeg-to-webp/](https://saruwakakun.com/tools/png-jpeg-to-webp/)
   ```markdown
   # 作品の紹介
   これはゲームの紹介です。
   ![プレイ画面](screenshot.png) 
   ```
3. **configファイルへの登録**
   `public/config.ts` の `worksData` に情報を追加します。
   ```typescript
   export const worksData = [
       // ...既存の作品
       {
           id: "my-awesome-game", // 作成したフォルダ名と一致させる 必須
           title: "最高のアクションゲーム", // タイトル 必須
           summary: "content.md", // 概要が書いてあるmdファイルの名前 必須
           content: "content.md" // 詳細が書いてあるmdファイルの名前 任意
       },
   ];
   ```

※ contentの内容は、summaryの下の「詳細」アコーディオンの中に表示されます。

## 📦 ビルドとデプロイ (GitHub Pages)

このプロジェクトは `next.config.js` （または `.ts`）で `output: 'export'` が設定されています。

```bash
# 静的ファイルのビルド
pnpm run build
```

ビルドが成功すると `out/` ディレクトリに静的ファイル群が生成されます。
（※ GitHub Actions を設定している場合は、`main` ブランチにプッシュするだけで自動的に GitHub Pages にデプロイされます。）

(このドキュメントはgeminiくんに書いてもらいました.)
