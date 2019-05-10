<template>
  <div class="discovery__wrap">
    <div class="discovery__content">
      <div class="left fl">
        <tag title="热门推荐" :tabs="tabs" :more="more" />
        <ul class="comments">
          <li
            v-for="(item, index) in comments"
            :key="index"
            :class="{ mr0: (index + 1) % 4 === 0 && index !== 0 }"
            class="comments__list fl"
          >
            <pic :item="item" />
          </li>
        </ul>
        <tag title="新碟上架" :more="more" />
        <div class="disk"></div>
        <tag title="榜单" :more="more" />
        <div class="ranking">
          <div class="ranking__list"></div>
        </div>
      </div>
      <div class="right">
        <div class="card">
          <div class="loginnote">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </div>
          <div class="loginbtn">
            <nuxt-link class="login__btn" to="">用户登录</nuxt-link>
          </div>
        </div>
        <div class="singer">
          <h3 class="title">
            <span class="peo">入驻歌手</span>
            <a class="more" href="">查看全部</a>
          </h3>
          <ul class="singer__list">
            <nuxt-link
              v-for="(item, index) in artist"
              :key="index"
              to=""
              tag="li"
              class="item clear"
            >
              <div class="head">
                <img :alt="item.name" :src="item.picUrl" />
              </div>
              <div class="info">
                <h4 class="singer__name">{{ item.name }}</h4>
                <p class="single__info">
                  {{ item.alias ? item.alias.join('-') : '' }}
                </p>
              </div>
            </nuxt-link>
          </ul>
          <div class="box">
            <nuxt-link to="" class="mbtn reply">
              申请成为音乐人
            </nuxt-link>
          </div>
        </div>
        <div class="singer">
          <h3 class="title">
            <span class="peo">推荐电台</span>
          </h3>
          <ul class="singer__list">
            <nuxt-link
              v-for="(item, index) in djlist"
              :key="index"
              to=""
              tag="li"
              class="item clear"
            >
              <div class="head">
                <img :alt="item.name" :src="item.picUrl" />
              </div>
              <div class="info">
                <h4 class="singer__name">{{ item.name }}</h4>
              </div>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tag from '../common/tag'
import pic from '../common/pic'
export default {
  name: 'Discover',
  components: {
    tag,
    pic
  },
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    artist: {
      type: Array,
      default: () => []
    },
    djlist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tabs: [
        { name: '华语', link: '' },
        { name: '流行', link: '' },
        { name: '伤感', link: '' }
      ],
      more: {
        link: ''
      },
      sings: []
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.discovery__wrap {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .discovery__content {
    display: flex;
    flex-flow: row nowrap;
    .left {
      flex: 1;
      padding: 20px 20px 40px;
      border-right: 1px solid #d3d3d3;
      .comments {
        overflow: hidden;
        margin: 20px 0 35px 0;
        .comments__list {
          list-style-type: none;
          width: 140px;
          height: 204px;
          display: inline-block;
          width: 140px;
          height: 188px;
          overflow: hidden;
          line-height: 1.4;
          margin: 0 40px 30px 0;
        }
        .mr0 {
          margin-right: 0;
        }
      }
      .disk {
        position: relative;
        zoom: 1;
        height: 186px;
        margin: 20px 0 37px;
        border: 1px solid #d3d3d3;
        background: #f5f5f5;
      }
      .ranking {
        height: 472px;
        margin-top: 20px;
        padding-left: 1px;
        display: flex;
        flex-flow: row nowrap;
        background: url('~assets/img/spirte/index_bill.png') no-repeat;
        .ranking__list {
          flex: 1;
        }
      }
    }
    .right {
      width: 250px;
      .card {
        height: 126px;
        font-size: 12px;
        background: url('~assets/img/spirte/index.png') 0 0 no-repeat;
        .loginnote {
          width: 205px;
          margin: 0 auto;
          padding: 16px 0;
          line-height: 22px;
          color: #666;
        }
        .loginbtn {
          .login__btn {
            margin: auto;
            display: block;
            width: 100px;
            height: 31px;
            line-height: 31px;
            text-align: center;
            color: #fff;
            text-shadow: 0 1px 0 #8a060b;
            background: url('~assets/img/spirte/index.png') 0 0 no-repeat;
            background-position: 0 -195px;
          }
        }
      }
      .singer {
        padding: 15px 20px;
        .title {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          .peo {
            color: #333;
          }
          .more {
            color: #666;
            &::after {
              padding-left: 3px;
              content: '>';
            }
          }
        }
        .singer__list {
          width: 210px;
          background: #fafafa;
          margin-top: 14px;
          .item {
            margin-top: 14px;
            &:hover {
              .info {
                background: #f4f4f4;
              }
            }
            .head {
              width: 62px;
              height: 62px;
              float: left;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .info {
              float: left;
              width: 133px;
              height: 62px;
              padding-left: 14px;
              border: 1px solid #e9e9e9;
              border-left: none;
              .singer__name {
                color: #666;
                margin-top: 8px;
              }
              .single__info {
                margin-top: 8px;
              }
            }
          }
        }
        .box {
          margin-top: 14px;
          .reply {
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
