<template>
  <div class="app-content">
    <el-card class="mb-16">
      <el-button size="mini" type="primary" icon="el-icon-plus" plain>新增</el-button>
    </el-card>

    <el-card>
      <el-table :data="list">
        <el-table-column align="center" width="200" label="角色编号" prop="id" />
        <el-table-column align="center" width="200" label="角色名称" prop="name" />
        <el-table-column align="center" width="200" label="状态">
          <template v-slot="{ row }">
            <span> {{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }} </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" prop="description" show-overflow-tooltip />
        <el-table-column align="center" label="操作">
          <template v-slot="{}">
            <el-link type="primary">修改</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end items-center mt-16">
        <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :current-page="pageNo" :page-size="pagesize" />
      </div>
    </el-card>
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
  // margin: 16px auto;
}

a {
}
</style>
