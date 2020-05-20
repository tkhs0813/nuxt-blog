<template>
  <div>
    <div>{{ post.title}}</div>
    <div>{{ post.tags }}</div>
    <div>{{ post.date }}</div>
    <div v-html="post.bodyContent"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getPostData } from '../../lib/posts'

export default Vue.extend({
  async asyncData({params}) {
    const post = await getPostData(params.id)
    return {
      post
    }
  }
})
</script>

<style></style>
