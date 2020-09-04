<template>
  <section>
    <nuxt-link :to="`/post/${post.slug}`" class="block pb-6">
      <h2 class="text-xl">{{ post.title }}</h2>
      <time class="mt-1 text-sm text-gray-600">{{
        formatDate(post.date)
      }}</time>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    post: {},
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
