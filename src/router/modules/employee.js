import layout from '@/layout'

export default {
  path: '/employee',
  component: layout,
  children: [
    {
      path: '',
      name: 'Employee',
      component: () => import('@/views/employee'),
      meta: { title: '员工管理', icon: 'people' },
    },
    {
      path: '/employee/detail/:id?',
      name: 'EmployeeDetail',
      component: () => import('@/views/employee/components/EmployeeDetail.vue'),
      hidden: true, // 隐藏左侧菜单
      meta: { title: '员工详情' },
    },
  ],
}
