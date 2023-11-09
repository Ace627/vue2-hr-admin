import request from '@/utils/request'

/** 获取首页数据 */
export const getHomeData = () => request.get(`/home/data`)

/** 获取通知消息列表 */
export const getMessageList = () => request.get(`/home/notice`)
