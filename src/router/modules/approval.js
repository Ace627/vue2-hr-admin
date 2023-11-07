import layout from '@/layout'

export default {
  path: '/approval',
  component: layout,
  children: [
    {
      path: '',
      name: 'Approval',
      component: () => import('@/views/approval'),
      meta: { title: '审批', icon: 'tree-table' },
    },
  ],
}
