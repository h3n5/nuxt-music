import { getLyric } from '@/api/api'
import Lyric from '@//plugins/lyric'
export const state = () => ({
  star: {},
  visit: [],
  song: {
    playing: false,
    name: 'test'
  },
  lyricTxt: '',
  lyricTxtCN: '',
  lyricObj: {}
})

export const mutations = {
  setStars(state, value) {
    state.star = value
  },
  ADD_VISIT(state, value) {
    state.visit.push(value)
  },
  setLrc(state, value) {
    state.lyricTxt = value
  },
  setLrcCN(state, value) {
    state.lyricTxtCN = value
  },
  setLrcObj(state, value) {
    state.lyricObj = value
  }
}

export const actions = {
  async getLrc({ state, commit }, id) {
    commit('setLrc', '加载中。。')
    const res = await getLyric(id)
    if (res.data.nolyric) {
      commit('setLrc', '(⊙０⊙) 暂无歌词')
    } else {
      commit('setLrc', res.data.lrc.lyric)
    }
    if (!res.data.nolyric || (res.data.tlyric && res.data.tlyric.lyric)) {
      commit('setLrcCN', res.data.tlyric.lyric)
    } else {
      commit('setLrcCN', '')
    }
    const lycObj = new Lyric(state.lyricTxt, state.lyricTxtCN)
    commit('setLrcObj', lycObj)
  }
}
