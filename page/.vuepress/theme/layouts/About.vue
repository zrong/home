<template>
  <div>
    <top-menu pos="top" />
    <hr class="top-menu-hr">
    <main id="main-article">
      <h1 class="title">
        关于
      </h1>
      <hr>
      <Content />
      <hr>
      <nav class="level">
        <div class="level-item has-text-centered">
          <figure>
            <figcaption class="heading">
              Jacky 的微信
            </figcaption>
            <img
              alt="我的微信"
              :src="$withBase('/about-wechat-zrongzrong-258.jpg')"
            >
          </figure>
        </div>
        <div class="level-item">
          <div>
            <figure>
              <b-icon icon="email" />
              <img
                alt="E-mail"
                :src="$withBase('/about-email.png')"
              >
            </figure>
            <figure>
              <b-icon icon="github-circle" />
              <a
                href="https://github.com/zrong/"
                target="_blank"
              >
                github.com/zrong
              </a>
            </figure>
            <figure>
              <b-icon icon="library-books" />
              <a
                href="https://blog.zengrong.net"
                target="_blank"
              >
                zrong's blog
              </a>
            </figure>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <figure>
            <figcaption class="heading">
              公众号：曾嵘胡扯的地方
            </figcaption>
            <img
              alt="公众号：曾嵘胡扯的地方"
              :src="$withBase('/about-mp-zrong-net-258.jpg')"
            >
          </figure>
        </div>
      </nav>
    </main>
    <page-footer />
  </div>
</template>

<script>
import TopMenu from '@theme/components/TopMenu2.vue'
import PageFooter from '@theme/components/PageFooter.vue'

export default {
  components: {TopMenu, PageFooter}
}
</script>

<style lang="sass">
@import "@theme/styles/main"
@import "@theme/styles/page"
</style>