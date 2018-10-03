<template>
  <div id="main-article">
    <h1 class="title">推荐</h1>
    <hr>
    <section
      v-for="(group, i) in recommendList"
      :key="i"
      class="level">
      <figure
        class="box has-text-centered">
        <span class="icon is-large has-text-info">
          <i :class="group.icon" />
        </span>
        <figcaption class="subtitle is-4 has-text-info">{{ group.title }}</figcaption>
      </figure>
      <figure
        v-for="(item, j) in group.detail"
        :key="j"
        class="level-item">
        <b-icon
          :icon="item.icon"
          class="is-large" />
        <figcaption>
          <a
            v-if="item.url"
            :href="item.url"
            target="_blank"
            class="subtitle is-5">
            {{ item.name }}
            <b-icon icon="link-variant"/>
          </a>
        </figcaption>
      </figure>
    </section>
  </div>
</template>

<script>

const ARTICLE = [
  {
    name: '选择系列',
    url: 'https://blog.zengrong.net/tag/choice/',
    icon: 'gesture-tap'
  },
  {
    name: '管理系列',
    url: 'https://blog.zengrong.net/tag/management/',
    icon: 'human-male-male'
  },
  {
    name: '读书笔记',
    url: 'https://blog.zengrong.net/tag/reading/',
    icon: 'book-open-page-variant'
  },
  {
    name: '学习系列',
    url: 'https://blog.zengrong.net/tag/study/',
    icon: 'telescope'
  }
]

export default {
  layout: 'page',
  data () {
    return {
      recommendList: [
        {
          title: '原创文章',
          icon: 'mdi mdi-pen mdi-48px',
          detail: ARTICLE
        }
      ]
    }
 },
}
</script>
