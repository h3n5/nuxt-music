<template>
  <div class="wrap">
    <div class="left">
      <div class="list__info">
        <div class="cover">
          <img
            v-lazy="songs.al.picUrl"
            :src="require('@/assets/img/player-bar.png')"
            :alt="songs.al.name"
            class="all100"
          />
        </div>
        <div class="list__content">
          <h2 class="title">{{ songs.name }}</h2>
          <p class="singer">
            <span>歌手：</span>
            <span>{{ songs.ar.map(v => v.name).join(' / ') }}</span>
          </p>
          <p class="album">
            <span>所属专辑：</span>
            <span>{{ songs.al.name }}</span>
            <span>{{ songs.al.tns.join(',') }}</span>
          </p>
          <div class="content-operation">
            <button @click="play">播放</button>
            <button></button>
            <button></button>
            <button></button>
          </div>
          <div class="lyric">
            <div class="lrc-content content">
              <div class="lrc-box">
                <div
                  v-for="(item, index) in lyric"
                  :key="index"
                  :class="{ 'lrc-select': item.show }"
                  class="lrc-list"
                >
                  <p>{{ item.txt }}</p>
                  <p v-if="lyricObj.hasCN">{{ item.txtCN }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { getsongDetail, getSongUrl } from '@/api/api'
import { mapState } from 'vuex'
export default {
  name: 'Song',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      lyric: {}
    }
  },
  computed: {
    ...mapState(['lyricObj'])
  },
  watch: {
    lyricObj: {
      handler(v) {
        this.lyric = v.lines
          ? v.lines.map(v => {
              v.show = false
              return v
            })
          : []
      },
      immediate: true
    }
  },
  async asyncData({ params }) {
    const res = await getsongDetail(params.id)
    const { data } = await getSongUrl(params.id)
    return {
      songs: res.data.songs[0],
      url: data.data[0].url
    }
  },
  fetch({ store, params }) {
    store.dispatch('getLrc', params.id)
  },
  methods: {
    play() {
      this.$music.setAudio(this.url)
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
        height: 196px;
        width: 196px;
        margin-right: 10px;
      }
      .list__content {
        flex: 1;
        .title {
          color: rgb(51, 51, 51);
          font-size: 24px;
          font-weight: normal;
        }
        .content-operation {
          margin-bottom: 25px;
        }
        .lyric {
          .lrc-content {
            .lrc-box {
              .lrc-list {
                font-size: 14px;
                padding-bottom: 10px;
                // color: hsla(0, 0%, 100%, 0.6);
              }
              .lrc-select {
                > p {
                  font-size: 16px;
                  color: #ff2d55;
                }
              }
              .lrc-now {
                font-size: 16px;
                // color: #fefefe;
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 271px;
  }
}
</style>
