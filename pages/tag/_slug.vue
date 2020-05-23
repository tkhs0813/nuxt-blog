<template>
  <div>
    <nuxt-link to="/tag">Tag</nuxt-link>
    <h2>{{ tag }}</h2>
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
  // @ts-ignore
  async asyncData({ $content, params, error }) {
    let posts
    try {
      posts = await $content('post')
        .sortBy('date', 'desc')
        .where({ tags: { $contains: params.slug } })
        .fetch()
    } catch (e) {
      error({ message: 'Post not found' })
    }

    return {
      posts,
      tag: params.slug
    }
  }
})
</script>
