import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'

// 去除进度条加载时右侧的小圆圈
NProgress.configure({ showSpinner: false })

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 将自动加在 url 前面，除非 url 是一个绝对 URL | url = base url + request url baseURL
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    NProgress.start()
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    NProgress.done()
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    NProgress.done()
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({ message: res.message || 'Error', type: 'error', duration: 5 * 1000 })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    NProgress.done()
    console.log('err' + error) // for debug
    let message = error.message || '未知错误'
    if (message.includes('Network Error')) message = '后端接口连接异常'
    if (message.includes('timeout')) message = '系统接口请求超时'
    if (message.includes('Request failed with status code')) message = '系统接口' + message.substr(message.length - 3) + '异常'
    Message({ message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
)

export default request
