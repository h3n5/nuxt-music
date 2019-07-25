/* eslint-disable */
import Events from './event'
class Auplayer {
  audio = null
  options = {}
  events = new Events()
  songList = []
  /**
   * {
   * id,
   * name,
   * album,
   * url,
   * lyric
   * lyricCn
   * author
   * }
   */
  currentIndex = 0
  durationTime = ''
  currentTime = ''
  currentTimeFlag = true
  constructor(options = { preload: true, mode: 1 }) {
    this.options = options
    this.init()
    this.initEvent()
  }
  /**
   * mode =  1,歌单循环;2,歌单随机;3,单曲循环
   */
  init() {
    this.audio = document.createElement('audio')
    this.audio.preload = this.options.preload
    this.audio.loop = true
    this.on('timeupdate', e => {
      if (this.currentTimeFlag) {
        this.setcurrentTime(e.target.currentTime)
      }
    })
    this.on('canplay', e => {
      this.setdurationTime(e.target.duration)
    })
    this.on('ended', () => {
      this.next()
    })
  }
  initEvent() {
    for (let i = 0; i < this.events.audioEvents.length; i++) {
      this.audio.addEventListener(this.events.audioEvents[i], e => {
        this.events.trigger(this.events.audioEvents[i], e)
      })
    }
  }
  on(name, callback) {
    this.events.on(name, callback)
  }
  play() {
    this.audio.play()
  }
  pause() {
    this.audio.pause()
  }
  next() {
    const mode = ~~this.options.mode
    if (mode === 1) {
      this.currentIndex === this.songList.length - 1
        ? (this.currentIndex = 0)
        : this.currentIndex++
    } else if (mode === 2) {
      var randomIndex = () => {
        var r = ~~((this.songList.length - 1) * Math.random())
        if (r === this.currentIndex) {
          r = randomIndex()
        }
        return r
      }
      this.currentIndex = randomIndex()
    } else {
      // do nothing
    }
    let now = this.currrent()
    if (now) this.setAudio(now.url)
  }
  currrent() {
    return this.songList[this.currentIndex]
  }
  setSong(obj) {
    let res = this.songList.find(v => v.id === obj.id)
    if (!res) {
      this.songList.unshift(obj)
    }
    this.setAudio(obj.url)
  }
  resetSongList(list) {
    this.songList = list
    if (list[0]) this.setAudio(list[0].url)
  }
  setAudio(value) {
    this.audio.src = value
    if (this.audio.pause) {
      this.play()
    }
  }
  setdurationTime(time) {
    this.durationTime = time
  }
  setcurrentTime(time) {
    if (this.currentTimeFlag) this.currentTime = time
  }
  setsetcurrentTimeFlag(v) {
    this.currentTimeFlag = v
  }
  setloop(value) {
    this.audio.loop = value
  }
}

export default Auplayer
