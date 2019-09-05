import axios from 'axios'
import { Message } from 'iview'
class HttpRequest {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      withCredentials: false,
      headers: {}
    }
    return config
  }
  distroy(url) {
    delete this.queue[url]
  }
  interceptors(instance, url) {
    instance.interceptors.request.use(
      config => {
        if (!Object.keys(this.queue).length) {
        }
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.distroy(url)
        const { data } = res
        return data
      },
      error => {
        Message.error({ duration: 3, content: '获取失败' })
        this.distroy(url)
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
