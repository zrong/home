<template>
<div>
  <top-menu pos="top" />
  <hr class="top-menu-hr">
  <main id="main-article">
    <h1 class="title"> {{ $page.title }} </h1>
    <hr>
    <section class="content">
      <Content />
    </section>
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