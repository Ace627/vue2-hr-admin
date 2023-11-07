import request from '@/utils/request'

/** 获取部门列表 */
export const getDepartment = () => request.get(`/company/department`)

/** 获取部门负责人列表 */
export const getManagerList = () => request.get(`/sys/user/simple`)

/** 新增部门 */
export const addDepartment = data => request.post(`/company/department`, data)
