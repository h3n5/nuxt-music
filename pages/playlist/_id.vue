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
          <div class="title">
            <i class="icon"></i>
            <div class="tit">{{ playlist.name }}</div>
          </div>
          <div class="creater">
            <div class="tit">
              {{ playlist.creator.nickname }}
              <span class="time">{{
                new Date(playlist.updateTime).toDateString()
              }}</span>
              创建
            </div>
          </div>
          <div class="func">
            <Button type="primary">播放</Button>
            <Button>收藏</Button>
            <Button>下载</Button>
            <Button>评论</Button>
          </div>
          <div class="tags">
            <span class="tit">标签：</span>
            <Tag v-for="(item, index) in playlist.tags" :key="index">{{
              item
            }}</Tag>
          </div>
          <div class="desc">
            <p>{{ desc }}</p>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="table">
        <div class="title">
          <span class="h3">歌曲列表</span>
          <span class="nums">共 {{ playlist.tracks.length }} 首歌</span>
        </div>
        <Table
          :columns="columns"
          :data="playlist.tracks"
          @on-row-click="singleclick"
        >
          <template slot="index" slot-scope="{ row, index }">
            <span class="index">{{ index + 1 }}</span>
            <Icon type="ios-play" size="18" @click.native="play(row)" />
          </template>
          <template slot="time" slot-scope="{ row }">
            <span>{{ format(row.dt) }}</span>
          </template>
          <template slot="ar" slot-scope="{ row }">
            <span>{{ row.ar[0].name }}</span>
          </template>
          <template slot="al" slot-scope="{ row }">
            <span>{{ row.al.name }}</span>
          </template>
        </Table>
      </div>
    </div>
    <div class="right">
      <h3 class="tit">喜欢这个歌单的人</h3>
      <ul class="piclist">
        <li v-for="(item, index) in playlist.subscribers" :key="index">
          <img :src="item.avatarUrl" :alt="item.nickname" class="all100" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { playlistDetail } from '@/api/api'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Playlist',
  head() {
    return {
      title: this.playlist.name
    }
  },
  data() {
    return {
      columns: [
        {
          title: '#',
          width: 120,
          slot: 'index'
        },
        {
          title: '歌曲标题',
          key: 'name'
        },
        {
          title: '时长',
          slot: 'time'
        },
        {
          title: '歌手',
          slot: 'ar'
        },
        {
          title: '专辑',
          slot: 'al'
        }
      ]
    }
  },
  computed: {
    ...mapState(['song']),
    desc() {
      return this.playlist.description.replace(/\\n/gm, '<br/>')
    }
  },
  async asyncData({ params }) {
    const { playlist } = await playlistDetail({ id: params.id })
    return { playlist }
  },
  methods: {
    ...mapActions(['getSong']),
    singleclick(row) {
      this.$router.push({ name: 'song-id', params: { id: row.id } })
    },
    format(s) {
      const temp = ~~(s / 1000)
      return (
        (~~(temp / 60) < 10 ? '0' + ~~(temp / 60) : ~~(temp / 60) < 10) +
        ':' +
        (~~(temp % 60) < 10 ? '0' + ~~(temp % 60) : ~~(temp % 60))
      )
    },
    async play(v) {
      await this.getSong(v.id)
      console.log(this.song.url)
      if (this.song.url) {
        this.$music.setAudio(this.song.url)
      }
    }
  }
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
        height: 220px;
        width: 220px;
        margin-right: 10px;
        flex: 1 0 208px;
      }
    }
    .list__content {
      margin-left: 30px;
      > div {
        margin: 0 0 12px;
      }
      .title {
        .icon {
          width: 54px;
          height: 24px;
          background: url('~assets/img/spirte/icon.png') no-repeat;
          background-position: 0 -243px;
          float: left;
        }
        .tit {
          margin-left: 64px;
          position: relative;
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
      .creater {
        .tit {
          color: #0c73c2;
          font-size: 14px;
          .time {
            font-size: 14px;
            color: #999;
            margin: 0 15px;
          }
        }
      }
      .func {
        button {
          margin-right: 10px;
        }
        .ivu-btn-ghost {
          color: #333;
        }
      }
      .tags {
        .tit {
          color: #666;
        }
      }
      .desc {
        p {
          margin-top: 4px;
          line-height: 18px;
          color: #666;
          word-break: break-word;
        }
      }
    }
    .table {
      margin-top: 27px;
      .index {
        display: inline-block;
        line-height: 18px;
        margin-right: 10px;
        vertical-align: top;
        & + i {
          vertical-align: top;
        }
      }
      .title {
        .h3 {
          font-size: 20px;
          line-height: 28px;
        }
        .nums {
          margin: 9px 0 0 20px;
          color: #666;
        }
      }
    }
  }
  .right {
    width: 270px;
    padding: 20px 40px 40px 30px;
    .tit {
      position: relative;
      *zoom: 1;
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 12px;
    }
    .piclist {
      display: flex;
      flex-flow: row wrap;
      li {
        box-sizing: content-box;
        width: 40px;
        height: 40px;
        padding: 0 0 13px 10px;
      }
    }
  }
}
</style>
