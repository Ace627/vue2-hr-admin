<template>
  <div class="app-content">
    <el-card class="mb-16">
      <el-button size="mini" type="primary" icon="el-icon-plus" plain @click="showDialog = true">新增</el-button>
      <el-button size="mini" type="warning" icon="el-icon-plus" plain @click="mockRoleList(10)">随机十条</el-button>
    </el-card>

    <el-card>
      <el-table v-loading="loading" :data="list" highlight-current-row>
        <el-table-column align="center" width="200" label="角色编号" prop="id" />
        <el-table-column align="center" width="200" label="角色名称" prop="name" show-overflow-tooltip />
        <el-table-column align="center" width="200" label="状态">
          <template v-slot="{ row }">
            <el-switch v-model="row.state" :active-value="1" :inactive-value="0" @change="handleStatusChange(row)" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" prop="description" show-overflow-tooltip />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-link type="warning" @click="openRoleDialog(row)">修改</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="success" @click="openPermissionDrawer(row)">权限</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm :title="`是否确认删除角色 “${row.name}”`" @confirm="handleDelete(row)">
              <el-link type="danger" slot="reference">删除</el-link>
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
          :current-page="pageNo"
          :page-size="pageSize"
          @current-change="changePageNo"
          @size-change="changePageSize"
        />
      </div>
    </el-card>

    <el-dialog width="500px" :title="dialogTitle" :visible.sync="showDialog" :close-on-click-modal="false" :before-close="onClose">
      <el-form label-width="80px" size="mini" :model="roleForm" ref="roleFormRef" :rules="roleFormRules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="角色名称不能为空" />
        </el-form-item>
        <el-form-item label="角色状态" prop="state">
          <el-radio v-model="roleForm.state" :label="0">停用</el-radio>
          <el-radio v-model="roleForm.state" :label="1">启用</el-radio>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input type="textarea" :rows="3" v-model="roleForm.description" placeholder="角色描述不能为空" />
        </el-form-item>
        <el-form-item>
          <el-button @click="onClose">取消</el-button>
          <el-button type="primary" @click="submitRoleForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 权限分配模态框 -->
    <el-drawer title="分配权限" :visible.sync="showPermissionDrawer">
      <!-- 权限选择树 -->
      <el-tree
        :data="permissionData"
        ref="permissionTreeRef"
        :props="{ label: 'name' }"
        check-strictly
        show-checkbox
        default-expand-all
        node-key="id"
        :defaultCheckedKeys="defaultCheckedKeys"
      />
      <el-divider></el-divider>
      <div class="flex justify-center items-center mt-16">
        <el-button size="small" @click="showPermissionDrawer = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitPermission">提交</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getRoleList, addRole, delRole, getRoleDetail, updateRole, assignRole } from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Role',
  components: {},
  data() {
    return {
      /** 表格加载遮罩层 */
      loading: true,
      roleId: null,
      showPermissionDrawer: false,
      permissionData: [],
      defaultCheckedKeys: [], // 默认勾选的节点的 key 的数组

      pageNo: 1, // 当前页数
      pageSize: 10, // 每页显示条目个数
      total: 0, // 总条目数
      pageSizeList: [10, 20, 30, 40, 50],
      layout: 'total, sizes, prev, pager, next, jumper', // 组件布局，子组件名用逗号分隔
      list: [],
      showDialog: false,
      roleForm: {
        name: '',
        description: '',
        state: 0, // 默认未1启用 关闭 0 打开1
      },
      roleFormRules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }],
      },
    }
  },
  computed: {
    dialogTitle() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    },
  },
  methods: {
    /** 给角色分配权限相关的方法 */
    async openPermissionDrawer(record) {
      this.showPermissionDrawer = true
      this.roleId = record.id
      const { data: roleInfo } = await getRoleDetail(record.id)
      this.defaultCheckedKeys = roleInfo.permIds // 处理默认选中的权限
      const { data } = await getPermissionList()
      this.permissionData = transListToTreeData(data, 0)
    },
    async submitPermission() {
      const id = this.roleId
      const permIds = this.$refs.permissionTreeRef.getCheckedNodes().map((v) => v.id)
      await assignRole({ id, permIds })
      this.$message.success(`权限分配成功`)
      this.defaultCheckedKeys = []
      this.showPermissionDrawer = false
    },

    /** 查询角色列表 */
    async getList() {
      this.loading = true
      const { pageNo: page, pageSize: pagesize } = this
      const { data } = await getRoleList({ page, pagesize })
      this.total = data.total
      this.list = data.rows
      this.loading = false
    },

    /** currentPage 改变时会触发 */
    changePageNo(pageNo) {
      this.pageNo = pageNo
      this.getList()
    },

    /** pageSize 改变时会触发 */
    changePageSize(pageSize) {
      this.pageSize = pageSize
      this.pageNo = 1
      this.getList()
    },

    /** 关闭前的回调，会暂停 Dialog 的关闭 */
    onClose() {
      this.$refs.roleFormRef.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.roleForm = { name: '', description: '', state: 0 }
      this.showDialog = false
    },

    /** 提交角色数据表单 */
    async submitRoleForm() {
      try {
        await this.$refs.roleFormRef.validate()
        this.roleForm.id ? await updateRole(this.roleForm) : await addRole(this.roleForm)
        this.getList()
        this.$message.success(`${this.dialogTitle}成功`)
        this.onClose()
      } catch (error) {
        console.log('error: ', error)
      }
    },

    /** 随机增加 50 条模拟角色数据 */
    async mockRoleList(count) {
      for (let i = 0; i < count; i++) {
        const data = {}
        const timestamp = Date.now()
        data.name = `黑马角色 ${timestamp}`
        // data.description = `黑马角色 ${timestamp} 的描述信息`
        data.description = `测试角色可随意RUD`
        data.state = Math.random() > 0.5 ? 1 : 0
        await addRole(data)
        console.log(`测试角色 ${timestamp} 添加完成`)
      }
      this.getList()
      this.$message.success(`随机数据添加成功`)
    },

    /** 角色状态修改 */
    async handleStatusChange(record) {
      try {
        const text = record.state === 1 ? '启用' : '停用'
        await this.$confirm(`确认要${text}《${record.name}》角色吗？`, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        await updateRole(record)
        this.$message.success(`角色《${record.name}》已成功${text}`)
      } catch (error) {
        console.log('error: ', error)
        record.state = record.state === 1 ? 0 : 1
      }
    },

    /** 删除按钮操作 */
    async handleDelete(record) {
      await delRole(record.id)
      if (this.list.length === 1 && this.pageNo > 1) this.pageNo--
      this.getList()
      this.$message.success(`角色删除成功`)
    },

    /** 点击修改按钮的回调 */
    async openRoleDialog(record) {
      const { data } = await getRoleDetail(record.id)
      this.roleForm = data
      this.showDialog = true
    },
  },
  created() {
    this.getList() // 获取-分页查询角色列表
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__body {
  padding: 0 16px;
  .el-button {
    width: 100px;
  }
}

.el-form .el-button {
  width: 100px;
}
</style>
