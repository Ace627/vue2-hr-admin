<template>
  <div class="app-content">
    <nav class="mb-16">
      <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd({ id: firstDeptId })">新增</el-button>
      <el-button type="info" plain icon="el-icon-sort" size="mini" @click="toggleExpandAll">展开/折叠</el-button>
    </nav>

    <el-table v-loading="loading" v-if="refreshTable" :data="deptList" row-key="id" :default-expand-all="isExpandAll" :tree-props="{ children: 'children' }">
      <el-table-column align="center" label="部门编码" prop="code" />
      <el-table-column align="center" label="部门名称" prop="name" />
      <el-table-column align="center" label="部门主管" prop="managerName" />
      <el-table-column align="center" label="部门简介" prop="introduce" />
      <el-table-column align="center" label="操作">
        <template v-slot="{ row }">
          <el-link type="primary" @click="handleAdd(row)">新增</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="warning" @click="handleUpdate(row)">编辑</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm :title="`是否确认删除部门 “${row.name}”`" @confirm="handleDelete(row)">
            <el-link type="danger" slot="reference">删除</el-link>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 使用 sync 修饰符，可以监听子组件传过来的 update:属性名 的事件，直接将父组件的值进行修改 -->
    <UpdateDepartment ref="updateDepartmentRef" :showDialog.sync="showDialog" :currentNodeId="currentNodeId" @updateDepartment="getDepartment" />
  </div>
</template>

<script>
import { getDepartment, delDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import UpdateDepartment from './components/UpdateDepartment'

export default {
  name: 'Department',
  components: { UpdateDepartment },
  data() {
    return {
      /** 表格加载遮罩层 */
      loading: true,
      /** 是否展开，默认全部展开 */
      isExpandAll: true,
      /** 重新渲染表格状态 */
      refreshTable: true,
      /** 表格树数据 */
      deptList: [],
      /** 是否显示弹出层 */
      showDialog: false,
      /** 存储当前点击的id */
      currentNodeId: null,
    }
  },
  computed: {
    /** 最顶级的部门的 id 无则默认 0 */
    firstDeptId() {
      return this.deptList[0]?.id || 0
    },
  },
  methods: {
    /** 查询部门列表 */
    async getDepartment() {
      this.loading = true
      const { data } = await getDepartment()
      this.deptList = transListToTreeData(data, 0)
      this.loading = false
    },

    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false
      this.isExpandAll = !this.isExpandAll
      this.$nextTick(() => (this.refreshTable = true))
    },

    /** 新增按钮操作 */
    handleAdd(row) {
      this.currentNodeId = row.id
      this.showDialog = true
    },

    /** 删除按钮操作 */
    async handleDelete(row) {
      await delDepartment(row.id)
      await this.getDepartment()
      this.$message.success('删除部门成功')
    },

    /** 编辑按钮操作 */
    handleUpdate(row) {
      this.currentNodeId = row.id
      this.showDialog = true
      this.$nextTick(() => this.$refs.updateDepartmentRef.getDepartmentDetail())
    },
  },
  created() {
    this.getDepartment() // 查询部门列表
  },
}
</script>

<style lang="scss" scoped></style>
