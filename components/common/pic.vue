<template>
  <div @click="click">
    <div class="imgbox">
      <img
        v-lazy="item.picUrl"
        :src="require('~/assets/img/player-bar.png')"
        :alt="item.name"
      />
    </div>
    <p class="songinfo">{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Pic',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    click() {
      this.$emit('click', this.item)
    }
  }
}
</script>
<style lang="less" scoped>
.imgbox {
  width: 140px;
  height: 140px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.songinfo {
  margin: 8px 0 3px;
  font-size: 14px;
  color: #000;
}
</style>
