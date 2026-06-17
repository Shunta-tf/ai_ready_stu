# AI教育推進機構 学生部 公式サイト制作仕様書（AI向け）

このドキュメントは、`SITE_TEMPLATE.md`（今野駿太の個人サイト制作フォーマット）を
**継承**し、AI教育推進機構 学生部の公式サイト用に配色・フォント・構成・構造化データを
カスタマイズしたものである。Claude Code 等のAIエージェントにそのまま渡して使う。

個人サイトの仕様（純HTML/CSS/JS、GitHub Pages、§7の禁止事項、画像の扱い、SEO手順）は
原則そのまま踏襲する。本書では**差分のみ**を明示し、変更のない項目は元フォーマットを参照する。

> **【2026.06 更新・最重要】配色方針を変更（オーナー決定）**
> 当初の「温かいオフホワイト + コーラル差し色」から、**本部ロゴ準拠の
> 「白基調 × 濃紺 × ブルー（アクセント `#1f6ab0`）」**へ変更した。
> 以下の本文に残る「コーラル」「オフホワイト」の表現は、それぞれ「ブルー」「白基調」に読み替える。
> 最新の確定トークンは §2 を参照（こちらが正）。アクセントは引き続き**一色のみ**（ブルー）。
> また公開先は **GitHub Pages プロジェクトページ `https://shunta-tf.github.io/ai_ready_stu/`（案B）に確定**。
> サブパス配下のためリンク・アセットは**相対パス**で書く（ルート相対 `/...` は使わない）。

---

## 0. 基本方針

- **フレームワーク不使用**。純粋な HTML / CSS / JS のみ（ビルド工程なし）。GitHub Pages で公開。
- **温かいオフホワイト + コーラル差し色**。個人サイトの「白 + ブルー」から色を差し替える。
  - 理由: ① 本部サイト(`ai-ready-education.org`)の**下位ブランド**として独自の識別色を持たせる。
    ② 「人の成長・教育」という中心価値に合う温度感を出す。冷たいテック感を避ける。
- **目的は対外PR・実績紹介**。第一の読み手は提携先・一般。第二に参加希望の学生。
- **アクセントは一色（コーラル）に限定**。個人サイトの「ブルーを効かせる一点投入」の規律を、
  色だけ替えて完全に踏襲する。多色化は禁止（§7）。
- 「AIが量産したテンプレ」に見せないこと（§7を厳守）。

---

## 1. ファイル構成

個人サイトと同じく 1ファイル1ページ。ページ構成は学生部のIAに合わせて再定義する。

```
gakuseibu-site/
├── index.html        # トップ（ヒーロー / 実績ハイライト / News / CTA）
├── about.html        # 私たちについて（理念・価値観3つ・設立背景・目指す姿）
├── activities.html   # 活動・実績【中心ページ】（note / YouTube学習ガイド / 選書 / イベント）
├── members.html      # 体制・メンバー（運営学生 + 社会人/専門家の支援体制）
├── contact.html      # お問い合わせ・参加（提携窓口 / メンバー募集）
├── css/style.css     # 全ページ共通スタイル
├── js/main.js        # 全ページ共通スクリプト
├── images/           # 画像（ASCIIパスのみ）
│   ├── hero/         # トップのヒーロー画像
│   ├── activities/   # 実績・イベント写真
│   └── members/      # メンバー写真
├── CNAME             # 独立サブドメイン公開時のみ（§9）
├── sitemap.xml       # SEO
├── robots.txt        # SEO
└── README.md         # 更新履歴・更新方法
```

注: 学習リソース（選書リスト・初心者学習導線）はハイブリッド公開の方針に従い、
v1では `activities.html` 内のセクションとして実装する。分量が増えたら `resources.html` に分離してよい。

---

## 2. デザインシステム（CSS変数）

個人サイトの構造（変数経由ですべて指定）は踏襲し、**値のみ差し替える**。

```css
:root {
  /* 配色: 本部ロゴ準拠（白基調 × 濃紺 × ロゴ系ブルー） */
  --bg-primary:    #ffffff;   /* ページ背景（白） */
  --bg-secondary:  #eef4f9;   /* 交互セクション（ロゴ水色の薄め） */
  --bg-card:       #ffffff;   /* カード面は白 */

  /* 構造色: 見出し・ナビ・罫線の主役。濃紺＝ロゴのライン色 */
  --ink:           #15324f;   /* 見出し（display）最濃 */
  --text-primary:  #25405f;   /* 強めの本文・小見出し */
  --text-secondary:#4a5870;   /* 説明文 */
  --text-muted:    #616b7c;   /* ラベル・補足（白・薄水色背景でAA確保） */

  /* アクセント: 一色のみ（ロゴ系ブルー）。CTAとホバー線にだけ使う */
  --accent:        #1f6ab0;
  --accent-dark:   #16518a;   /* hover時 */
  --accent-soft:   rgba(31,106,176,0.08);

  --border:        rgba(21,50,79,0.12);
  --header-height: 72px;
  --section-pad:   72px 0;
  --max-width:     1200px;
  --radius:        6px;       /* 角丸は小さく（§7。丸すぎ厳禁・ピル禁止） */
  --radius-sm:     4px;
  --shadow:        0 1px 2px rgba(15,40,65,0.04), 0 4px 14px rgba(15,40,65,0.06);
  --shadow-hover:  0 2px 6px rgba(15,40,65,0.06), 0 14px 30px rgba(15,40,65,0.10);
}
```

### タイポグラフィ（差分）
- 見出し（display）/ 英字: **Inter**（個人サイトの Montserrat から変更）。
  - 理由: 学生部は組織ブランドであり、Montserrat のポスター的な強さより、Inter の中立・現代的で
    信頼感のある字面が、提携先・一般向けPRに合う。個人サイトとの識別にもなる。
- 本文（日本語）: **Noto Sans JP**（個人サイトと同じ）。
- Google Fonts を `<head>` で preconnect + 読み込み。読み込みURLは下記（§3）。
- セクション見出し `.section-title` は `clamp(2rem,4.5vw,2.9rem)` / `font-weight:700` / `letter-spacing:-0.02em`。
  - Inter は800だと重すぎるため700を上限とする。
- 英字ラベル（`.section-label`）は Inter・大文字・`letter-spacing` 広め。**ただし多用しない**（§7）。

### 余白
個人サイトと同一（PC 72px / ≤768px 44px / ≤480px 36px）。

---

## 3. 共通レイアウト要素（差分）

### head（全ページ共通テンプレ）
個人サイトのテンプレを踏襲し、フォント読み込み・サイト名・JSON-LDを差し替える。

```html
<meta charset="UTF-8">
<meta name="google-site-verification" content="（Search Consoleの値）" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="（ページ固有の説明。検索結果に出る）">
<title>ページ名 — AI教育推進機構 学生部</title>
<link rel="canonical" href="（このページの絶対URL）">
<!-- OGP / Twitter Card -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="AI教育推進機構 学生部">
<meta property="og:locale" content="ja_JP">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="（絶対URL）">
<meta property="og:image" content="（絶対URLの画像 1200x630推奨）">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="（絶対URLの画像）">
<!-- フォント（Montserrat → Inter に変更） -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
```

トップ(index)のみ `<body class="home-page">` を付け、`</head>`直前に **Organization 構造化データ**(JSON-LD)を入れる
（個人サイトの Person から変更）。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "AI教育推進機構 学生部",
  "url": "（学生部サイトの絶対URL）",
  "logo": "（ロゴ画像の絶対URL）",
  "description": "AIを手段に、学生が挑戦し成長する実践コミュニティ。",
  "parentOrganization": {
    "@type": "Organization",
    "name": "AI教育推進機構",
    "url": "https://ai-ready-education.org/"
  },
  "sameAs": [
    "（note のURL）",
    "（YouTube のURL）",
    "（X/SNS のURL）"
  ]
}
</script>
```

### ヘッダー / ナビ
個人サイトと同一構造（固定ヘッダー・スクロールで白背景+blur・モバイルはハンバーガー）。
ナビ項目を全ページで統一する: `活動・実績 / 私たちについて / 体制 / お問い合わせ`。
お問い合わせのみコーラルのボタン扱いにして主CTAを際立たせる。

### セクションの型 / フッター
個人サイトと同一。`.section-label::before` のアクセント線は**ブルーからコーラルへ**色を差し替える（§4）。

---

## 4. インタラクション（共通モチーフ）

個人サイトの **「ラインがホバーで出現」** を統一言語として踏襲し、**色をコーラルに差し替える**だけ。
- カード: ホバーで上部にコーラル線 + `translateY(-3px)` + 控えめな影。
- ニュース/実績項目: ホバーで左にコーラル縦線（`scaleY` で出現、レイアウトずれなし）。
- ボタン: ホバーで `translateY(-2px)` + 影、コーラルCTAは `--accent-dark` へ。

JS（`js/main.js`）の機能は個人サイトと同一（ページf-in / scrolled切替 / ハンバーガー /
IntersectionObserverによる`.fade-in` / ヒーロースライドショー / アクティブナビ判定 /
問い合わせフォームのバリデーション）。

---

## 5. レスポンシブ

個人サイトと同一（1024 / 768 / 480px）。

---

## 6. 画像の扱い

個人サイトと同一の注意点を厳守する。
- 日本語ファイル名・フォルダ名は使わない（ASCIIパスにコピーしてから参照）。
- iPhoneのHEICに注意（拡張子が`.jpg`でも中身がHEICだと表示されない。`ftypheic`判定→JPEG変換）。
- ヒーロー画像はCSSで`opacity`を下げ、暗いオーバーレイを重ねて文字を読ませる。
- **組織サイトのため肖像・写真の使用許諾に注意**。メンバー写真・イベント写真は本人/参加者の同意を取る。

---

## 7. 「AIっぽさ」を避ける禁止事項

個人サイトの §7 を**そのまま適用**する。要点を再掲する。
- ❌ ピル型（`border-radius:100px`）のバッジ・ラベル → 角丸は 4〜6px。
- ❌ グラデーション背景・放射状ブロブ・斜めclip-path。
- ❌ カードの常時表示グラデ上線・光るドット・強い影。
- ❌ hover時の大きな拡大や派手なリフト。
- ❌ 大文字・超ワイドletter-spacingのラベルの多用。
- ✅ 代わりに: フラットな配色・控えめな角丸・タイポの強弱・**コーラルを一点投入**・ホバー時のみの控えめなアクセント線。

---

## 8. コンテンツ作成の原則

個人サイトの原則（事実は正確に・数値や日付はユーザー確認・絶対表記・煽り控えめ・
英語ラベル+日本語見出しの組み合わせ）を踏襲し、**組織サイト固有の原則**を追加する。

- **実績は誇張しない**。設立間もない団体のため、「これまでの累積」を盛るのではなく、
  記事本数・公開ガイド・実施イベントといった**動いている事実**と、短期/中期/長期の方向性で勢いを示す。
- **活動の成熟度を「実施中／構想中」で明示する**。未実施を実施済みに見せない。
  これは学生部の価値観「信頼」をそのまま設計に落とす行為であり、PRサイトの信頼性の核になる。
- **提携先メリットの言語化**【最重要・現状の空白】。提携先・一般がPRサイトに来て知りたいのは
  「この学生部と組むと何ができるか」である。現行資料は理念と学生向け活動には厚いが、
  外部から見た協業価値が薄い。トップと contact に「連携でできること」を最低3点、具体で置く。
- 日付は絶対表記（「昨年」ではなく「2025.08」）。News・実績は新しい順。

---

## 9. デプロイ & 公開先

純HTML/CSS/JS を GitHub Pages で公開する（個人サイトと同じ運用）。
ただし**公開先URLは要決定**（設計に影響するため最初に確定する）。

- 案A: **独立サブドメイン** `gakuseibu.ai-ready-education.org`
  - リポジトリに `CNAME` ファイルを置き、ドメイン側に DNS（CNAME/A）レコードを設定。
  - 下位ブランドとして最も正式に見える。**本部ドメインのDNS管理権限が必要**（要相談）。
- 案B: **GitHub Pages のプロジェクトページ** `https://（org or user）.github.io/gakuseibu/`
  - DNS権限不要ですぐ出せる。ただし本部との一体感は弱い。`basePath`相当の相対パスに注意。

更新フロー（個人サイトと同一）:
```bash
git add .
git commit -m "変更内容"   # 末尾に Co-Authored-By を付与
git push                    # 1〜2分で反映
```

---

## 10. SEO / Google検索登録

個人サイトの §10 手順を踏襲する。差分のみ記載する。
- `robots.txt`（全許可 + サイトマップURL明記）/ `sitemap.xml`（全ページ）。
- 全ページに OGP / Twitter Card / canonical。
- トップに JSON-LD は **Organization / EducationalOrganization**（§3。Personではない）。
- Search Console:
  - 案A（独立サブドメイン）なら **「ドメイン」プロパティ**も使える（DNS TXT確認）。
  - 案B（github.io）なら個人サイト同様 **「URLプレフィックス」+ HTMLタグ確認**。

---

## 11. 新規制作チェックリスト

- [ ] 公開先（案A/案B）を決定し、`basePath`・絶対URL・CNAMEを確定
- [ ] `:root` のデザイントークンを本仕様（オフホワイト+コーラル一色）で定義
- [ ] Inter + Noto Sans JP を読み込み
- [ ] 全ページ共通の head / header / footer をテンプレ化
- [ ] ナビ項目を全ページで統一（活動・実績 / 私たちについて / 体制 / お問い合わせ）
- [ ] アクセント線・ホバー線をコーラルに統一（多色化していないか）
- [ ] 実績に「実施中／構想中」を明示／提携メリットを3点以上明記
- [ ] 画像は ASCIIパス・JPEG（HEICは変換）、肖像の許諾確認
- [ ] レスポンシブ 1024/768/480 を確認
- [ ] 禁止事項（§7）に抵触していないか目視レビュー（特に角丸・グラデ・色数）
- [ ] robots.txt / sitemap.xml / OGP / canonical / Organization JSON-LD を設置
- [ ] GitHub Pages 公開 → Search Console 登録

---

## 要確認事項（着手前に潰す）

1. **公開先**: 案A（サブドメイン・本部DNS権限が要る）か 案B（github.io）か。
2. **提携先メリット**: 「学生部と組むと何ができるか」を3点以上、具体で言語化できるか。
3. **学習リソースの公開範囲**: 選書・学習導線をサイト内に載せるか、外部リンクに留めるか。
4. **ロゴ素材**: 本部ロゴの流用可否、または学生部用の派生ロゴの有無。
