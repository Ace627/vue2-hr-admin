import layout from '@/layout'

export default {
  path: '/role',
  component: layout,
  children: [
    {
      path: '',
      name: 'Role',
      component: () => import('@/views/role'),
      meta: { title: '角色管理', icon: 'setting' },
    },
  ],
}
