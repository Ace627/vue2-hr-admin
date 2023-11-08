import request from '@/utils/request'

/**
 * 获取-员工列表
 *  注意1: 头像地址是腾讯云对象存储完整地址
 *  注意2: 头像是其他人传到他们自己的阿里云对象存储中返回的地址
 *  存储到了数据库里, 但是图片文件真身被其他人删除了, 此地址还在但是文件不在了会报404(暂不用解决)
 */
export const getEmployeeList = (params) => request.get(`/sys/user`, { params })

/** 获取员工基本信息 */
export const getEmployeeDetail = (id) => request.get(`/sys/user/${id}`)

/** 批量-导出员工 Excel */
export const exportEmployee = () => request.get(`/sys/user/export`, { responseType: 'blob' })

/** 下载导入员工模板 Excel */
export const getExportTemplate = () => request.get(`/sys/user/import/template`, { responseType: 'blob' })

/** 批量导入员工 */
export const uploadExcel = (data) => request.post(`/sys/user/import`, data, { headers: { 'Content-Type': 'multipart/form-data' } })

/** 删除员工 */
export const delEmployee = (id) => request.delete(`/sys/user/${id}`)

/** 修改员工基本信息 注意1: 手机号不允许更改(因为用户登录需要此手机号) */
export const updateEmployee = (data) => request.put(`/sys/user/${data.id}`, data)

/** 新增员工 */
export const addEmployee = (data) => request.post(`/sys/user`, data)
