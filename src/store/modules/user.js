import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { constantRoutes } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(), // 从缓存中读取 Token 的初始值
    userInfo: {}, // 存储用户的基本资料
    routes: constantRoutes,
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = [...state.routes, ...routes]
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token) // 持久化存储 Token
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
}

const actions = {
  /** 登录 */
  async login({ commit }, userInfo) {
    const { mobile, password } = userInfo
    const { data } = await login({ mobile: mobile.trim(), password })
    commit('SET_TOKEN', data)
  },

  /** 获取用户基本资料 */
  async getUserInfo({ commit }) {
    try {
      const { data } = await getUserInfo()
      commit('SET_USER_INFO', data)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /** 登出 */
  async logout({ commit }) {
    removeToken() // 必须先清空 Cookie 的 Token 信息
    resetRouter() // 重置路由信息
    commit('RESET_STATE') // 重置 user 数据仓库
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
