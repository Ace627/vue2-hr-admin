import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  /** 登录 */
  async login({ commit }, userInfo) {
    try {
      console.log('userInfo: ', userInfo)
      const { mobile, password } = userInfo
      const { data } = await login({ mobile: mobile.trim(), password })
      commit('SET_TOKEN', data.token)
      setToken(data.token)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /** 获取用户信息 */
  async getInfo({ commit, state }) {
    try {
      const { data } = await getInfo(state.token)
      if (!data) return Promise.reject(new Error('Verification failed, please Login again.'))
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
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
