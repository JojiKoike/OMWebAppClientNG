# OMWebAppClientNG

![demo](https://user-images.githubusercontent.com/5671422/77404044-74f6ca80-6df4-11ea-908e-ea11f079ee04.gif)

## 本ドキュメントの目的

動作環境、構成、アプリケーション起動手順、開発環境構築手順を示す。

## 動作環境

* OS: Windows10, MacOSX
* JavaScript処理系：Node.js LTS最新版

## 主なフレームワーク、ツール、ライブラリ

* SPA Framework : Angular 7.0.0
* CSSプリプロセッサ：SASS
* UIコンポーネントライブラリ：PRIME NG 7.0.0
* チャートライブラリ：D3.js 5.7.0

## 前提条件

* Node.js LTS最新版がセットアップ済みであること
* [OMWebAppEngine](https://github.com/JojiKoike/OMWebAppEngine)がセットアップ済み、起動している事

## 稼働開始手順

1. Angular CLIのセットアップ <br/>
`npm -g install @angular/cli@7.0.3`

2. ソースコードクローン <br/>
`git https://github.com/JojiKoike/OMWebAppClientNG.git`

3. 依存パッケージインストール <br/>
`npm install`

4. ビルド＆起動 <br/>
`ng serve --open`

## ディレクトリ構成

OMWebAppClientNG/<br/>
　　　└src/ <br/>
　　　　└app/ <br/>
　　　　　├core/: アプリケーションコアモジュール群 <br/>
　　　　　│　├services/: 外部サービスアクセスモジュール群 <br/>
　　　　　│　└store/: 状態管理モジュール群 <br/>
　　　　　│　　　├actions/: Action定義群 <br/>
　　　　　│　　　├effects/: Effect定義群 <br/>
　　　　　│　　　└reducers/: Reducer定義群 <br/>
　　　　　├feature-modules/: 各機能モジュール群 <br/>
　　　　　│　　　└enctemp/: 密閉筐体温度計算機能モジュール <br/>
　　　　　│　　　　　├components/: UIコンポーネント定義群 <br/>
　　　　　│　　　　　│　　├container/: コンテナコンポーネント定義 <br/>
　　　　　│　　　　　│　　├page/: ページ全体のデザイン、レイアウト定義 <br/>
　　　　　│　　　　　│　　└presentational/: UIパーツのデザイン、挙動定義 <br/>
　　　　　│　　　　　├core/: コアロジック群（主にグラフ描画系） <br/>
　　　　　│　　　　　├services/: 外部サービスアクセスモジュール群 <br/>
　　　　　│　　　　　└store/: 状態管理モジュール群 <br/>
　　　　　│　　　　　　　├actions/: Action定義群 <br/>
　　　　　│　　　　　　　├effects/: Effect定義群 <br/>
　　　　　│　　　　　　　└reducers/: Reducer定義群 <br/>
　　　　　└shared/: 共有モジュール群 <br/>
　　　　　　　├components/: 共有コンポーネント定義 <br/>
　　　　　　　├pipes/: 共有Pipe定義 <br/>
　　　　　　　└validators/: 共有Validator定義

## 作者

Joji KOIKE

## ライセンス

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
