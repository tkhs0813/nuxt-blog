<template>
  <div>
    <!-- <section v-for="post in posts" :key="post.slug">
      <nuxt-link :to="`/post/${post.slug}`" class="block pb-6">
        <h2 class="text-xl">{{ post.title }}</h2>
        <time class="mt-1 text-sm text-gray-600">{{
          formatDate(post.date)
        }}</time>
      </nuxt-link>
    </section> -->
    <div v-for="post in posts" :key="post.slug">
      <Post :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Post from '@/components/Post.vue'

export default Vue.extend({
  components: { Post },
  // @ts-ignore
  async asyncData({ $content }) {
    const posts = await $content('post').sortBy('date', 'desc').fetch()

    return { posts }
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
