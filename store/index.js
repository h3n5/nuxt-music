export const state = () => ({
  star: {},
  visit: []
})

export const mutations = {
  setStars(state, value) {
    state.star = value
  },
  ADD_VISIT(state, value) {
    state.visit.push(value)
  }
}
