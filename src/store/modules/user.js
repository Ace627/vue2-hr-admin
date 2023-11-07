import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(), // 从缓存中读取 Token 的初始值
    userInfo: {}, // 存储用户的基本资料
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
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
      console.log('data: ', data)
      commit('SET_USER_INFO', data)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /** 登出 */
  async logout({ commit, state }) {
    try {
      await logout(state.token)
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
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
