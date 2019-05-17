<template>
  <div class="wrap">
    <div class="left">
      <div class="list__info">
        <div class="cover">
          <img
            v-lazy="playlist.coverImgUrl"
            :src="require('@/assets/img/player-bar.png')"
            :alt="playlist.name"
            class="all100"
          />
        </div>
        <div class="list__content">
          <div class="title"></div>
        </div>
      </div>
      <!-- 列表 -->
    </div>
    <div class="right">
      <Button type="primary">Primary</Button>
    </div>
  </div>
</template>

<script>
import { playlistDetail } from '@/api/api'
export default {
  name: 'Playlist',
  data() {
    return {}
  },
  async asyncData({ params }) {
    const { playlist } = await playlistDetail({ id: params.id })
    return { playlist }
  },

  methods: {}
}
</script>
<style lang="less" scoped>
.wrap {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  display: flex;
  flex-flow: row nowrap;
  .left {
    flex: 1;
    padding: 47px 30px 40px 39px;
    .list__info {
      display: flex;
      flex-flow: row nowrap;
      .cover {
        height: 196px;
        width: 196px;
        margin-right: 10px;
      }
    }
  }
}
</style>
