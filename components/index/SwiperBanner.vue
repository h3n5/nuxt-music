<template>
  <div class="swiperbox" :style="bgStyle">
    <div
      ref="swiper"
      v-swiper="swiperOption"
      class="swiperbox__content"
      @slideChange="slide"
    >
      <div class="swiper-wrapper">
        <div
          v-for="banner in banners"
          :key="banner.picUrl"
          class="swiper-slide"
          @click="jump(banner)"
        >
          <img :src="banner.picUrl" alt="banner" />
        </div>
      </div>
      <div slot="button-prev" class="swiper-button-prev"></div>
      <div slot="button-next" class="swiper-button-next"></div>
      <div slot="pagination" class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwiperBanner',
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      index: 0,
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    bgStyle() {
      return {
        backgroundImage: `url(${this.banners[this.index].backgroundUrl})`
      }
    }
  },
  methods: {
    slide() {
      this.index = this.$refs.swiper.swiper.realIndex
    },
    jump(v) {
      if (~~v.targetId) {
      } else {
        window.open(v.url, '_blank')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.swiperbox {
  background-repeat: repeat-x;
  .swiperbox__content {
    margin: 0 auto;
    width: 982px;
    height: 336px;
    .swiper-slide {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
