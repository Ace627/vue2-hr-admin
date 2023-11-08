<template>
  <div class="app-content">
    <el-card class="mb-16">
      <el-button size="mini" type="primary" icon="el-icon-plus" plain>新增</el-button>
    </el-card>

    <el-card>
      <el-table :data="list" highlight-current-row>
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
        <el-pagination
          background
          :layout="layout"
          :page-sizes="pageSizeList"
          :total="total"
          :current-page="pageNo"
          :page-size="pagesize"
          @current-change="changePageNo"
          @size-change="changePageSize"
        />
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
      pageNo: 1, // 当前页数
      pagesize: 10, // 每页显示条目个数
      total: 0, // 总条目数
      pageSizeList: [10, 20, 30, 40, 50],
      layout: 'total, sizes, prev, pager, next, jumper', // 组件布局，子组件名用逗号分隔
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

    /** currentPage 改变时会触发 */
    changePageNo(pageNo) {
      this.pageNo = pageNo
      this.getRoleList()
    },

    /** pageSize 改变时会触发 */
    changePageSize(pagesize) {
      this.pagesize = pagesize
      this.pageNo = 1
      this.getRoleList()
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
