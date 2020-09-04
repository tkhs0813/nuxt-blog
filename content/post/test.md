---
title: Vue.jsでLoading画面作る
date: 2020-01-01
tags:
  - Vue.js
---

こんにちは。  
e5u です。

タイトルのとおりです。  
loading 画面作ったので手順のメモでも残していこうと思います。  
おまけとして、`Vue CLI3`で`GitHub Pages`に公開しようとしたときに躓いた手順もメモっときます。

### 完成品

https://empitsu-s-sandbox.github.io/splash-screen/

### ソース

https://github.com/empitsu-s-sandbox/splash-screen

## 1. Vue のプロジェクト作成

これは何も考えず Vue CLI で行きます。  
Vue CLI とか、node についてとかは他の人の記事参考にセットアップしてみてください。

```
vue create splash-screen
cd splash-screen
npm run serve
```

これで初期画面が表示されれば OK です。

## 2. loading 画面実装

loading 画面のコンポーネント作ります。

ぐるぐるを表示させるだけです。

src/components/loadingScreen.vue

```
<template>
  <div class="splash-screen">
    <div class="wrap">
      <img src="../assets/25.svg" alt="loading-image">
    </div>
  </div>
</template>
<style lang="scss">
.splash-screen {
  background: #4a596a;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
}
.splash-screen > .wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.splash-screen > .wrap > img {
  margin: 30px auto;
  display: block;
  width: 150px;
}
</style>
```

## 3. loading 画面を描写

今回は画面開いて 3 秒間 loading 画面を表示させます。  
さっき作ったコンポーネントを isLoading が true の間だけ表示する感じです。  
今回は無理やり setTimeout で 3 秒後に isLoading を false にしています。

src/App.vue

```
<template>
  <div id="app">
    <loadingScreen v-if="isLoading"></loadingScreen>
    <div>Hello World!</div>
  </div>
</template>

<script>
import loadingScreen from '@/components/loadingScreen.vue';
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
  components: {
    loadingScreen,
  },
};
</script>
```

## 4.【おまけ】GitHub Pages で公開

Vue CLI で作ったプロジェクトを GitHub Pages で公開するときにちょっとだけいじる必要があったのでメモ残す。

こいつを参考にした  
https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd

## 4-1. vue.config.js 作成

ないと思うので作ります。  
`<my-project>`のところは自分のプロジェクト名に置き換えてください。

vue.config.js

```
module.exports = {
  publicPath: ‘<my-project>’
}
```

## 4-2. /dist フォルダを git 管理する

`.gitignore`に`/dist`がどっかしらにあるので削除

## 4-4. ビルド

何もいじってなければ`npm run build`

## 4-3. コミット

```
git add dist && git commit -m "Initial dist subtree commit"

```

## 4-5. gh-pages ブランチに push

```
git subtree push --prefix dist origin gh-pages
```

## 4-6. ghpages の設定をする

他の人がいっぱい記事書いてるので参考にやってみてください。

## 最後に

おしまい。
