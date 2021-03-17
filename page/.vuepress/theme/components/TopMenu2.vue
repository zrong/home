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
        v-for="menu in $site.themeConfig.nav"
        :key="menu.name"
        tag="a"
        :href="menu.path"
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
import Avatar from '@theme/components/Avatar.vue'

export default {
  components: {Avatar},
  props: {pos: {type: String, default: 'top'}},
  data () {
    return {
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
