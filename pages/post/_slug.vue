<template>
  <div>
    <nuxt-link to="/post">post</nuxt-link>
    <h2>{{ post.title }}</h2>
    <div>{{ post.tags }}</div>
    <div>{{ post.date }}</div>
    <nuxt-content :document="post"></nuxt-content>
    <nuxt-link v-if="prev" :to="`/post/${prev.slug}`">
      prev: {{ prev.title }}
    </nuxt-link>
    <nuxt-link v-if="next" :to="`/post/${next.slug}`">
      next: {{ next.title }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
  }
})
</script>

<style></style>
