<template>
  <div class="wrap">
    <header class="top">
      <div class="nav">
        <nuxt-link tag="h1" to="/" class="nav__log">网易云音乐</nuxt-link>
        <ul class="nav__list">
          <li
            v-for="(item, index) in navlist"
            :key="index"
            class="fz14"
            :class="{ selected: item.seleted }"
            @click="choose(item, navlist)"
          >
            <a
              :href="item.url ? item.url : '#'"
              :target="item.blank ? '_blank' : ''"
              >{{ item.name }}</a
            >
          </li>
        </ul>
        <div class="nav__search">
          <AutoComplete
            v-model="search"
            icon="ios-search"
            @on-select="select"
            @click.native.capture="goSearch"
          >
            <div
              v-for="(item, i) in searchResult"
              :key="i"
              class="demo-auto-complete-item"
            >
              <div class="demo-auto-complete-group">
                <span>{{ item.name }}</span>
              </div>
              <Option
                v-for="option in item.list"
                :key="option.id"
                :value="option.name"
              >
                <span class="auto-complete-title">{{ option.name }}</span>
              </Option>
            </div>
          </AutoComplete>
        </div>
        <div class="create-center">
          <Button shape="circle" ghost>创造者中心</Button>
        </div>
        <div class="user-info">
          <span class="login">登录</span>
        </div>
      </div>
    </header>
    <div class="nav-side-wrap">
      <div class="wrap-box">
        <ul class="nav-side">
          <li
            v-for="(item, index) in navSideList"
            :key="index"
            @click="choose(item, navSideList)"
          >
            <span :class="{ selected: item.seleted }">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { searchIndex } from '@/api/api'
const debounce = function(func, wait = 1000) {
  let timeout
  return function() {
    const that = this
    const argus = arguments
    timeout && clearTimeout(timeout)
    timeout = setTimeout(function() {
      func.apply(that, argus)
    }, wait)
  }
}
export default {
  name: 'Mheader',
  data() {
    return {
      search: '',
      searchResult: {},
      navlist: [
        { name: '发现音乐', seleted: true },
        { name: '我的音乐', seleted: false },
        { name: '朋友', seleted: false },
        {
          name: '商城',
          seleted: false,
          url: 'https://music.163.com/store/product',
          blank: true
        },
        {
          name: '音乐人',
          seleted: false,
          url: 'https://music.163.com/nmusician/web/index',
          blank: true
        },
        {
          name: '下载客户端',
          seleted: false,
          url: 'https://music.163.com/#/download',
          blank: true
        }
      ],
      navSideList: [
        { name: '推荐', seleted: true },
        { name: '排行榜', seleted: false },
        { name: '歌单', seleted: false },
        { name: '主播电台', seleted: false },
        { name: '歌手', seleted: false },
        { name: '新碟上架', seleted: false }
      ]
    }
  },
  watch: {
    search: {
      handler: debounce(function(v) {
        if (v) {
          searchIndex(v).then(([songs, albums, playlists]) => {
            const object = {
              songs: {
                name: '单曲',
                list: songs.result.songs || []
              },
              albums: {
                name: '专辑',
                list: albums.result.albums || []
              },
              playlists: {
                name: '歌单',
                list: playlists.result.playlists || []
              }
            }
            for (const key in object) {
              if (object.hasOwnProperty(key)) {
                if (object[key].list.length === 0) {
                  delete object[key]
                }
              }
            }

            this.searchResult = object
          })
        }
      })
    }
  },
  methods: {
    choose(v, list) {},
    select(v) {
      console.log(v)
    },
    goSearch(e) {
      if (this.search && e.target.tagName === 'I') {
        this.$router.push({
          name: 'search',
          query: { keywords: this.search, type: 1 }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  color: #fff;
}
.top {
  position: relative;
  z-index: 1000;
  height: 70px;
  box-sizing: border-box;
  background: #242424;
  border-bottom: 1px solid #000;
}
.nav {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .nav__log {
    width: 176px;
    background: url('~assets/img/spirte/topbar.png') 0 0 no-repeat;
    height: 69px;
    text-indent: -9999px;
  }
  .nav__list {
    display: flex;
    flex: 1;
    li {
      cursor: default;
      text-align: center;
      flex: 1;
      height: 70px;
      line-height: 70px;
      list-style-type: none;
      a {
        color: #ccc;
      }
    }
    .selected {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        transform: translateX(-3px);
        border: 6px solid transparent;
        border-bottom-color: #c20c0c;
      }
    }
  }
  .nav__search {
    line-height: 70px;
    margin-left: 30px;
    input {
      width: 100%;
      border: none;
      appearance: none;
      background-color: transparent;
    }
  }
  .nav__search,
  .user-info {
    line-height: 70px;
    width: 158px;
    color: #ccc;
  }
  .create-center {
    margin: 0 15px;
    > button {
      color: #ccc;
      &:hover {
        border-color: #fff;
      }
    }
  }
}
.nav-side-wrap {
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
  .wrap-box {
    width: 1100px;
    margin: auto;
    .nav-side {
      padding: 0 210px;
      display: flex;
      flex-flow: row nowrap;
      li {
        cursor: default;
        text-align: center;
        flex: 1;
        height: 34px;
        line-height: 34px;
        list-style-type: none;
        font-size: 12px;
        span {
          display: inline-block;
          height: 20px;
          padding: 0 13px;
          margin: 7px 17px 0;
          border-radius: 20px;
          line-height: 21px;
          &:hover {
            background: #9b0909;
          }
        }
        .selected {
          background: #9b0909;
        }
      }
    }
  }
}
.demo-auto-complete-item {
  padding: 4px 0;
  border-bottom: 1px solid #f6f6f6;
}
.demo-auto-complete-group {
  font-size: 12px;
  padding: 4px 6px;
}
.demo-auto-complete-group span {
  color: #666;
  font-weight: bold;
}
.demo-auto-complete-group a {
  float: right;
}
.auto-complete-title {
  font-size: 12px;
  padding-left: 10px;
}
.demo-auto-complete-count {
  float: right;
  color: #999;
}
.demo-auto-complete-more {
  display: block;
  margin: 0 auto;
  padding: 4px;
  text-align: center;
  font-size: 12px;
}
</style>
