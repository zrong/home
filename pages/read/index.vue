<template>
  <div id="main-article">
    <h1 class="title">阅读</h1>
    <hr>
    <article
      v-for="rt in readingList"
      :key="rt.title"
      class="media">
      <div class="media-left">
        <h3 class="media-left title is-3">{{ rt.title }} </h3>
      </div>
      <div class="media-content">
        <h5 class="subtitle is-5">
          预定计划： {{ rt.plan }} 本
        </h5>
        <div
          v-if="rt.show"
          class="content" 
          v-html="rt.text" />
      </div>
      <b-switch
        v-model="rt.show"
        type="is-info"
        class="media-right">
        详细列表
      </b-switch>
      <hr>
    </article>
  </div>
</template>

<script>
import read2015 from './2015.md'
import read2016 from './2016.md'
import read2017 from './2017.md'
import read2018 from './2018.md'

export default {
  layout: 'page',
  data () {
    return {
      readingList: [
        {title: 2018, plan: 30, text: read2018, show: true},
        {title: 2017, plan: 30, text: read2017, show: false},
        {title: 2016, plan: 40, text: read2016, show: false},
        {title: 2015, plan: 30, text: read2015, show: false}
      ]
    }
  },
  created () {
  }
}
</script>
