<template>
<footer class="footer">
  <a
  href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
  target="_blank"
  >
  <img
    :src="$withBase('/by-nc-sa-88x31.png')"
    alt="CC BY-NC-SA"
    width="88"
    height="31"
  >
  </a>
  <beian />
</footer>
</template>

<script>
import Beian from '@theme/components/Beian.vue'

export default {
    components: {
        Beian
    }
}
</script>