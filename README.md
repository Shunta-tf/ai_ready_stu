# AI教育推進機構 学生部 公式サイト

AI教育推進機構 学生部の公式サイト。本部（`ai-ready-education.org`）の下位ブランドで、
目的は対外PR・実績紹介。純粋な HTML / CSS / JS のみ（ビルド工程なし）で構築している。

- **公開URL**: https://shunta-tf.github.io/ai_ready_stu/
- **リポジトリ**: https://github.com/Shunta-tf/ai_ready_stu
- **制作ルール**: [`CLAUDE.md`](CLAUDE.md) ／ 詳細仕様: [`STUDENT_DIVISION_SITE_SPEC.md`](STUDENT_DIVISION_SITE_SPEC.md)

## 公開方法（GitHub Pages・プロジェクトページ）

`main` ブランチのルートを GitHub Pages で配信している（案B）。

- GitHub → リポジトリ → **Settings → Pages**
- **Build and deployment**: Source = `Deploy from a branch`、Branch = `main` / `/ (root)`
- 保存後 1〜2 分で `https://shunta-tf.github.io/ai_ready_stu/` に反映される。

> サブパス（`/ai_ready_stu/`）配下のため、HTML内のリンク・アセットは
> **相対パス**（`css/style.css` / `activities.html`）で書く。
> ルート相対（`/css/...`）はドメイン直下を指して 404 になるため使わない。

## どのPCからでも編集する

```bash
# 初回：このPCに取得
git clone https://github.com/Shunta-tf/ai_ready_stu.git
cd ai_ready_stu

# 2回目以降：最新を取り込む
git pull

# 編集後：反映（push 後 1〜2 分で公開サイトに反映）
git add .
git commit -m "変更内容"   # メッセージ末尾に Co-Authored-By を付けてよい
git push
```

ローカルでの表示確認（任意・どちらでも可）:

```bash
python -m http.server 8000   # → http://localhost:8000/
```

## ディレクトリ構成

```
index.html            トップ（ヒーロー / 実績ハイライト / 連携メリット / News / CTA）
about.html            私たちについて（理念 / 価値観3つ / 設立背景 / 目指す姿）
activities.html       活動・実績【中心】（実績 / note・YouTube・選書・イベント / News）
members.html          体制・メンバー（運営学生 / 支援体制 / 本部との関係）
contact.html          お問い合わせ・参加（窓口 / 連携メリット / フォーム）
css/style.css         全ページ共通スタイル（:root にデザイントークン）
js/main.js            全ページ共通スクリプト（フォームのバリデーション含む）
sitemap.xml           SEO（全ページ。Search Console に登録して使う）
robots.txt            SEO（※プロジェクトページではドメイン直下の robots.txt が優先される点に注意）
images/hero/          ヒーロー画像（ASCIIパス・JPEG。未配置時は濃紺背景で代替）
images/activities/    実績・イベント写真
images/members/       メンバー写真（掲載は本人の許諾必須）
```

> ページを追加・改名したら、全ページのナビ／フッターと `sitemap.xml` も更新する。
> 問い合わせフォームは送信先（Formspree等）が未設定の間は送信されず、メール連絡を案内する。

## 編集時の注意（重要）

- 色・余白・角丸は `css/style.css` の `:root` 変数経由で使う（直値の手打ち禁止）。
- アクセントは**コーラル一色**のみ。グラデ・ピル角丸・派手な hover は禁止（[`CLAUDE.md`](CLAUDE.md) §7）。
- 事実・数値・日付・実績・メンバー名は創作しない。未確定は `{{要確認: ◯◯}}` のまま残す。
- 画像は ASCIIパス・JPEG（iPhoneのHEICは表示されないため変換）。肖像は本人の許諾を取る。

## 公開前に埋める `{{要確認}}`（現状プレースホルダ）

- `index.html` head: Search Console 検証コード、OGP画像（`images/hero/ogp.jpg`）、ロゴ（`images/logo.png`）
- JSON-LD / フッター: note・YouTube・X の各URL
- 実績ハイライト: 各数値と「実施中／構想中」
- 連携でできること: 提携メリット3点の具体内容（たたき台のため要差し替え）
- News: 日付（絶対表記 例 `2025.08`）・見出し・リンク
