<template>
  <div class="app-content">
    <el-form :model="userForm" size="small" label-width="100px" :rules="userFormRules" ref="userFormRef">
      <el-form-item label="员工姓名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="员工工号" prop="workNumber">
        <el-input v-model="userForm.workNumber" placeholder="请输入员工工号" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="userForm.mobile" placeholder="请输入手机号码" :disabled="!employeeId"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="departmentId">
        <el-select v-model="userForm.departmentId" placeholder="请选择所属部门"></el-select>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-radio v-model="userForm.formOfEmployment" :label="1">正式</el-radio>
        <el-radio v-model="userForm.formOfEmployment" :label="2">非正式</el-radio>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="userForm.timeOfEntry" type="date" placeholder="请选择入职时间" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="userForm.correctionTime" type="date" placeholder="请选择转正时间" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="员工头像"></el-form-item>
      <el-form-item>
        <el-button @click="submitUserForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addEmployee, updateEmployee, getEmployeeDetail } from '@/api/employee'

export default {
  name: 'EmployeeDetail',

  components: {},
  data() {
    return {
      userForm: {
        username: '', // 用户名
        mobile: '', // 手机号码
        workNumber: '', // 员工工号
        formOfEmployment: '', // 聘用形式
        departmentId: '', // 部门 id
        timeOfEntry: '', // 入职时间
        correctionTime: '', // 转正时间
      },
      userFormRules: {
        formOfEmployment: [{ required: true, message: '请输入聘用形式', trigger: 'blur' }],
        departmentId: [{ required: true, message: '请输入所属部门', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'change' }],
        username: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 1, max: 4, message: '姓名长度 1~4 位', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号码格式错误', trigger: 'blur' },
        ],
        correctionTime: [
          { required: true, message: '请选择转正时间', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!this.userForm.timeOfEntry) callback()
              new Date(this.userForm.timeOfEntry) > new Date(value) ? callback(new Error('转正时间不能小于入职时间')) : callback()
            },
            trigger: 'change',
          },
        ],
      },
    }
  },
  computed: {
    // 员工id
    employeeId() {
      return this.$route.params.id || null
    },
  },
  methods: {
    async getEmployeeDetail() {
      const { data } = await getEmployeeDetail(this.employeeId)
      this.userForm = data
    },

    async submitUserForm() {
      try {
        console.log('this.userForm : ', this.userForm)
        await this.$refs.userFormRef.validate()
      } catch (error) {
        console.log('error: ', error)
      }
    },
  },
  created() {
    this.employeeId && this.getEmployeeDetail()
  },
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 320px;
}

.el-select {
  width: 320px;
}

.el-button {
  width: 120px;
}
</style>
