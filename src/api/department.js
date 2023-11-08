import request from '@/utils/request'

/** 获取部门列表 */
export const getDepartment = () => request.get(`/company/department`)

/** 获取部门负责人列表 */
export const getManagerList = () => request.get(`/sys/user/simple`)

/** 新增部门 */
export const addDepartment = (data) => request.post(`/company/department`, data)

/** 获取部门详情 */
export const getDepartmentDetail = (id) => request.get(`/company/department/${id}`)

/** 删除部门详情 */
export const delDepartment = (id) => request.delete(`/company/department/${id}`)

/** 修改部门详情 */
export const updateDepartment = (data) => request.put(`/company/department/${data.id}`, data)
