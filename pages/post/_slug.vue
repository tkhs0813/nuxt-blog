<template>
  <div>
    <nuxt-link to="/post">post</nuxt-link>
    <h2>{{ post.title }}</h2>
    <div>{{ formatDate(post.date) }}</div>
    <div class="tag-list">
      <div v-for="(tag, index) in post.tags" :key="index">
        <div class="tag-item">
          <nuxt-link :to="`/tag/${tag}`">{{ tag }}</nuxt-link> /
        </div>
      </div>
    </div>
    <nuxt-content :document="post"></nuxt-content>
    <div v-if="prev" class="prev-area">
      prev:
      <nuxt-link :to="`/post/${prev.slug}`">
        {{ prev.title }}
      </nuxt-link>
    </div>
    <div v-if="next" class="next-area">
      next:
      <nuxt-link :to="`/post/${next.slug}`">
        {{ next.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // @ts-ignore
  async asyncData({ $content, params, error }) {
    let post
    try {
      post = await $content('post', params.slug).fetch()
    } catch (e) {
      error({ message: 'Post not found' })
    }

    const [prev, next] = await $content('post')
      .only(['title', 'slug'])
      .sortBy('date', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      post,
      prev,
      next
    }
  },
  methods: {
    formatDate(d: string) {
      const date = new Date(d)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return `${year}-${month}-${day}`
    }
  }
})
</script>

<style scoped>
.tag-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
