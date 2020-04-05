<template>
  <b-navbar
    close-on-click
    spaced
    transparent
    :fixed-top="isNotHome"
    mobile-burger
  >
    <template slot="brand">
      <div
        v-if="isNotHome"
        class="page-title-left"
      >
        <avatar size="small" />
        <a href="/">ZRONG's HOME</a>
      </div>
    </template>
    <template slot="start">
      <b-navbar-item
        v-for="menu in menus"
        :key="menu.name"
        tag="nuxt-link"
        :to="menu.path"
      >
        {{ menu.name }}
      </b-navbar-item>
      <b-navbar-item
        tag="a"
        href="https://blog.zengrong.net"
      >
        BLOG
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
import config from '~/config.js'

export default {
  components: {Avatar},
  props: {pos: {type: String, default: 'top'}},
  data () {
    return {
      menus: config.MENUS
    }
  },
  computed: {
    isNotHome () {
      return this.pos === 'top'
    }
  },
  methods: {
  }
}
</script>

<style lang="sass">
</style>
