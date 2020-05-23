<template>
  <div>
    <nuxt-link to="/">Home</nuxt-link>
    <h2>Tag</h2>
    <ul>
      <li v-for="(tag, index) in tags" :key="index">
        <nuxt-link :to="`/tag/${tag}`">{{ tag }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // @ts-ignore
  async asyncData({ $content }) {
    // 全postからタグを抜き出す
    const tmpTags = await $content('post')
      .only(['tags'])
      .fetch()

    let tmp: string[] = []
    for (let i = 0; i < tmpTags.length; i++) {
      tmp = [...tmp, ...tmpTags[i].tags]
    }

    // 重複削除
    const tags = Array.from(new Set(tmp))
    // アルファベット順にソート
    tags.sort()

    return { tags }
  }
})
</script>
