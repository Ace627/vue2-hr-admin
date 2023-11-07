import layout from '@/layout'

export default {
  path: '/department',
  component: layout, // 一级路由
  children: [
    {
      path: '',
      component: () => import('@/views/department'), // 按需加载
      name: 'Department', // 可以用来跳转 也可以用来标记路由
      // 路由原信息 存储数据的
      meta: { icon: 'tree', title: '部门管理' },
    },
  ],
}
