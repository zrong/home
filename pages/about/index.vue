<template>
  <div>
    <main-article
      :title="title"
      :html-text="htmlText" />
    <img
      alt="Jacky的微信"
      src="~assets/wechat-zrongzrong-258.jpg">
  </div>
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
      title: '关于'
    }
  },
  created () {
  }
}
</script>

<style lang="sass">
</style>

