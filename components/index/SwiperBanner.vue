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
          :key="banner.imageUrl"
          class="swiper-slide"
          @click="jump(banner)"
        >
          <img :src="banner.imageUrl" alt="banner" />
        </div>
      </div>
      <!-- <div slot="button-prev" class="swiper-button-prev"></div>
      <div slot="button-next" class="swiper-button-next"></div> -->
      <div slot="pagination" class="swiper-pagination"></div>
    </div>
    <div class="download">
      <a href="" class="download__link"></a>
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
        }
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
      }
    }
  },
  computed: {
    bgStyle() {
      return {
        // backgroundImage: `url(${this.banners[this.index].imageUrl})`
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
    position: relative;
    .swiper-slide {
      img {
        width: calc(~'100% - 254px');
        height: 100%;
        margin-right: 254px;
      }
    }
  }
  .download {
    position: absolute;
    top: 105px;
    z-index: 20;
    right: 459px;
    z-index: 20;
    width: 254px;
    height: 336px;
    background: url('~assets/img/spirte/download.png') no-repeat 0 0;
    .download__link {
      display: block;
      width: 215px;
      height: 56px;
      margin: 212px 0 0 19px;
      background: url('~assets/img/spirte/download.png') no-repeat 0 0;
      background-position: 0 9999px;
      text-indent: -9999px;
    }
  }
}
</style>
