<template>
  <ul id="homemenu">
    <li
      v-for="menu in menus"
      :key="menu.name"
    >
      <nuxt-link :to="menu.path">
        {{ menu.name }}
      </nuxt-link>
    </li>
    <li>
      <a
        target="_blank"
        href="https://blog.zengrong.net"
      >
        BLOG
      </a>
    </li>
  </ul>
</template>

<script>
import config from '~/config.js'

export default {
  data () {
    return {
      menus: config.MENUS
    }
  }
}
</script>

<style lang="sass" scoped>

#homemenu
  margin-top: 20px
  li 
    padding: 3px
  a
    font-size: 16px
    color: rgb(74, 74, 74)
  a:hover
    color: rgb(50, 115, 220)

</style>