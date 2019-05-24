<template>
  <div class="wrap">
    <div class="input">
      <Input search enter-button placeholder="Enter something..." />
    </div>
    <div class="search__content">
      <div class="content__title">{{ title }}</div>
      <Tabs>
        <TabPane label="标签一" name="name1">单曲</TabPane>
        <TabPane label="标签二" name="name2">歌手</TabPane>
        <TabPane label="标签三" name="name3">专辑</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  components: {},
  data() {
    return {
      tabs: [],
      input: this.$route.query.keywords
    }
  },
  computed: {
    keywords() {
      return this.$route.query.keywords
    },
    title() {
      return `搜索“${this.keywords}”，找到 600 首单曲`
    }
  },
  methods: {}
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
  }
}
</style>
