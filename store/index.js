import { getLyric, getSongUrl } from '@/api/api'
import Lyric from '@/plugins/lyric'
export const state = () => ({
  star: {},
  visit: [],
  song: {
    playing: false,
    name: 'song',
    id: '2802079580',
    url: ''
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
  },
  setUrl(state, value) {
    state.song.url = value
  }
}

export const actions = {
  async getSong({ commit }, id) {
    const res = await getSongUrl(id)
    const url = res.data[0].url
    commit('setUrl', url)
  },
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
