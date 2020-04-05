<template>
  <div>
    <top-menu pos="top" />
    <hr class="top-menu-hr">
    <nuxt />
    <footer class="footer">
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
        target="_blank"
      >
        <img
          src="~assets/by-nc-sa-88x31.png"
          alt="CC BY-NC-SA"
          width="88"
          height="31"
        >
      </a>
      <div class="is-size-7">
        鄂ICP备05002429号
      </div>
    </footer>
  </div>
</template>

<script>
import TopMenu from '~/components/TopMenu2.vue'

export default {
  components: {TopMenu}
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"
@import "~bulma/sass/base/_all"
@import "~bulma/sass/layout/footer"
@import "~bulma/sass/elements/title"
@import "~bulma/sass/elements/table"
@import "~bulma/sass/components/navbar"

@import "~assets/main"

html
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
  background-color: whitesmoke

*, *:before, *:after
  box-sizing: border-box
  margin: 0

footer
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

</style>
