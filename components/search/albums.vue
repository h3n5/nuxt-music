<template>
  <ul class="singers">
    <li v-for="(item, index) in list" :key="index" class="singers__list">
      <div class="cover">
        <img
          v-lazy="item.picUrl"
          :src="require('@/assets/img/player-bar.png')"
          :alt="item.name"
          class="all100"
        />
      </div>
      <p class="info">
        <a href="" class="name">{{ item.name }}</a>
      </p>
      <p class="info">
        <a href="" class="name">{{ item.artist.name }}</a>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Album',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.singers {
  display: flex;
  flex-flow: row wrap;
  .singers__list {
    box-sizing: border-box;
    width: calc(~'93%/6');
    margin-right: 1.4%;
    padding-bottom: 30px;
    &:nth-child(6n) {
      margin-right: 0;
    }
    .cover {
      // width: 130px;
      height: 139px;
      border: 1px solid #eee;
    }
  }
  .info {
    margin-top: 8px;
    padding: 0 2px;
    .name {
      display: inline-block;
      max-width: 85%;
      vertical-align: middle;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    .icon {
      float: right;
      i {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        width: 17px;
        height: 18px;
        background: url('~assets/img/spirte/icon.png') no-repeat 0 9999px;
        background-position: 0 -740px;
      }
    }
  }
}
</style>
