import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../assets/img/player-bar.png',
  loading: '../assets/img/player-bar.png',
  attempt: 2
})
