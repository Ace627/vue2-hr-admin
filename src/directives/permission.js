import store from '@/store'

export default {
  // 在指令作用的元素插入之后执行
  inserted(el, binding, vnode) {
    const bindingValue = binding.value
    if (bindingValue && bindingValue instanceof Array && bindingValue.length > 0) {
      const points = store.state.user.userInfo?.roles?.points || []
      const hasPermission = points.some((point) => bindingValue.includes(point))
      !hasPermission && el.remove()
    } else {
      throw new Error(`请设置角色权限标签值，例如 ['admin']`)
    }
  },
}
