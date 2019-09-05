<template>
  <div class="wrap">
    <div class="input">
      <Input v-model="input" @click.native="goSearch()">
        <Icon slot="suffix" type="ios-search" />
      </Input>
    </div>
    <div class="search__content">
      <div class="content__title">{{ title }}</div>
      <ul class="navList">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="{ 'navList__item--select': ~~selected === item.type }"
          class="navList__item"
          @click="change(item.type)"
        >
          {{ item.name }}
        </li>
      </ul>
      <keep-alive>
        <component
          :is="componentId.com"
          :list="listData"
          :count="count"
        ></component>
      </keep-alive>
      <Page
        class="page"
        :page-size="30"
        :total="count"
        prev-text="上一页"
        next-text="下一页"
        @on-change="pageChnage"
      />
    </div>
  </div>
</template>

<script>
import { searchMusic } from '@/api/api.js'
export default {
  name: 'Search',
  components: {
    songs: () => import('@/components/search/songs'),
    singers: () => import('@/components/search/singers'),
    albums: () => import('@/components/search/albums'),
    videos: () => import('@/components/search/videos'),
    lyrics: () => import('@/components/search/lyrics'),
    playlists: () => import('@/components/search/playlists'),
    userprofiles: () => import('@/components/search/userprofiles')
  },
  data() {
    return {
      offset: 0,
      total: 0,
      obj: {},
      list: [],
      count: 0,
      input: this.$route.query.keywords,
      navList: [
        { name: '单曲', com: 'songs', type: 1, data: 'songs' },
        { name: '歌手', com: 'singers', type: 100, data: 'artists' },
        { name: '专辑', com: 'albums', type: 10, data: 'albums' },
        { name: '视频', com: 'videos', type: 1004, data: 'mvs' },
        { name: '歌词', com: 'lyrics', type: 1006, data: 'songs' },
        { name: '歌单', com: 'playlists', type: 1000, data: 'playlists' },
        { name: '用户', com: 'userprofiles', type: 1002, data: 'userprofiles' }
      ],
      // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      selected: this.$route.query.type || 1
    }
  },

  computed: {
    listData() {
      return this.obj[this.selected] || []
    },
    componentId() {
      return this.navList.find(v => v.type === ~~this.selected)
    },
    keywords() {
      return this.$route.query.keywords
    },
    title() {
      return `搜索“${this.keywords}”，找到 ${this.count} 个${
        this.componentId.name
      }`
    }
  },
  async asyncData({ query }) {
    const res = await searchMusic({
      keywords: query.keywords,
      type: query.type
    })
    const obj = {
      [query.type]: res.result.songs
    }
    return {
      obj,
      count: res.result.songCount
    }
  },
  methods: {
    pageChnage(v) {
      this.offset = v - 1
      this.goSearch()
    },
    async change(e) {
      if (!this.obj[e]) {
        await this.goSearch(e)
      }
      this.selected = e
    },
    async goSearch(e) {
      const type = e || this.selected
      const { result } = await searchMusic({
        keywords: this.input,
        type: type,
        offset: this.offset
      })
      const key = this.navList.find(v => v.type === +type).data
      this.obj[type] = result[key]
      this.count = result[key.slice(0, -1) + 'Count']
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
  padding: 40px;
  .input {
    width: 420px;
    height: 40px;
    margin: 0 auto;
    background-position: 0 0;
    z-index: 10;
  }
  .search__content {
    .content__title {
      margin: 28px 0 17px;
      color: #999;
    }
    .navList {
      display: flex;
      flex-flow: row nowrap;
      border: 1px solid #ccc;
      border-width: 0 1px;
      background: url('~assets/img/spirte/tab.png') no-repeat 0 9999px;
      background-position: 0 0;
      background-repeat: repeat-x;
      margin-bottom: 20px;
      .navList__item {
        height: 40px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        box-sizing: border-box;
        border-top: 2px solid transparent;
      }
      .navList__item--select {
        border-top: 2px solid #c20c0c;
      }
    }
  }
  .page {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
