<template>
  <div class="wrap">
    <div class="input">
      <Input v-model="input" @click.native="goSearch">
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
          :is="componentId"
          :list="obj[selected]"
          :count="count"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { searchMusic } from '@/api/api'
export default {
  name: 'Search',
  components: {
    songs: () => import('@/components/search/songs'),
    singers: () => import('@/components/search/singers')
  },
  data() {
    return {
      obj: {},
      list: [],
      count: 0,
      input: this.$route.query.keywords,
      navList: [
        { name: '单曲', com: 'songs', type: 1 },
        { name: '歌手', com: 'singers', type: 100 },
        { name: '专辑', com: 'song', type: 10 },
        { name: '视频', com: 'song', type: 1004 },
        { name: '歌词', com: 'song', type: 1006 },
        { name: '歌单', com: 'song', type: 1000 },
        { name: '用户', com: 'song', type: 1002 }
      ],
      // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      selected: this.$route.query.type || 1
    }
  },
  computed: {
    componentId() {
      return this.navList.find(v => v.type === ~~this.selected).com
    },
    keywords() {
      return this.$route.query.keywords
    },
    title() {
      return `搜索“${this.keywords}”，找到 600 首单曲`
    }
  },
  // watch: {
  //   selected() {
  //     console.log(this.componentId)
  //     console.log(this.list)
  //     this.goSearch()
  //   }
  // },
  async asyncData({ query }) {
    const res = await searchMusic({
      keywords: query.keywords,
      type: query.type
    })
    return {
      list: res.result.songs,
      count: res.result.songCount
    }
  },
  methods: {
    async change(e) {
      this.selected = e
      if (!this.obj[e]) {
        await this.goSearch()
      }
    },
    async goSearch(e) {
      const type = e || this.selected
      const { result } = await searchMusic({
        keywords: this.input,
        type: type
      })
      switch (~~type) {
        case 1:
          this.list = result.songs
          this.obj[type] = result.songs
          this.count = result.songCount
          break
        case 100:
          this.list = result.artists
          this.obj[type] = result.artists
          this.count = result.artistCount
          break
        default:
          break
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
}
</style>
