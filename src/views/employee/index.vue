<template>
  <div class="app-content">
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
      <el-row class="opeate-tools" type="flex" justify="start">
        <el-button plain size="small" type="primary" icon="el-icon-plus">新增</el-button>
        <el-button plain size="small" icon="el-icon-upload2" type="info">导入</el-button>
        <el-button plain size="small" icon="el-icon-download" type="warning">导出</el-button>
      </el-row>
      <!-- 表格组件 -->
      <!-- 分页 -->
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Employee',
  components: {},
  data() {
    return {
      depts: [],
      defaultProps: { children: 'children', label: 'name' },
      // 部门名称
      deptName: undefined,
      // 查询参数
      queryParams: {
        departmentId: undefined,
      },
    }
  },
  methods: {
    /** 获取部门列表 */
    async getDepartment() {
      const { data } = await getDepartment()
      this.depts = transListToTreeData(data, 0)
      this.queryParams.departmentId = this.depts[0].id
      // 设置选中节点 树组件渲染是异步的 等到更新完毕
      this.$nextTick(() => {
        this.$refs.treeRef.setCurrentKey(this.queryParams.departmentId)
      })
    },

    /** 节点单击事件 */
    handleNodeClick(data) {
      console.log('data: ', data)
      this.queryParams.departmentId = data.id
      console.log('this.queryParams.departmentId: ', this.queryParams.departmentId)
    },

    /** 筛选节点 */
    filterNode(value, data) {
      if (!value) return true
      return data.name.includes(value)
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
