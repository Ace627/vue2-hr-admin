import request from '@/utils/request'

/** 登录 */
export const login = data => request.post('/sys/login', data)

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token },
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post',
  })
}
