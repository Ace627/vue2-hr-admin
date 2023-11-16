## 项目拉取

```bash
git clone https://github.com/Ace627/vue2-hr-admin.git

yarn install

yarn dev
```

- [线上预览](http://123.56.66.106/hr-admin-vue2)

## 项目目录

```bash
├── src                        # 源代码目录
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
│   └── settings.js            # 配置文件
```

## 业务模块

```bash
|- approval          # 审批管理
|- attendance        # 考勤管理
|- department        # 组织架构
|- employee          # 员工管理
|- permission        # 权限管理
|- role              # 角色管理
|- salary            # 薪资管理
|- social            # 社保管理
```

## 参考文献

- [黑马前端-新版人力资源课程讲义](https://www.yuque.com/shuiruohanyu/agxcua)
- [黑马前端-新版人力资源接口文档](https://apifox.com/apidoc/shared-e2644216-aad4-4529-a630-78f0631ab076/api-45197376)
- [参考开源框架](https://github.com/PanJiaChen/vue-admin-template)
