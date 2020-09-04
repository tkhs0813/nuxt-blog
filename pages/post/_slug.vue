<template>
  <article>
    <h2 class="text-2xl">{{ post.title }}</h2>
    <time class="mt-1 text-sm text-gray-600">{{ formatDate(post.date) }}</time>
    <div class="pb-6 block">
      <fa :icon="faTags" />
      <div v-for="(tag, index) in post.tags" :key="index" class="inline-block">
        <nuxt-link :to="`/tag/${tag}`" class="bg-orange-200 rounded-md p-1">{{
          tag
        }}</nuxt-link>
      </div>
    </div>
    <nuxt-content :document="post" class="prose-sm lg:prose-xl"></nuxt-content>
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
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { faTags } from '@fortawesome/free-solid-svg-icons'

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
      next,
    }
  },
  computed: {
    faTags() {
      return faTags
    },
  },
  methods: {
    formatDate(d: string) {
      const date = new Date(d)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return `${year}-${month}-${day}`
    },
  },
})
</script>
