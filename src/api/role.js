import request from '@/utils/request'

/** 获取-分页查询角色列表 */
export const getRoleList = (params) => request.get(`/sys/role`, { params })

/** 获取-已启用的角色列表 */
export const getEnabledRoleList = (params) => request.get(`/sys/role/list/enabled`, { params })

/** 新增角色 */
export const addRole = (data) => request.post(`/sys/role`, data)

/** 删除角色 */
export const delRole = (id) => request.delete(`/sys/role/${id}`)

/** 获取角色详情 */
export const getRoleDetail = (id) => request(`/sys/role/${id}`)

/** 修改角色详情 */
export const updateRoel = (data) => request.put(`/sys/role/${data.id}`, data)
