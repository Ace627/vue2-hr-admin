<template>
  <div class="app-content">
    <el-card class="mb-16">
      <el-button size="mini" type="primary" icon="el-icon-plus" plain @click="showDialog = true">新增</el-button>
    </el-card>

    <el-card>
      <el-table :data="list" highlight-current-row>
        <el-table-column align="center" width="200" label="角色编号" prop="id" />
        <el-table-column align="center" width="200" label="角色名称" prop="name" show-overflow-tooltip />
        <el-table-column align="center" width="200" label="状态">
          <template v-slot="{ row }">
            <el-switch v-model="row.state" disabled :active-value="1" :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" prop="description" show-overflow-tooltip />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-link type="primary">修改</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="delRole(row)">删除</el-link>
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

    <el-dialog width="500px" title="新增角色" :visible.sync="showDialog" :close-on-click-modal="false" :before-close="onClose">
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
  </div>
</template>

<script>
import { getRoleList, addRole, delRole } from '@/api/role'

export default {
  name: 'Role',
  components: {},
  data() {
    return {
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
  methods: {
    /** 获取-分页查询角色列表 */
    async getRoleList() {
      const { pageNo: page, pageSize: pagesize } = this
      const { data } = await getRoleList({ page, pagesize })
      this.total = data.total
      this.list = data.rows
    },

    /** currentPage 改变时会触发 */
    changePageNo(pageNo) {
      this.pageNo = pageNo
      this.getRoleList()
    },

    /** pageSize 改变时会触发 */
    changePageSize(pageSize) {
      this.pageSize = pageSize
      this.pageNo = 1
      this.getRoleList()
    },

    /** 关闭前的回调，会暂停 Dialog 的关闭 */
    onClose() {
      this.$refs.roleFormRef.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.showDialog = false
    },

    /** 提交角色数据表单 */
    async submitRoleForm() {
      try {
        await this.$refs.roleFormRef.validate()
        await addRole(this.roleForm)
        this.getRoleList()
        this.$message.success(`角色新增成功`)
        this.onClose()
      } catch (error) {
        console.log('error: ', error)
      }
    },

    async mockRoleList(count = 10) {
      for (let i = 0; i < count; i++) {
        const data = {}
        const timestamp = Date.now()
        data.name = `测试角色 ${timestamp}`
        data.description = `测试角色 ${timestamp} 的描述信息`
        data.state = Math.random() > 0.5 ? 1 : 0
        await addRole(data)
        console.log(`测试角色 ${timestamp} 添加完成`)
      }
    },

    /** 删除角色 */
    async delRole(record) {
      try {
        await this.$confirm(`是否确认删除角色 ${record.name}`, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        await delRole(record.id)
        this.$message.success(`角色删除成功`)
      } catch (error) {
        console.log('error: ', error)
      }
    },
  },
  created() {
    this.getRoleList() // 获取-分页查询角色列表
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  // margin: 16px auto;
}

.el-form .el-button {
  width: 100px;
}
</style>
