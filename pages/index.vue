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
import Avatar from '~/components/Avatar.vue'
import HomeMenu from '~/components/HomeMenu.vue'

export default {
  layout: 'home',
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
@import "~bulma/sass/utilities/_all"
@import "~bulma/sass/base/_all"
@import "~bulma/sass/layout/_all"
@import "~bulma/sass/components/navbar"

@import "~assets/main"

#index-header-title
  font-weight: 800
  font-size: 2.5rem
  color: #34495e
  text-shadow: 2px 2px rgb(127, 140, 141)

#beian
  margin-top: -10px

</style>
