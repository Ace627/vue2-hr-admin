import layout from '@/layout'

export default {
  path: '/attendance',
  component: layout,
  children: [
    {
      path: '',
      name: 'Attendance',
      component: () => import('@/views/attendance'),
      meta: { title: '考勤', icon: 'excel' },
    },
  ],
}
