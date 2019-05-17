<template>
  <div>
    <mheader />
    <nuxt />
    <iframe src="/music" frameborder="0" style="height: 0;"></iframe>
    <mfooter />
  </div>
</template>
<script>
import mheader from '@/components/header'
import mfooter from '@/components/footer'
export default {
  components: {
    mheader,
    mfooter
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 12px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
