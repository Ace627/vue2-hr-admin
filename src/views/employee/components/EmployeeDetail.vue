<template>
  <div class="app-content">
    <el-form :model="userForm">
      <el-form-item></el-form-item>
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
      userForm: {},
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
      console.log('this.userForm : ', this.userForm)
    },

    async submitUserForm() {
      try {
        await this.$refs.userFormRef.validate()
      } catch (error) {
        console.log('error: ', error)
      }
    },
  },
  mounted() {
    this.getEmployeeDetail()
  },
}
</script>

<style lang="scss" scoped></style>
