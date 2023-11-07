import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 去除进度条加载时右侧的小圆圈
const whiteList = ['/login'] // 路由白名单

/** 路由全局前置守卫 */
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启顶部进度条
  document.title = getPageTitle(to.meta.title) // 根据路由元信息配置页面标题
  const hasToken = getToken() // 判断用户是否登录

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' }) // 如果已经登录，且访问登录页，则重定向到首页
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getUserInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* 没有 Token 没有登录的情况下 */
    /** 如果在白名单 直接放行 | 反之代表页面需要权限 重定向到登录页 */
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`)
  }
})

/** 路由全局后置守卫 */
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
