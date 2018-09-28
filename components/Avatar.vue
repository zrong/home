<template>
  <img
    :class="avatarCls"
    src="https://file.zengrong.net/blog/jacky_icon_120x120.jpg"
    class="avatar"
    @click="onAvatarClick">
</template>

<script>
export default {
  props: {size: {type: String, default: 'small'}},
  data () {
  return {
      
    }
  },
  computed: {
    avatarCls() {
      if (this.size === 'small') {
        return ['avatar-small']
      }
      return []
    }
  },
  methods: {
    onAvatarClick (evt) {
      if (this.size === 'small') {
        location = '/'
      }
    }
  }
}
</script>