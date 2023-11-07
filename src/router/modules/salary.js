import layout from '@/layout'

export default {
  path: '/salary',
  component: layout,
  children: [
    {
      path: '',
      name: 'Salary',
      component: () => import('@/views/salary'),
      meta: { title: '工资', icon: 'money' },
    },
  ],
}
