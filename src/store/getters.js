export default {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device, // 设备类型
  token: state => state.user.token, // 登录凭证
  userId: state => state.user.userInfo.userId, // 登录凭证
}
