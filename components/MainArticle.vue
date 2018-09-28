<template>
  <div id="main-article">
    <h1 class="title">{{ title }}</h1>
    <hr>
    <div v-html="htmlText" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    htmlText: {
      type: String,
      default: ''
    }
  }
}
</script>

