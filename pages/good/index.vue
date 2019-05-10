<template>
  <div>
    <div>id{{ $route.query.id }}-age:{{ $route.query.age }}</div>
    <div>name{{ name }}</div>
    <div>{{ $store.state.star }}</div>
    <div v-for="(item, index) in $store.state.visit" :key="index">
      {{ item }}
    </div>
    <NuxtLink to="/good">
      Back to the list
    </NuxtLink>
    <nuxt-link to="/good">
      Back to the list
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Good',
  data() {
    return {
      title: 'Hello World!'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  },
  asyncData(context) {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve({ name: 'world' + Math.random().toFixed(2) })
      }, 200)
    )
  },
  async fetch({ store, params, $axios }) {
    const { data } = await $axios.get('https://api.myjson.com/bins/jt1ks')
    store.commit('setStars', data)
  },
  methods: {}
}
</script>
