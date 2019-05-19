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
          <input type="text" class="nav__search__input" placeholder="音乐" />
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
export default {
  name: 'Mheader',
  data() {
    return {
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
  methods: {
    choose(v, list) {}
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
</style>
