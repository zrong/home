<template>
  <nav
    :class="navbarClass"
    class="navbar"
    role="navigation">
    <div
      :class="brandClass"
      class="navbar-brand">
      <div class="page-title-left">
        <avatar
          v-if="pos === 'top'"
          size="small" />
        <a
          v-if="pos === 'top'"
          href="/">ZRONG's HOME</a>
      </div>
      <button
        :class="{'is-active': showMenus}"
        class="navbar-burger"
        @click="onBurgerClick">
        <span />
        <span />
        <span />
      </button>
    </div>
    <ul
      :class="{'is-active': showMenus}"
      class="navbar-menu">
      <li
        v-for="menu in menus"
        :key="menu.name"
        class="navbar-item is-hoverable">
        <nuxt-link :to="menu.path">{{ menu.name }}</nuxt-link>
      </li>
      <li
        class="navbar-item">
        <a
          target="_blank"
          href="https://blog.zengrong.net">
          BLOG
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Avatar from '~/components/Avatar.vue'

export default {
  components: {Avatar},
  props: {pos: {type: String, default: 'top'}},
  data () {
    return {
      menus: [
        {name: '阅读', path: '/read'},
        {name: '项目', path: '/project'},
        {name: '推荐', path: '/recommend'},
        {name: '关于', path: '/about'}
      ],
      showMenus: false
    }
  },
  computed: {
    navbarClass () {
      if (this.pos === 'bottom') {
        return ['is-fixed-bottom', 'has-navbar-fixed-bottom']
      }
      return ['is-fixed-top', 'has-navbar-fixed-top']
    },
    brandClass () {
      if (this.pos === 'bottom') {
        return []
      }
      return ['page-title']
    }
  },
  methods: {
    onBurgerClick (evt) {
      this.showMenus = !this.showMenus
      this.$emit('burgerClick', this.showMenus)
    }
  }
}
</script>

<style lang="sass">
</style>
