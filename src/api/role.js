import request from '@/utils/request'

/** 获取-分页查询角色列表 */
export const getRoleList = (params) => request.get(`/sys/role`, params)
