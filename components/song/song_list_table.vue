<template>
  <Table :columns="columns" :data="list" stripe></Table>
</template>

<script>
export default {
  name: 'song_list_table',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      columns: [
        {
            type: 'index',
            width: 60,
        },
        {
            title: '歌曲标题',
            key: 'age'
        },
      ]
    }
  },

  methods: {}
}
</script>