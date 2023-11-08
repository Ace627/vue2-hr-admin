import request from '@/utils/request'

/** 登录 此项目为内部 OA 项目, 账号需要管理员开通后直接使用, 无注册功能 */
export const login = (data) => request.post('/sys/login', data)

/** 获取用户基本资料 */
export const getUserInfo = () => request.get(`/sys/profile`)

/** 修改用户密码 */
export const updatePass = (data) => request.put(`/sys/user/updatePass`, data)
