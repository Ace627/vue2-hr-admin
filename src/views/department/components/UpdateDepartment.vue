<template>
  <el-dialog :title="title" :visible="showDialog" @close="onClose" :close-on-click-modal="false">
    <el-form :model="deptForm" ref="deptFormRef" :rules="deptFormRules" size="mini" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="deptForm.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="deptForm.code" placeholder="请输入部门编码" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="deptForm.managerId" placeholder="请选择部门负责人" style="width: 100%">
          <!-- 下拉选项 循环 负责人数据 label 表示显示的字段 value 存储字段 -->
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="deptForm.introduce" placeholder="请输入部门介绍" type="textarea" size="mini" :rows="4" />
      </el-form-item>
      <el-form-item>
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="submitDeptForm" :loading="deptForm.loading">
          <span v-if="deptForm.loading">提交中</span>
          <span v-else>确定</span>
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getManagerList, addDepartment, getDepartment, getDepartmentDetail, updateDepartment } from '@/api/department'

export default {
  name: 'UpdateDepartment',
  props: {
    showDialog: { type: Boolean, default: false },
    currentNodeId: { type: Number, default: 0 },
  },
  data() {
    return {
      managerList: [], // 存储负责人列表
      deptForm: {},
      deptFormRules: {
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码的长度为 2~10 个字符', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              let { data } = await getDepartment()
              if (this.deptForm.id) data = data.filter((v) => v.id !== this.deptForm.id)
              data.some((item) => item.code === value) ? callback(new Error('此部门编码已存在')) : callback()
            },
            trigger: 'blur',
          },
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍的长度为 1~100 个字符', trigger: 'blur' },
        ],
        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称的长度为 2~10 个字符', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              let { data } = await getDepartment()
              if (this.deptForm.id) data = data.filter((v) => v.id !== this.deptForm.id)
              data.some((item) => item.name === value) ? callback(new Error('此部门名称已存在')) : callback()
            },
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    title() {
      return this.deptForm.id ? `更新部门` : `新增部门`
    },
  },
  methods: {
    initDeptForm() {
      this.deptForm = {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人 id
        name: '', // 部门名称
        pid: '', // 父级部门的 id
        loading: false,
      }
    },
    /** 关闭弹框 */
    onClose() {
      if (this.deptForm.loading) return void 0
      this.$refs.deptFormRef.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.roleForm = { name: '', description: '', state: 0 }
      this.initDeptForm()
      this.$emit('update:showDialog', false)
    },

    /** 提交表单 */
    async submitDeptForm() {
      try {
        this.deptForm.loading = true
        await this.$refs.deptFormRef.validate() // 对整个表单进行校验
        if (this.deptForm.id) {
          await updateDepartment(this.deptForm)
        } else {
          await addDepartment({ ...this.deptForm, pid: this.currentNodeId }) // 调用接口 新增部门
        }
        this.$emit('updateDepartment') // 通知父组件更新
        this.$message.success(`${this.title}成功`) // 提示消息
        this.deptForm.loading = false
        this.onClose()
      } catch (error) {
        this.deptForm.loading = false
        console.log('error: ', error)
      }
    },

    /** 获取部门负责人列表 */
    async getManagerList() {
      const { data } = await getManagerList()
      this.managerList = data
    },

    /** 获取部门详情 */
    async getDepartmentDetail() {
      const { data } = await getDepartmentDetail(this.currentNodeId)
      this.deptForm = data
      this.deptForm.loading = false
    },
  },
  created() {
    this.initDeptForm()
    this.getManagerList() // 获取部门负责人列表
  },
}
</script>

<style lang="scss" scoped>
.el-button {
  width: 120px;
}
</style>
