<template>
  <main-article
    :html-text="readText"
    title="阅读" />
</template>

<script>
import text from './index.md'
import MainArticle from '~/components/MainArticle.vue'

export default {
  layout: 'page',
  components: {MainArticle},
  data () {
    return {
      readText: text,
      title: '阅读'
    }
  },
  created () {
  }
}
</script>

<style lang="sass">
</style>

