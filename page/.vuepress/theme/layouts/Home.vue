<template>
  <div class="container-normal">
    <header>
      <avatar size="large" />
      <h1 id="index-header-title">
        ZRONG's HOME
      </h1>
      <div
        id="beian"
        class="is-size-7"
      >
        鄂ICP备05002429号
      </div>
      <home-menu />
    </header>
  </div>
</template>

<script>
import Avatar from '@theme/components/Avatar.vue'
import HomeMenu from '@theme/components/HomeMenu.vue'

export default {
  components: {
    Avatar, HomeMenu
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="sass">

@import "@theme/styles/main"

#index-header-title
  font-weight: 800
  font-size: 2.5rem
  color: #34495e
  text-shadow: 2px 2px rgb(127, 140, 141)

#beian
  margin-top: -10px

html
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*, *:before, *:after
  box-sizing: border-box
  margin: 0
</style>
