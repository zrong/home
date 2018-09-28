<template>
  <div :class="[containerClassName]">
    <header>
      <avatar size="large" />
      <h1 id="index-header-title">ZRONG's HOME</h1>
      <div class="is-size-7">鄂ICP备05002429号</div>
      <top-menu
        ref="topMenu"
        pos="bottom"
        @burgerClick="onBurgerClick"/>
    </header>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
import TopMenu from '~/components/TopMenu.vue'

export default {
  layout: 'home',
  components: {
    Avatar, TopMenu
  },
  data () {
    return {
      containerClassName: 'container-normal'
    }
  },
  methods: {
    onBurgerClick(showMenu) {
      if (showMenu) {
        this.containerClassName = 'container-top'
      } else {
        this.containerClassName = 'container-normal'
      }
    }
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
</style>
