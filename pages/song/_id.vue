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
          <div class="title">
            <i class="icon"></i>
            <div class="tit">{{ songs.name }}</div>
          </div>
          <p class="singer">
            <span>歌手：</span>
            <span class="color--blue">{{
              songs.ar.map(v => v.name).join(' / ')
            }}</span>
          </p>
          <p class="album">
            <span>所属专辑：</span>
            <span class="color--blue">{{ songs.al.name }}</span>
            <span class="color--blue">{{ songs.al.tns.join(',') }}</span>
          </p>
          <div class="func">
            <Button type="primary" @click="play">播放</Button>
            <Button>收藏</Button>
            <Button>下载</Button>
            <Button>评论</Button>
            <Button :loading="loading" @click="tryListen">试听</Button>
          </div>
          <div class="anime">
            anime
          </div>
          <div class="lyric">
            <div class="lrc-content content">
              <div ref="lrc" class="lrc-box" :class="{ isFlat: isFlat }">
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
              <div class="ctlr">
                <span @click="isFlat = !isFlat">
                  {{ isFlat ? '展开' : '收起' }}
                  <i class="unicon" :class="{ up: !isFlat, down: isFlat }"></i>
                </span>
              </div>
            </div>
          </div>
          <div id="user-operation" class="lrc-user">
            <p class="link">
              <span>翻译歌词</span>
              <span>报错</span>
            </p>
            <p class="user">
              <span
                >贡献歌词：<span class="color--blue">{{
                  lyricObj.lyricUser
                }}</span></span
              >
              <span
                >贡献翻译：<span class="color--blue">{{
                  lyricObj.transUser
                }}</span></span
              >
            </p>
          </div>
        </div>
      </div>
      <div class="comment__box">
        <div class="comment__title">
          <span class="title--h3">评论</span>
          <span class="num"> 共{{ total }}条评论 </span>
        </div>
        <div class="iptarea"></div>
        <div class="comment_list">
          <div class="list__title">
            精彩评论
          </div>
          <ul class="user">
            <li
              v-for="(item, index) in hotComments"
              :key="index"
              class="user__list"
            >
              <div class="img__cover">
                <img
                  :src="item.user.avatarUrl"
                  :alt="item.user.nickname"
                  class="all100"
                />
              </div>
              <div class="user__list__right">
                <div class="user__comment">
                  <a href="" class="color--blue">
                    {{ item.user.nickname }}：
                  </a>
                  <p class="inline" v-html="item.content"></p>
                </div>
                <div class="user__operate">
                  <span class="user__time">{{ formatDate(item.time) }}</span>
                  <span class="user__cli">
                    <i class="zan"></i>
                    <span>{{ item.likedCount }}</span>
                    <span class="step">|</span>
                    <span class="back">回复</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <br />
          <br />
          <div class="list__title">
            最新评论
          </div>
          <ul class="user">
            <li
              v-for="(item, index) in comments"
              :key="index"
              class="user__list"
            >
              <div class="img__cover">
                <img
                  :src="item.user.avatarUrl"
                  :alt="item.user.nickname"
                  class="all100"
                />
              </div>
              <div class="user__list__right">
                <div class="user__comment">
                  <a href="" class="color--blue">
                    {{ item.user.nickname }}：
                  </a>
                  <p class="inline" v-html="item.content"></p>
                </div>
                <div class="user__operate">
                  <span class="user__time">{{ formatDate(item.time) }}</span>
                  <span class="user__cli">
                    <i class="zan"></i>
                    <span class="step">|</span>
                    <span class="back">回复</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <Page :page-size="20" :total="total" @on-change="pageChange" />
        </div>
      </div>
    </div>
    <div class="right">
      <h3 class="tit">包含这首歌的歌单</h3>
      <ul class="similist">
        <nuxt-link
          v-for="(item, index) in simi"
          :key="index"
          :to="{ name: 'playlist-id', params: { id: item.id } }"
          tag="li"
          class="list__item"
        >
          <div class="simi__cover">
            <img :src="item.coverImgUrl" :alt="item.name" class="all100" />
          </div>
          <div class="simi__info">
            <p class="simi__name">{{ item.name }}</p>
            <p class="simi__creater">{{ item.creator.nickname }}</p>
          </div>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getsongDetail,
  getSongUrl,
  commentMusic,
  simiPlaylist,
  getMusicUrlByOther
} from '@/api/api'
import { mapState } from 'vuex'
// import anime from '@/components/common/anime.vue'
export default {
  name: 'Song',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title: this.songs.name
    }
  },
  components: {},
  data() {
    return {
      lyric: {},
      isFlat: true,
      loading: false
    }
  },
  computed: {
    ...mapState(['lyricObj']),
    totalPage() {
      return Math.ceil(this.total / 20)
    }
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
    const [song, url, comment, simi] = await Promise.all([
      getsongDetail(params.id),
      getSongUrl(params.id),
      commentMusic({ id: params.id }),
      simiPlaylist(params.id)
    ])
    return {
      songs: song.songs[0],
      url: url.data[0].url,
      hotComments: comment.hotComments,
      comments: comment.comments,
      total: comment.total,
      simi: simi.playlists
    }
  },
  fetch({ store, params }) {
    store.dispatch('getLrc', params.id)
  },
  mounted() {
    setTimeout(() => {
      this.play()
    }, 2000)
  },
  methods: {
    tryListen() {
      this.loading = true
      getMusicUrlByOther(this.$route.params.id)
        .then(res => {
          this.loading = false
          this.$music.setAudio(res.data.url)
        })
        .catch(e => {
          this.loading = false
          this.$Message.error('获取失败')
        })
    },
    pageChange(e) {
      commentMusic({ id: this.$route.params.id, offset: e }).then(res => {
        if (res.code === 200) {
          this.comments = res.comments
        }
      })
    },
    play() {
      this.$music.setAudio(this.url)
    },
    formatDate(s) {
      const time = new Date(s)
      let res = ''
      res =
        time.getFullYear() +
        '年' +
        (time.getMonth() + 1) +
        '月' +
        time.getDate() +
        '日'
      return res
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
  display: flex;
  flex-flow: row nowrap;
  .color--blue {
    color: #0c73c2;
  }
  .left {
    flex: 1;
    padding: 47px 30px 40px 39px;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    .list__info {
      display: flex;
      flex-flow: row nowrap;
      .cover {
        height: 196px;
        width: 196px;
        margin-right: 20px;
      }
      .list__content {
        flex: 1;
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
        .singer,
        .album {
          margin: 10px 0;
        }
        .content-operation {
          margin-bottom: 25px;
        }
        .func {
          margin-bottom: 25px;
          button {
            margin-right: 10px;
          }
          .ivu-btn-ghost {
            color: #333;
          }
        }
        .lyric {
          .ctlr {
            margin-top: 10px;
            color: #0c73c2;
            cursor: pointer;
          }
          .lrc-content {
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
            .isFlat {
              max-height: 300px;
              overflow: hidden;
            }
            .lrc-box {
              .lrc-list {
                font-size: 12px;
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
        .lrc-user {
          margin-top: 48px;
          > p {
            line-height: 30px;
            text-align: right;
          }
          .link {
            color: #999;
          }
          .user {
            color: #666;
          }
        }
      }
    }
    .comment__box {
      .comment__title {
        height: 33px;
        border-bottom: 2px solid #c20c0c;
        .title--h3 {
          font-size: 20px;
          line-height: 28px;
        }
        .num {
          margin: 9px 0 0 20px;
          color: #666;
        }
      }
      .iptarea {
        margin: 15px 0;
        height: 98px;
        background-color: #eee;
      }
      .comment_list {
        .list__title {
          position: relative;
          top: 1px;
          height: 20px;
          border-bottom: 1px solid #cfcfcf;
          font-size: 12px;
          color: #333;
        }
        .user {
          .user__list {
            display: flex;
            flex-flow: row nowrap;
            padding: 15px 0;
            border-top: 1px dotted #ccc;
            .img__cover {
              width: 50px;
              height: 50px;
            }
            .user__list__right {
              flex: 1;
              padding-left: 15px;
              .user__comment {
                word-break: break-word;
                line-height: 20px;
                .line {
                  display: inline-block;
                }
              }
              .user__operate {
                margin-top: 10px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;

                .user__time {
                  color: #999;
                }
                .user__cli {
                  text-align: right;
                  .step {
                    margin: 0 8px;
                    color: #ccc;
                  }
                  .zan {
                    width: 15px;
                    height: 14px;
                    margin-top: -4px;
                    margin-right: 5px;
                    display: inline-block;
                    overflow: hidden;
                    vertical-align: -2px;
                    background: url('~assets/img/spirte/icon2.png') no-repeat;
                    background-position: -150px 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 271px;
    padding: 20px 40px 40px 30px;
    border-right: 1px solid #d3d3d3;
    .tit {
      position: relative;
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 12px;
    }
    .similist {
      display: flex;
      flex-flow: column nowrap;
      .list__item {
        width: 200px;
        height: 50px;
        margin-bottom: 15px;
        line-height: 24px;
        display: flex;
        flex-flow: row nowrap;
        .simi__cover {
          width: 50px;
          height: 50px;
        }
        .simi__info {
          flex: 1;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
