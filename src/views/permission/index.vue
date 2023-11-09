<template>
  <div class="app-content">
    <el-button class="mb-16" size="mini" type="primary">添加权限</el-button>

    <el-table default-expand-all :data="list" row-key="id" :tree-props="{ children: 'children' }">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限标识" />
      <el-table-column prop="description" label="权限描述" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button v-if="row.type === 1" size="mini" type="text">添加</el-button>
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  components: {},
  data() {
    return {
      list: [],
    }
  },
  methods: {
    async getPermissionList() {
      const { data } = await getPermissionList()
      this.list = transListToTreeData(data, 0) // 将列表数据转化成树形结构
      console.log('this.list: ', this.list)
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
