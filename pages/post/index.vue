<template>
  <div>
    <nuxt-link to="/">Home</nuxt-link>
    <h2>Blog</h2>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <nuxt-link :to="`/post/${post.slug}`">{{ post.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const posts = await $content('post')
      .sortBy('date', 'desc')
      .fetch()

    return { posts }
  }
})
</script>

<style></style>
