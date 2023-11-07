import request from '@/utils/request'

/** 获取部门列表 */
export const getDepartment = () => request.get(`/company/department`)
