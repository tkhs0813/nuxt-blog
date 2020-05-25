<template>
  <div>
    <nuxt-link to="/">Home</nuxt-link>
    <h2>Blog</h2>
    <div v-for="post in posts" :key="post.slug">
      {{ formatDate(post.date) }}:
      <nuxt-link :to="`/post/${post.slug}`">{{ post.title }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // @ts-ignore
  async asyncData({ $content }) {
    const posts = await $content('post')
      .sortBy('date', 'desc')
      .fetch()

    return { posts }
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

<style></style>
