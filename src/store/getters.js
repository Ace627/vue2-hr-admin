export default {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device, // 设备类型
  token: state => state.user.token, // 登录凭证
  userId: state => state.user.userInfo.userId, // 当前登录用户的 id
  avatar: state => state.user.userInfo.staffPhoto, // 用户头像
  name: state => state.user.userInfo.username, // 用户名
}
