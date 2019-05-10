<template>
  <div class="tag">
    <nuxt-link to="" class="tag__title">
      {{ title }}
    </nuxt-link>
    <div class="tabs">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="item.link"
        class="tab__link"
        >{{ item.name }}</nuxt-link
      >
    </div>
    <slot name="more">
      <nuxt-link v-if="more" class="more" :to="more.link"
        >更多<i class="arrow"></i
      ></nuxt-link>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    tabs: {
      type: Array,
      default: () => []
    },
    more: {
      type: Object,
      default: null
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>
<style lang="less" scoped>
.tag {
  height: 33px;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
  background: url('~assets/img/spirte/index.png') -225px -156px no-repeat;
  .tag__title {
    float: left;
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
  }
  .tabs {
    float: left;
    margin: 7px 0 0 20px;
    font-size: 12px;
    .tab__link {
      color: #666;
      padding: 0 15px;
      position: relative;
      &::after {
        position: absolute;
        right: 0px;
        top: 0px;
        content: '|';
      }
    }
  }
  .more {
    float: right;
    margin-top: 9px;
    padding-right: 5px;
    .arrow {
      display: inline-block;
      height: 12px;
      width: 12px;
      background: url('~assets/img/spirte/index.png') 0 -240px no-repeat;
    }
  }
}
</style>
