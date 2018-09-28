<template>
  <main-article
    :title="title"
    :html-text="htmlText" />
</template>

<script>
import project from './project.md'
import MainArticle from '~/components/MainArticle.vue'

export default {
  layout: 'page',
  components: {MainArticle},
  data () {
    return {
      htmlText: project,
      title: '项目'
    }
  },
  created () {
  }
}
</script>

<style lang="sass">
</style>

