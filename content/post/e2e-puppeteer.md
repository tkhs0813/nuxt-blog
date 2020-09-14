---
title: Puppeteerを使ってE2Eテストを始める
date: 2020-09-13
tags:
  - Puppeteer
---

# E2E テストとは

End to End テストの略語で、システム全体を通して行うテストのことです。  
例えば、Web アプリで E2E テストを行う場合、実際にサーバー、ブラウザを立ち上げた状態でブラウザの操作をしながらテストをします。

## E2E テストのメリット

- 実際に動作するシステムと(ほぼ)同じ状態でテストできる

## E2E テストのデメリット

- 手動でテストをすると内容にばらつきが出る
- 実行に時間がかかる
- 簡単な修正でもテストが動作しなくなるため保守コストがかかる

E2E テストをするうえで、保守コストはかなりかかってくるので、重要な箇所に絞るや、テスト実行を自動化する等の工夫が必要になってきます。

# Puppeteer とは

Puppeteer(パペティア)とは、プログラムから Chromium を操作するための Node.js ライブラリです。  
Google Chrome の開発チームによって開発されています。  
Puppeteer をインストールすると、Chromium が一緒にインストールされるため、インストールするだけで簡単に使い始めることができます。

例えば、以下のことが行えます。

- 画面キャプチャ
- SPA,SSR のクローリング
- UI テスト、キーボード操作などの自動化
- Web サイトのパフォーマンスチェック

そのため、手動で行っている E2E テストを自動化することができます。

# Puppeteer をつかった E2E テスト

## 前提条件

以下の環境で動作確認済みです。
Jest というテストツールを組み合わせてブラウザの挙動をテストします。

- Node.js: 12.16.1
- Puppeteer: ああ
- Jest:

## テスト用のサイト

https://www.google.com/ を利用します。

## デザインパターン

[Page Objects Pattern](https://github.com/SeleniumHQ/selenium/wiki/PageObjects)にします。

## 動かす

まずはプロジェクトを作成します。

```
mkdir puppeteer-e2e-sample && cd puppeteer-e2e-sample
npm init -y
```

必要なライブラリをインストールします。

```
npm install --save-dev jest-puppeteer puppeteer jest
```

必要なファイルを作成します。

- `main.js`: テストを実行するファイル
- `jest.config.js`: jest の設定を記載するファイル
- `peges/GooglePage.js`: google.com に対する操作を記述するファイル

```
mkdir pages
touch main.spec.js jest.config.js pages/GooglePage.js
```

jest.config.js に以下をコピペします。
jest と puppeteer をつなぐためのプリセットを設定しています。

```
module.exports = {
  preset: "jest-puppeteer",
};
```

次に page/GooglePage.js に以下をコピペします。
Google.com に関する操作を記載しています。

```
const puppeteer = require("puppeteer");

class GooglePage {
  constructor(browser, page) {
    this.browser = browser;
    this.page = page;
  }
  async open() {
    if (this.page == undefined) {
      this.page = await this.browser.newPage();
    }
    await this.page.goto("https://www.google.com/");
  }

  async typeSearchWord(word) {
    this.word = word;
    await this.page.type('input[name="q"]', this.word);
  }

  async submit() {
    await this.page.evaluate(() => {
      document.querySelector('input[name="btnK"]').click();
    });
    await this.page.waitForSelector("div.r a");
  }

  async title() {
    return await this.page.title();
  }

  async result() {
    return await this.page.$$("div.g");
  }

  async close() {
    await this.page.close();
  }
}

module.exports = GooglePage;
```

次に、main.spec.js に以下をコピペします。
タイトルが「Google」であること、「puppeteer」で検索し検索結果が 10 件であること、の 2 つのテストを行っています。

```
const puppeteer = require("puppeteer");
const GooglePage = require("./pages/GooglePage");

describe("puppeteer test", function () {
  jest.setTimeout(30000);
  beforeAll(function (done) {
    puppeteer
      .launch({
        headless: false,
        timeout: 200000,
      })
      .then(function (browser) {
        global.browser = browser;
        done();
      });
  });

  afterAll(function () {
    browser.close();
  });

  // タイトルが「Google」であることを確認している
  it('should be titled "Google"', async () => {
    const g = new GooglePage(browser);
    await g.open();
    const title = await g.title();
    await expect(title).toMatch("Google");
  });

  // 「puppeteer」で検索し、検索結果が10件表示されることを確認している
  it("search google.", async function () {
    const g = new GooglePage(browser);
    await g.open();
    await g.typeSearchWord("puppeteer");
    await g.submit();
    const links = await g.result();
    await expect(links.length).toBe(10);
    await g.close();
  });
});
```

次に、package.json に以下をコピペします。
npm scripts を追加しています。

```
{
  "name": "puppeteer-e2e-sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test:e2e": "jest"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^26.4.2",
    "jest-puppeteer": "^4.4.0",
    "puppeteer": "^5.3.0"
  }
}
```

最後に、テストを実行します。

```
npm run test:e2e
```

テスト 2 件成功したら完了です。

お疲れさまでした。
