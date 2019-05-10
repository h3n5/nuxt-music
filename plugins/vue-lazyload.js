import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('../assets/img/player-bar.png'),
  loading: require('../assets/img/player-bar.png'),
  attempt: 2
})
