/* eslint-disable */
export default class Anime {
  constructor({ el, width = 420, height = 420, bg, audio, radius = 90 }) {
    this.parent = document.querySelector(el)
    this.options = arguments[0]
    this.width = width
    this.height = height
    this.center = [width / 2, height / 2]
    this.audio = audio
    this.audio.crossOrigin = 'anonymous'
    this.radius = radius
    this.initbg(bg)
    this.init()
  }
  init() {
    this.element = document.createElement('canvas')
    this.element.setAttribute('id', 'element')
    this.element.width = this.width
    this.element.height = this.height
    this.context = this.element.getContext('2d')
    var audioCtx = new AudioContext() // 创建音频接收
    var audioSrc = audioCtx.createMediaElementSource(this.audio) // 创建音频控制
    var analyser = audioCtx.createAnalyser() // 创建音频分析

    audioSrc.connect(analyser)

    analyser.connect(audioCtx.destination)

    // analyser.fftSize = 1024

    var array = new Uint8Array(analyser.frequencyBinCount)
    console.log(analyser.frequencyBinCount)
    this.context.fillStyle = 'rgba(0,0,0,0.5)'
    this.context.lineCap = 'round'
    this.lineRender(array, this.context, analyser)

    this.parent.append(this.element)
  }

  lineRender(array, ctx, analyser) {
    analyser.getByteFrequencyData(array)
    const PI = Math.PI
    var meterNum = 128
    var meterWidth = 5
    var minHeight = 2
    var radius = this.radius + 10 // 环形半径
    var step = Math.round(array.length / meterNum)
    var max = Math.max.apply(this, array)
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.save()
    ctx.translate(this.center[0], this.center[1])
    ctx.beginPath()
    for (var i = 0; i < meterNum; i++) {
      var value = array[i * step]
      var meterHeight = value
        ? (value / max) * (this.width / 2 - radius)
        : minHeight
      ctx.rotate((2 * PI) / meterNum)
      var pos = [meterWidth / 2 + radius, meterHeight / 2 + radius]
      ctx.lineTo(pos[0], pos[1])
    }
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
    window.requestAnimationFrame(
      this.lineRender.bind(this, array, ctx, analyser)
    )
  }

  render(array, ctx, analyser) {
    analyser.getByteFrequencyData(array)
    const PI = Math.PI
    var meterNum = 100
    var meterWidth = 5
    var minHeight = 2
    var radius = this.radius + 10 // 环形半径
    var step = Math.round(array.length / meterNum)
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.save()
    ctx.translate(this.center[0], this.center[1])
    for (var i = 0; i < meterNum; i++) {
      var value = array[i * step]
      var meterHeight = (value / 1000) * (this.height / 2 - radius) || minHeight
      ctx.rotate((2 * PI) / meterNum)
      ctx.fillRect(
        -meterWidth / 2,
        -radius - meterHeight,
        meterWidth,
        meterHeight
      )
    }
    ctx.restore()
    window.requestAnimationFrame(this.render.bind(this, array, ctx, analyser))
  }
  initbg(bg) {
    const PI = Math.PI
    this.element_bg = document.createElement('canvas')
    this.element_bg.setAttribute('id', 'element_bg')
    this.element_bg.width = this.width
    this.element_bg.height = this.height
    let context = (this.element_bg_context = this.element_bg.getContext('2d'))
    var img = new Image()
    img.src = bg
    img.onload = () => {
      context.beginPath()

      context.arc(this.center[0], this.center[1], this.radius, 0, 2 * PI)
      context.clip()
      context.closePath()
      context.drawImage(img, 0, 0, this.width, this.height)
      // context.translate(this.width / 2, this.height / 2)

      this.parent.append(this.element_bg)
      this.rotatebg(img)
    }
  }
  rotatebg(img) {
    let context = this.element_bg_context
    context.beginPath()
    context.clearRect(0, 0, this.width, this.height)
    context.translate(this.center[0], this.center[1])
    context.rotate((1 * Math.PI) / 180)
    context.translate(-this.center[0], -this.center[1])
    context.closePath()
    context.drawImage(img, 0, 0, this.width, this.height)
    window.requestAnimationFrame(this.rotatebg.bind(this, img))
  }
}
