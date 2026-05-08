# GitHub Pages へのデプロイ手順

## 概要

- Next.js 16 を **静的エクスポート** で `out/` に書き出し、GitHub Pages にアップロードします。
- `.github/workflows/deploy.yml` が main ブランチへの push 時に自動でビルド＆公開します。
- `NEXT_PUBLIC_BASE_PATH` 環境変数は GitHub Actions が自動算出するので手動設定不要です。

---

## 初回デプロイ手順

### 1. ローカルで Git 初期化（まだの場合）

```bash
cd "/Users/apple/Desktop/vibe_coding/Agent/02_marketing/起業の科学/portal"
git init
git add .
git commit -m "feat: initial portal site"
git branch -M main
```

### 2. GitHub にリポジトリを作成

GitHub Web UI または `gh` CLI で空のリポジトリを作成してください。
**用途別に 2 パターン**:

#### A. プロジェクト Page（`https://<user>.github.io/<repo>/`）

```bash
# 例: knowns/kigyou-portal
gh repo create knowns/kigyou-portal --public --source=. --remote=origin --push
```

→ アクセス URL: `https://knowns.github.io/kigyou-portal/`

#### B. ユーザー / Org Page（`https://<user>.github.io/`）

リポジトリ名を必ず `<user>.github.io` にする：

```bash
gh repo create knowns/knowns.github.io --public --source=. --remote=origin --push
```

→ アクセス URL: `https://knowns.github.io/`

### 3. Pages を有効化

GitHub のリポジトリ → **Settings → Pages** で:

- **Source**: `GitHub Actions` を選択

これで `git push` 時にワークフローが起動し、`out/` を自動デプロイします。

### 4. 動作確認

`Actions` タブでビルドが緑になったら、上記 URL にアクセスして表示確認。

---

## 独自ドメインで公開する場合

`Settings → Pages → Custom domain` に独自ドメインを入力し、DNS の CNAME を設定。
このリポジトリの `public/CNAME` ファイルにドメインを書いておくとビルド時に保持されます（必要な場合のみ作成）。

---

## ローカルで本番ビルドを試す

```bash
# 静的エクスポート
npm run build

# out/ をローカルでサーブ（基準パスなしで開ける）
npx serve out
# → http://localhost:3000
```

プロジェクト Page で配信予定の場合の事前確認:

```bash
NEXT_PUBLIC_BASE_PATH=/kigyou-portal npm run build
npx serve out -p 3000 -L
# → http://localhost:3000/kigyou-portal/
```

---

## 注意事項

| 項目 | 対応状況 |
|---|---|
| Server Components | 全て静的化されるので OK |
| `generateStaticParams` | 全動的ルートに設定済み |
| 認証・登録フォーム | 外部 SaaS（video-search-app-ten.vercel.app）にリンク |
| 検索（/search） | クライアント側だけで動作 |
| API ルート | なし（追加すると静的エクスポート不可） |
| Image Optimization | `unoptimized: true` で全画像静的配信 |

API ルートを追加すると GitHub Pages では動かなくなります。動的機能が必要になったら **Vercel / Cloudflare Pages** への切替を検討してください。
