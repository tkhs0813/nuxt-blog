<template>
  <div>
    <div>{{ post.title }}</div>
    <div>{{ post.tags }}</div>
    <div>{{ post.date }}</div>
    <div v-html="$md.render(post.bodyContent)"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getFileNames, getPostData } from '../../lib/posts'

export default Vue.extend({
  validate({ params }) {
    const fileNames = getFileNames()
    const fileName = `output/${params.id}.json`
    return fileNames.includes(fileName)
  },
  async asyncData({ params }) {
    const post = await getPostData(params.id)
    return {
      post
    }
  }
})
</script>

<style></style>
