import router, { asyncRoutes } from './router'
import store from './store'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 去除进度条加载时右侧的小圆圈
const whiteList = ['/login'] // 免登录白名单

/** 路由全局前置守卫 */
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启顶部进度条
  document.title = getPageTitle(to.meta.title) // 根据路由元信息配置页面标题
  const hasToken = getToken() // 判断用户是否登录

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/', replace: true }) // 如果已经登录，并准备进入 Login 页面，则重定向到主页
    } else {
      /** 检查用户是否已获得其权限角色 */
      if (store.getters.userId) {
        next()
      } else {
        try {
          const userInfo = await store.dispatch('user/getUserInfo')
          const permissionRoutes = asyncRoutes.filter((route) => userInfo.roles.menus.some((menu) => route.path.includes(menu)))
          store.commit('user/SET_ROUTES', permissionRoutes)
          router.addRoutes([...permissionRoutes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由信息
          next({ ...to, replace: true }) // 设置 replace: true, 因此导航将不会留下历史记录
        } catch (error) {
          await store.dispatch('user/resetToken') // 重置 Token
          next(`/login?redirect=${to.path}`) // 重定向至登录页
        }
      }
    }
  } else {
    /** 如果没有 Token，但在免登录的白名单中，则直接进入；否则将被重定向到登录页面 */
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`)
  }
})

/** 路由全局后置守卫 */
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
