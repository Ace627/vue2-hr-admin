<template>
  <div class="app-content">
    <div class="left">
      <el-input class="mb-16" type="text" prefix-icon="el-icon-search" size="small" placeholder="请输入部门名称" />
      <!-- 树形组件 -->
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
export default {
  name: 'Employee',
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {},
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
