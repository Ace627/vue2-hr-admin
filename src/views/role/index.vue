<template>
  <div class="app-content">
    <div>
      <el-button size="mini" type="primary" icon="el-icon-plus" plain>新增</el-button>
    </div>

    <el-table :data="list">
      <el-table-column align="center" width="200" label="角色编号" prop="id" />
      <el-table-column align="center" width="200" label="角色名称" prop="name" />
      <el-table-column align="center" width="200" label="状态">
        <template v-slot="{ row }">
          <span> {{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" prop="description" />
      <el-table-column align="center" label="操作" />
    </el-table>

    <div class="flex justify-end items-center">
      <el-pagination layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'

export default {
  name: 'Role',
  components: {},
  data() {
    return {
      pageNo: 1, // 当前页码数
      pagesize: 1, // 当前页面需要的数据条数
      total: 0,
      list: [],
    }
  },
  methods: {
    /** 获取-分页查询角色列表 */
    async getRoleList() {
      const { data } = await getRoleList({ page: this.pageNo, pagesize: this.pagesize })
      this.total = data.total
      this.list = data.rows
    },
  },
  created() {
    this.getRoleList() // 获取-分页查询角色列表
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  margin: 16px auto;
}
</style>
