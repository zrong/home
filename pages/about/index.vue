<template>
  <div>
    <main-article
      :title="title"
      :html-text="htmlText" />
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Jacky的微信</p>
          <img
            alt="我的微信"
            src="~assets/about-wechat-zrongzrong-258.jpg">
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">公众号：曾嵘胡扯的地方</p>
          <img
            alt="公众号：曾嵘胡扯的地方"
            src="~assets/about-mp-zrong-net-258.jpg">
        </div>
      </div>
    </nav>
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

