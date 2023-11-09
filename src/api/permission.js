import request from '@/utils/request'

/** 获取权限列表 */
export const getPermissionList = () => request.get(`/sys/permission`)

/** 获取权限详情 */
export const getPermissionDetail = (id) => request.get(`/sys/permission/${id}`)

/** 新增权限 */
export const addPermission = (data) => request.post(`/sys/permission`, data)

/** 更新权限 */
export const updatePermission = (data) => request.post(`/sys/permission/${data.id}`, data)

/** 删除权限 */
export const delPermission = (id) => request.delete(`/sys/permission/${id}`)
