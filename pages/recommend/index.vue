<template>
  <main-article
    :title="title"
    :html-text="htmlText"/>
</template>

<script>
import text from './index.md'
import MainArticle from '~/components/MainArticle.vue'

export default {
  layout: 'page',
  components: {MainArticle},
  data () {
    return {
      htmlText: text,
      title: '推荐'
    }
  },
  created () {
  }
}
</script>

<style lang="sass">
</style>

