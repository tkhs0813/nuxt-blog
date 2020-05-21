<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <nuxt-link :to="`/posts/${post.id}`">{{ post.title }}</nuxt-link>
      <div>{{ post.date }}</div>
      <div>{{ post.tags }}</div>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { getSortedPostsData } from '../../lib/posts'

export default Vue.extend({
  async asyncData() {
    const posts = await getSortedPostsData()
    return {
      posts
    }
  }
})
</script>

<style></style>
