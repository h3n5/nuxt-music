<template>
  <div>{{ song.name }}</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Music',
  computed: {
    ...mapState(['song'])
  }
}
</script>
