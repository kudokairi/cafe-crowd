# Cafe Crowd

カフェの混雑状況をリアルタイムで共有・確認できるWebアプリケーションです。

## 機能

- 🗺️ Google Mapsを使用したカフェの位置表示
- 📊 リアルタイムの混雑状況の共有
- 🔍 カフェの検索機能
- 📱 レスポンシブデザイン

## 技術スタック

- **フロントエンド**
  - Next.js 15.2.4
  - React 19.0.0
  - TailwindCSS
  - @headlessui/react
  - @heroicons/react

- **地図機能**
  - @react-google-maps/api

- **通知機能**
  - react-hot-toast

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/kudokairi/cafe-crowd.git
cd cafe-crowd
```

2. 依存関係のインストール
```bash
npm install
# または
yarn install
```

3. 開発サーバーの起動
```bash
npm run dev
# または
yarn dev
```

4. ブラウザで確認
- http://localhost:3000 にアクセス

## ビルド

```bash
npm run build
# または
yarn build
```

## 本番環境での実行

```bash
npm run start
# または
yarn start
```

## ライセンス

MIT License

## 作者

工藤海里 (@kudokairi)
