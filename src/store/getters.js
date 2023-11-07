const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device, // 设备类型
  token: state => state.user.token, // 登录凭证
  avatar: state => state.user.avatar, // 头像
  name: state => state.user.name, // 昵称
}

export default getters
