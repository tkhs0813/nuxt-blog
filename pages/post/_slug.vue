<template>
  <div>
    <nuxt-link to="/post">post</nuxt-link>
    <h2>{{ post.title }}</h2>
    <div>{{ post.date }}</div>
    <ul>
      <li v-for="(tag, index) in post.tags" :key="index">
        <nuxt-link :to="`/tag/${tag}`">{{ tag }}</nuxt-link>
      </li>
    </ul>
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
  }
})
</script>

<style></style>
