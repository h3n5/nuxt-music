<template>
  <Table :columns="columns" :data="cloneList" class="nohead">
    <template slot="name" slot-scope="{ row }">
      <Icon type="ios-play" size="18" />
      <span class="index">{{ row.name }}</span>
      <div class="btn__group">
        <Icon type="md-add" size="18" />
        <Icon type="ios-share-alt" size="18" />
      </div>
    </template>
    <template slot="artists" slot-scope="{ row }">
      <span>{{ row.artists[0].name }}</span>
    </template>
    <template slot="album" slot-scope="{ row }">
      <span>{{ row.album.name }}</span>
    </template>
    <template slot="duration" slot-scope="{ row }">
      <span>{{ format(row.duration) }}</span>
    </template>
  </Table>
</template>

<script>
import lyric from './lyric'
export default {
  name: 'Lyric',
  components: {
    // eslint-disable-next-line
    lyric
  },
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
          title: '#',
          type: 'expand',
          render(h, { row }) {
            return h(lyric, { props: { list: row.lyrics.txt.split(/\n/g) } })
          }
        },
        {
          title: '歌曲',
          slot: 'name',
          width: 400
        },
        {
          title: '作者',
          slot: 'artists'
        },
        {
          title: '专辑',
          slot: 'album'
        },
        {
          title: '时长',
          slot: 'duration'
        }
      ]
    }
  },
  computed: {
    cloneList() {
      return this.list.map(v => {
        v._expanded = true
        return v
      })
    }
  },
  methods: {
    format(s) {
      const temp = ~~(s / 1000)
      return (
        (~~(temp / 60) < 10 ? '0' + ~~(temp / 60) : ~~(temp / 60) < 10) +
        ':' +
        (~~(temp % 60) < 10 ? '0' + ~~(temp % 60) : ~~(temp % 60))
      )
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
