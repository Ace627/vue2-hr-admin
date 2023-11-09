import layout from '@/layout'

export default {
  path: '/permission',
  component: layout,
  children: [
    {
      path: '',
      name: 'Permission',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' },
    },
  ],
}
