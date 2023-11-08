import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'

// 去除进度条加载时右侧的小圆圈
NProgress.configure({ showSpinner: false })

// 创建一个新的 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 将自动加在 url 前面，除非 url 是一个绝对 URL | url = base url + request url baseURL
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: Number(process.env.VUE_APP_REQUEST_TIMEOUT) || 6000, // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
})

// 请求拦截器
request.interceptors.request.use(
  // 请求发送之前执行
  (config) => {
    NProgress.start()
    const token = store.getters.token
    if (token) config.headers['Authorization'] = `Bearer ${token}` //  让每个请求携带自定义 token 请根据实际情况自行修改
    return config
  },
  // 请求发送失败执行
  (error) => {
    NProgress.done()
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    NProgress.done()
    const api_data = response.data
    // 未设置状态码则默认成功状态
    const code = api_data.code || 10000
    // 获取错误信息
    const message = api_data.message || '服务器响应失败'
    // 二进制数据则直接返回
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data
    }
    if (api_data.success) {
      return response.data
    } else {
      Message({ message, type: 'error', duration: 5 * 1000 })
      // 50008 非法 token; 50012 客户端退出登录; 50014 token 过期
      if ([50008, 50012, 50014].includes(code)) {
        MessageBox('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/resetToken').then(() => location.reload())
        })
      }
      return Promise.reject(new Error(api_data.message))
    }
  },
  (error) => {
    NProgress.done()
    console.log('err' + error) // for debug
    let message = error.message || '未知错误'
    if (message.includes('Network Error')) message = '后端接口连接异常'
    if (message.includes('timeout')) message = '系统接口请求超时'
    if (message.includes('Request failed with status code')) message = '系统接口 ' + message.substr(message.length - 3) + ' 异常'
    Message({ message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
)

export default request
