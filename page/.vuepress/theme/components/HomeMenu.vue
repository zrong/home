<template>
  <ul id="homemenu">
    <li
      v-for="menu in $site.themeConfig.nav"
      :key="menu.name"
    >
      <a :href="menu.path">{{ menu.name }}</a>
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
export default {
  data () {
    return {
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