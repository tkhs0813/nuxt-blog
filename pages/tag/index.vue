<template>
  <div>
    <div v-for="(tag, index) in tags" :key="index" class="mb-3">
      <nuxt-link :to="`/tag/${tag}`" class="bg-orange-200 rounded-md p-1">{{
        tag
      }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // @ts-ignore
  async asyncData({ $content }) {
    // 全postからタグを抜き出す
    const tmpTags = await $content('post').only(['tags']).fetch()

    let tmp: string[] = []
    for (let i = 0; i < tmpTags.length; i++) {
      tmp = [...tmp, ...tmpTags[i].tags]
    }

    // 重複削除
    const tags = Array.from(new Set(tmp))
    // アルファベット順にソート
    tags.sort()

    return { tags }
  },
})
</script>
