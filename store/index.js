import { getLyric, getSongUrl } from '@/api/api'
import Lyric from '@/plugins/lyric'
export const state = () => ({
  star: {},
  visit: [],
  song: {
    playing: false,
    name: 'songtest',
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
    const url = res[0].url
    commit('setUrl', url)
  },
  async getLrc({ state, commit }, id) {
    commit('setLrc', '加载中。。')
    const res = await getLyric(id)
    if (res.nolyric) {
      commit('setLrc', '(⊙０⊙) 暂无歌词')
    } else {
      commit('setLrc', res.lrc.lyric)
    }
    if (!res.nolyric || (res.tlyric && res.tlyric.lyric)) {
      commit('setLrcCN', res.tlyric.lyric)
    } else {
      commit('setLrcCN', '')
    }
    /* eslint-disable-next-line */
    let user = {}
    if (res.lyricUser) {
      user.lyricUser = res.lyricUser.nickname
    }
    if (res.transUser) {
      user.transUser = res.transUser.nickname
    }
    /* eslint-disable-next-line */
    let lycObj = new Lyric(state.lyricTxt, state.lyricTxtCN)
    Object.assign(lycObj, user)
    commit('setLrcObj', lycObj)
  }
}
