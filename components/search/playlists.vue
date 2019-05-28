<template>
  <Table :columns="columns" :data="list" class="nohead">
    <template slot="play" slot-scope="{ row }">
      <Icon type="ios-play" size="18" @click="play(row)" />
    </template>
    <template slot="cover" slot-scope="{ row }">
      <div class="cover">
        <img :src="row.coverImgUrl" :alt="row.name" class="all100" />
      </div>
    </template>
    <template slot="name" slot-scope="{ row }">
      <span>{{ row.name }}</span>
      <div class="btn__group">
        <Icon type="md-add" size="18" />
        <Icon type="ios-share-alt" size="18" />
      </div>
    </template>
    <template slot="track" slot-scope="{ row }">
      <span>{{ row.trackCount }}首</span>
    </template>
    <template slot="creator" slot-scope="{ row }">
      <span>{{ row.creator.name }}</span>
    </template>
    <template slot="bookCount" slot-scope="{ row }">
      <span>收藏：{{ row.bookCount }}</span>
    </template>
    <template slot="playCount" slot-scope="{ row }">
      <span>收听：{{ row.playCount }}</span>
    </template>
  </Table>
</template>

<script>
export default {
  name: 'Playlists',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {
          title: 'cover',
          slot: 'play',
          width: 50
        },
        {
          title: 'cover',
          slot: 'cover'
        },
        {
          title: '歌曲',
          slot: 'name',
          width: 400
        },
        {
          title: '专辑',
          slot: 'track'
        },
        {
          title: '时长',
          slot: 'creator'
        },
        {
          title: '作者',
          slot: 'bookCount'
        },
        {
          title: '专辑',
          slot: 'playCount'
        }
      ]
    }
  },

  methods: {
    play(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="less">
.nohead {
  .ivu-table-header {
    display: none;
  }
}
.ivu-table-row-hover {
  .btn__group {
    visibility: visible;
  }
}
.btn__group {
  float: right;
  visibility: hidden;
  i {
    margin-right: 5px;
  }
}
</style>
<style lang="less" scoped>
.cover {
  width: 50px;
  height: 50px;
  margin: 10px 0;
  border: 1px solid #eee;
  box-sizing: content-box;
}
</style>
