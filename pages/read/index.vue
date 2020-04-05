<template>
  <div id="main-article">
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
        <b-field grouped>
          <div
            v-if="rt.plan"
            class="control"
          >
            <b-taglist attached>
              <b-tag
                type="is-info"
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
            v-if="rt.read"
            class="control"
          >
            <b-taglist attached>
              <b-tag type="is-info">
                已读
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
        <div v-if="rt.show" class="content" v-html="rt.text" />
      </div>
      <b-switch
        v-model="rt.show"
        type="is-info"
        class="media-right"
      >
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
import read2019 from './2019.md'
import read2020 from './2020.md'

export default {
  layout: 'page',
  data () {
    return {
      readingList: [
        {title: 2020, plan: 200, intensive: 20, read:59, note: 6, text: read2020, show: true},
        {title: 2019, read: 386, note: 0, text: read2019, show: false},
        {title: 2018, read: 198, note: 6, text: read2018, show: false},
        {title: 2017, read: 25, note: 1, text: read2017, show: false},
        {title: 2016, read: 43, note: 3, text: read2016, show: false},
        {title: 2015, read: 32, note: 5, text: read2015, show: false}
      ]
    }
  },
  created () {
  }
}
</script>
