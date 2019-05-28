<template>
  <Table :columns="columns" :data="list" class="nohead">
    <template slot="cover" slot-scope="{ row }">
      <div class="cover">
        <img :src="row.avatarUrl" :alt="row.name" class="all100" />
      </div>
    </template>
    <template slot="name" slot-scope="{ row }">
      <span>{{ row.nickname }}</span>
    </template>
    <template slot="follow" slot-scope="{ row }">
      <Button>{{ row.followed ? '取消关注' : '关注' }}</Button>
    </template>
  </Table>
</template>

<script>
export default {
  name: 'Userprofiles',
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
          title: 'cover',
          slot: 'cover'
        },
        {
          title: '歌曲',
          slot: 'name',
          width: 400
        },
        {
          slot: 'follow'
        }
      ]
    }
  },

  methods: {
    play(e) {
      console.log(e)
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
<style lang="less" scoped>
.cover {
  width: 50px;
  height: 50px;
  margin: 10px 0;
  border: 1px solid #eee;
  box-sizing: content-box;
}
</style>
