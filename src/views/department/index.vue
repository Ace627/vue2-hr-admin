<template>
  <div class="app-content">
    <!-- 展示树形结构 -->
    <!-- expand-on-click-node=false 点击树不可以折叠，只有点击折叠展开图标才可以 -->
    <el-tree default-expand-all :expand-on-click-node="false" :data="depts" :props="defaultProps">
      <!-- 自定义树节点的内容，参数为 { node, data } -->
      <template v-slot="{ data }">
        <el-row type="flex" justify="space-between" align="middle" style="width: 100%; height: 40px">
          <el-col :sapn="8">{{ data.name }}</el-col>
          <el-col :span="6">
            <span class="tree-manager">{{ data.managerName }}</span>
            <!-- $event 实参 表示类型 -->
            <el-dropdown @command="operateDept($event, data.id)">
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
      // 树状图的展示数据
      depts: [],
      // 树状图展示的配置选项
      defaultProps: {
        children: 'children', // 指定子树为节点对象的某个属性值
        label: 'name', // 指定节点标签为节点对象的某个属性值
      },
      showDialog: false, // 编辑/新增/查看弹框是否展示
      currentNodeId: null, // 存储当前点击的id
    }
  },
  methods: {
    /** 获取部门列表 */
    async getDepartment() {
      const { data } = await getDepartment()
      this.depts = transListToTreeData(data, 0)
    },

    /** 删除部门详情 */
    async delDepartment(id) {
      try {
        await this.$confirm('此操作将永久删除该部门, 是否继续?', '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        await delDepartment(id)
        await this.getDepartment()
        this.$message.success('删除部门成功')
      } catch (error) {
        console.log('error: ', error)
      }
    },

    /** 获取下拉操作的指令 */
    operateDept(command, id) {
      if (command === 'add') {
        // 新增部门
        this.currentNodeId = id
        this.showDialog = true
      } else if (command === 'del') {
        // 删除部门
        this.delDepartment(id)
      } else if (command === 'edit') {
        // 编辑部门
        this.currentNodeId = id
        this.showDialog = true
        this.$nextTick(() => this.$refs.updateDepartmentRef.getDepartmentDetail())
      }
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
