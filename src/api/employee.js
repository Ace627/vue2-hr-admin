import request from '@/utils/request'

/**
 * 获取-员工列表
 *  注意1: 头像地址是腾讯云对象存储完整地址
 *  注意2: 头像是其他人传到他们自己的阿里云对象存储中返回的地址
 *  存储到了数据库里, 但是图片文件真身被其他人删除了, 此地址还在但是文件不在了会报404(暂不用解决)
 */
export const getEmployeeList = (params) => request.get(`/sys/user`, { params })
