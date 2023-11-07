<template>
  <div class="app-content">
    <!-- 展示树形结构 -->
    <el-tree default-expand-all :data="depts" :props="defaultProps">
      <!-- 自定义树节点的内容，参数为 { node, data } -->
      <template v-slot="{ data }">
        <el-row type="flex" justify="space-between" align="middle" style="width: 100%; height: 40px">
          <el-col :sapn="8">{{ data.name }}</el-col>
          <el-col :span="6">
            <span class="tree-manager">{{ data.managerName }}</span>
            <!-- $event 实参 表示类型 -->
            <el-dropdown>
              <!-- 显示区域内容 -->
              <span class="el-dropdown-link">
                <span>操作</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <!-- 下拉菜单选项 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </template>
    </el-tree>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Department',
  components: {},
  data() {
    return {
      // 树状图的展示数据
      depts: [],
      // 树状图展示的配置选项
      defaultProps: {
        children: 'children', // 指定子树为节点对象的某个属性值
        label: 'name', // 指定节点标签为节点对象的某个属性值
      },
    }
  },
  methods: {
    /** 获取部门列表 */
    async getDepartment() {
      const { data } = await getDepartment()
      this.depts = transListToTreeData(data, 0)
      console.log('this.depts: ', this.depts)
    },
  },
  created() {
    this.getDepartment()
  },
}
</script>

<style lang="scss" scoped>
.app-content {
  font-size: 14px;

  .tree-manager {
    display: inline-block;
    width: 80px;
    margin: 10px;
  }
}
</style>
