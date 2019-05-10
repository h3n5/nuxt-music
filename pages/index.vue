<template>
  <div class="wrap">
    <SwiperBanner :banners="banners" />
    <Discover :comments="comments" :artist="artist" :djlist="djlist" />
  </div>
</template>

<script>
import SwiperBanner from '@/components/index/SwiperBanner'
import Discover from '@/components/index/Discover'
import { getBanner, getpersonalized, artistList, djProgram } from '~/api/api'
export default {
  name: 'Index',
  components: {
    SwiperBanner,
    Discover
  },
  data() {
    return {
      banners: []
    }
  },
  async asyncData() {
    const [banners, comments, artist, djlist] = await Promise.all([
      getBanner(),
      getpersonalized(),
      artistList({ cat: 5001, limit: 5 }),
      djProgram()
    ])
    return {
      banners: banners.data.banners,
      comments: comments.data.result.slice(0, 8),
      artist: artist.data.artists,
      djlist: djlist.data.result
    }
  },
  methods: {
    choose(item, arr) {
      arr.forEach(v => {
        v.seleted = false
      })
      arr.find(v => v.name === item.name).seleted = true
    }
  }
}
</script>
