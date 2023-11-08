<template>
  <div class="app-content">
    <!-- 部门数据 -->
    <div class="left">
      <el-input class="mb-16" type="text" v-model="deptName" prefix-icon="el-icon-search" size="small" placeholder="请输入部门名称" clearable />
      <el-tree
        default-expand-all
        ref="treeRef"
        node-key="id"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        :data="depts"
        :props="defaultProps"
        highlight-current
        @node-click="handleNodeClick"
      ></el-tree>
    </div>

    <div class="right">
      <!-- 员工筛选表单 -->
      <el-form :model="queryParams" ref="queryFormRef" size="small" inline label-width="68px">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="queryParams.keyword" placeholder="请输入用户名称" clearable style="width: 240px" @clear="handleQuery" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row class="opeate-tools" type="flex" justify="start">
        <el-button plain size="small" type="primary" icon="el-icon-plus">新增</el-button>
        <el-button plain size="small" icon="el-icon-upload2" type="info">导入</el-button>
        <el-button plain size="small" icon="el-icon-download" type="warning">导出</el-button>
      </el-row>

      <el-table :data="list" highlight-current-row>
        <el-table-column align="center" label="头像">
          <template v-slot="{ row }">
            <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30"></el-avatar>
            <el-avatar v-else :size="30">{{ row.username?.charAt(0) }}</el-avatar>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" prop="username" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" label="手机号" sortable prop="mobile" min-width="110" show-overflow-tooltip />
        <el-table-column align="center" label="工号" sortable prop="workNumber" min-width="110" show-overflow-tooltip />
        <el-table-column align="center" label="聘用形式">
          <template v-slot="{ row }">
            <span v-if="row.formOfEmployment === 1">正式</span>
            <span v-else-if="row.formOfEmployment === 2">非正式</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="部门名称" prop="departmentName" min-width="110" show-overflow-tooltip />
        <el-table-column align="center" label="入职时间" sortable prop="timeOfEntry" min-width="100" />
        <el-table-column align="center" label="操作" min-width="200">
          <template>
            <el-link type="primary" icon="el-icon-warning-outline">查看</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="warning" icon="el-icon-edit">角色</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm :title="`是否确认删除角色 `">
              <el-link type="danger" slot="reference" icon="el-icon-delete">删除</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end items-center mt-16">
        <el-pagination
          background
          :layout="layout"
          :page-sizes="pageSizeList"
          :total="total"
          :current-page="queryParams.page"
          :page-size="queryParams.pagesize"
          @current-change="changePageNo"
          @size-change="changePageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { getEmployeeList } from '@/api/employee'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Employee',
  components: {},
  data() {
    return {
      depts: [],
      list: [], // 存储员工列表
      defaultProps: { children: 'children', label: 'name' },
      total: 0, // 总条目数
      pageSizeList: [10, 20, 30, 40, 50],
      layout: 'total, sizes, prev, pager, next, jumper', // 组件布局，子组件名用逗号分隔
      // 部门名称
      deptName: undefined,
      // 查询参数
      queryParams: {
        page: 1, // 当前页码数
        pagesize: 10, // 当前页面需要的数据条数
        keyword: undefined, // 根据名字模糊查询
        departmentId: undefined, // 部门 id,根据部门查询当前部门及子部门的用户
      },
    }
  },
  methods: {
    /** 获取部门列表 */
    async getDepartment() {
      const { data } = await getDepartment()
      this.depts = transListToTreeData(data, 0)
      // this.queryParams.departmentId = this.depts[0].id
      this.queryParams.departmentId = this.depts[0].children[0].id
      // 设置选中节点 树组件渲染是异步的 等到更新完毕
      this.$nextTick(() => {
        this.$refs.treeRef.setCurrentKey(this.queryParams.departmentId)
        this.getEmployeeList()
      })
    },

    /** 节点单击事件 */
    handleNodeClick(data) {
      this.queryParams.departmentId = data.id
      this.getEmployeeList()
    },

    /** 筛选节点 */
    filterNode(value, data) {
      if (!value) return true
      return data.name.includes(value)
    },

    /** 获取员工列表的方法 */
    async getEmployeeList() {
      const { data } = await getEmployeeList(this.queryParams)
      this.list = data.rows
      this.total = data.total
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1
      this.getEmployeeList()
    },

    /** 重置按钮操作 */
    resetQuery() {
      for (const key in this.queryParams) this.queryParams[key] = undefined
      this.queryParams.page = 1
      this.queryParams.pagesize = 10
      // this.queryParams.departmentId = this.depts[0].id
      this.queryParams.departmentId = this.depts[0].children[0].id
      this.handleQuery()
    },

    /** currentPage 改变时会触发 */
    changePageNo(page) {
      this.queryParams.page = page
      this.getEmployeeList()
    },

    /** pageSize 改变时会触发 */
    changePageSize(pagesize) {
      this.queryParams.page = 1
      this.queryParams.pagesize = pagesize
      this.getEmployeeList()
    },
  },
  watch: {
    /** 根据名称筛选部门树 */
    deptName(value) {
      this.$refs.treeRef.filter(value)
    },
  },

  created() {
    this.getDepartment() // 获取部门列表
  },
}
</script>

<style lang="scss" scoped>
.app-content {
  display: flex;
}
.left {
  width: 280px;
  margin-right: 16px;
  padding-right: 16px;
}

.right {
  flex: 1;
}
</style>
