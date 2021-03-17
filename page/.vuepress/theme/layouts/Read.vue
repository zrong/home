<template>
<div>
  <top-menu pos="top" />
  <hr class="top-menu-hr">
  <main id="main-article">
    <h1 class="title">
      阅读
    </h1>
    <hr>
    <article
      v-for="rt in readingList"
      :key="rt.title"
      class="media"
    >
      <div class="media-left">
        <h3 class="media-left title is-3">
          {{ rt.title }}
        </h3>
      </div>
      <div class="media-content">
        <b-field grouped group-multiline>
          <div
            v-if="rt.plan"
            class="control"
          >
            <b-taglist attached>
              <b-tag
                type="is-success"
              >
                计划
              </b-tag>
              <b-tag
                type="is-dark"
              >
                {{ rt.plan }} 本
              </b-tag>
            </b-taglist>
          </div>
          <div
            v-if="rt.total"
            class="control"
          >
            <b-taglist attached>
              <b-tag type="is-info">
                总数
              </b-tag>
              <b-tag type="is-dark">
                {{ rt.total }} 本
              </b-tag>
            </b-taglist>
          </div>
          <div
            v-if="rt.listen"
            class="control"
          >
            <b-taglist attached>
              <b-tag type="is-info">
                听
              </b-tag>
              <b-tag type="is-dark">
                {{ rt.listen }} 本
              </b-tag>
            </b-taglist>
          </div>
          <div
            v-if="rt.read"
            class="control"
          >
            <b-taglist attached>
              <b-tag type="is-info">
                读
              </b-tag>
              <b-tag type="is-dark">
                {{ rt.read }} 本
              </b-tag>
            </b-taglist>
          </div>
          <div
            v-if="rt.intensive"
            class="control"
          >
            <b-taglist attached>
              <b-tag type="is-info">
                精读
              </b-tag>
              <b-tag type="is-dark">
                {{ rt.intensive }} 本
              </b-tag>
            </b-taglist>
          </div>
          <div
            v-if="rt.note"
            class="control"
          >
            <b-taglist attached>
              <b-tag type="is-warning">
                笔记
              </b-tag>
              <b-tag type="is-dark">
                {{ rt.note }} 篇
              </b-tag>
            </b-taglist>
          </div>
        </b-field>
        <!-- eslint-disable-next-line vue/no-v-html vue/max-attributes-per-line -->
        <a :href="$withBase(`${rt.title}.html`)">详情</a>
        <!-- <div v-if="rt.show" class="content" v-html="rt.text" /> -->
      </div>
      <hr>
    </article>
  </main>
  <page-footer />
</div>
</template>

<script>
import TopMenu from '@theme/components/TopMenu2.vue'
import PageFooter from '@theme/components/PageFooter.vue'

export default {
  components: {TopMenu, PageFooter},
  data () {
    return {
      readingList: [
        {title: 2020, plan: 200, total: 191, intensive: 7, listen: 171, read:13, note: 16},
        {title: 2019, total: 386, note: 0},
        {title: 2018, total: 198, note: 6},
        {title: 2017, total: 25, note: 1},
        {title: 2016, total: 43, note: 3},
        {title: 2015, total: 32, note: 5}
      ]
    }
  },
  created () {
  }
}
</script>

<style lang="sass">
@import "@theme/styles/main"
@import "@theme/styles/page"
</style>