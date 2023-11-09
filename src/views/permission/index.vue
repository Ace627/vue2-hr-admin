<template>
  <div class="app-content">
    <el-button class="mb-16" size="mini" type="primary" @click="addPermission(0, 1)">添加权限</el-button>

    <el-table default-expand-all :data="list" row-key="id" :tree-props="{ children: 'children' }">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限标识" />
      <el-table-column label="状态">
        <template v-slot="{ row }">
          <el-tag size="small" v-if="row.enVisible === '1'">正常</el-tag>
          <el-tag size="small" v-if="row.enVisible === '0'" type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="权限描述" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button v-if="row.type === 1" type="text" @click="addPermission(row.id, 2)">添加</el-button>
          <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
          <el-button type="text" @click="delPermission(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog :title="`${showText}权限点`" :visible="showDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, updatePermission, addPermission, getPermissionDetail, delPermission } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  components: {},
  data() {
    return {
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0', // 默认关闭
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }],
      },
      showDialog: false,
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    },
  },
  methods: {
    async getPermissionList() {
      const { data } = await getPermissionList()
      this.list = transListToTreeData(data, 0) // 将列表数据转化成树形结构
      console.log('this.list: ', this.list)
    },

    addPermission(pid, type) {
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },

    btnOK() {
      this.$refs.perForm
        .validate()
        .then(() => {
          if (this.formData.id) {
            return updatePermission(this.formData)
          }
          return addPermission(this.formData)
        })
        .then(() => {
          //  提示消息
          this.$message.success('新增成功')
          this.getPermissionList()
          this.showDialog = false
        })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0', // 默认关闭
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    },

    async editPermission(id) {
      // 根据获取id获取详情
      const { data } = await getPermissionDetail(id)
      this.formData = data
      this.showDialog = true
    },

    // 删除操作
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getPermissionList() // 获取权限列表
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  text-align: center !important;
}
</style>
