<template>
  <div class="lyric">
    <div :class="{ isFlat: isFlat }" class="lyric__list">
      <p v-for="(item, index) in list" :key="index">{{ item }}</p>
    </div>
    <div class="expand">
      <span @click="isFlat = !isFlat">
        {{ isFlat ? '展开' : '收起' }}
        <i class="unicon" :class="{ up: !isFlat, down: isFlat }"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lyric',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isFlat: true
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.lyric {
  margin: 10px 0 18px 52px;
  color: #666;
  line-height: 23px;
  word-wrap: break-word;
  word-break: break-all;
  .lyric__list {
    color: #666;
    line-height: 23px;
    p:first-child {
      color: #0c73c2;
    }
  }
  .isFlat {
    max-height: 90px;
    overflow: hidden;
  }
  .expand {
    margin-top: 5px;
    .unicon {
      width: 11px;
      height: 8px;
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
      background: url('~assets/img/spirte/icon.png') no-repeat;
    }
    .up {
      background-position: -45px -520px;
    }
    .down {
      background-position: -65px -520px;
    }
  }
}
</style>
