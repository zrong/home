<template>
  <div id="main-article">
    <h1 class="title">关于</h1>
    <hr>
    <article v-html="aboutText" />
    <hr>
    <nav class="level">
      <div class="level-item has-text-centered">
        <figure>
          <figcaption class="heading">Jacky 的微信</figcaption>
          <img
            alt="我的微信"
            src="@/assets/about-wechat-zrongzrong-258.jpg">
        </figure>
      </div>
      <div class="level-item">
        <div>
          <figure>
            <b-icon icon="email" />
            <img
              alt="E-mail"
              src="@/assets/about-email.png">
          </figure>
          <figure>
            <b-icon icon="github-circle" />
            <a
              href="https://github.com/zrong/"
              target="_blank">
              github.com/zrong
            </a>
          </figure>
          <figure>
            <b-icon icon="library-books" />
            <a
              href="https://blog.zengrong.net"
              target="_blank">
              zrong's blog
            </a>
          </figure>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <figure>
          <figcaption class="heading">公众号：曾嵘胡扯的地方</figcaption>
          <img
            alt="公众号：曾嵘胡扯的地方"
            src="@/assets/about-mp-zrong-net-258.jpg">
        </figure>
      </div>
    </nav>
  </div>
</template>

<script>
import text from './index.md'

export default {
  layout: 'page',
  data () {
    return {
      aboutText: text
    }
  }
}
</script>

<style lang="sass">
</style>

