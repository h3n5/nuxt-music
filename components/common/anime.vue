<template>
  <div id="anime"></div>
</template>

<script>
import Anime from './anime.js'

export default {
  name: 'Anime',
  components: {},
  data() {
    return {
      anime: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    this.anime = null
  },
  methods: {
    init() {
      try {
        this.anime = new Anime({
          el: '#anime',
          audio: this.$music.audio,
          bg:
            'https://p2.music.126.net/ZDUo6vF_5ykD6E_08HE1kw==/3385396303317256.jpg'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less">
#anime {
  height: 420px;
  width: 420px;
  position: relative;
  canvas {
    position: absolute;
  }
  #element {
    z-index: 10;
  }
  #element_bg {
    z-index: 11;
  }
}
</style>
