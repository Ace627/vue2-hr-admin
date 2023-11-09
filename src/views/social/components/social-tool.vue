<template>
  <div class="cont-top-box">
    <el-form label-width="100px">
      <el-form-item label="部门">
        <el-checkbox-group v-model="departmentChecks" style="display: inline-block">
          <el-checkbox v-for="item in departmentList" :key="item.id" :label="item.id" @change="checkChange">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="社保城市">
        <el-checkbox-group v-model="socialSecurityChecks" style="display: inline-block">
          <el-checkbox v-for="item in cityList" :key="item" :label="item" @change="checkChange">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="公积金城市">
        <el-checkbox-group v-model="providentFundChecks" style="display: inline-block">
          <el-checkbox v-for="item in cityList" :key="item" :label="item" @change="checkChange">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'

export default {
  name: 'SocialTool',
  data() {
    return {
      tips: {},
      keyword: '',
      departmentChecks: [],
      socialSecurityChecks: [],
      providentFundChecks: [],
      cityList: ['北京', '上海', '深圳', '天津', '重庆', '珠海', '广州', '西安'],
      departmentList: [],
    }
  },
  created: function () {
    this.getCityList()
    this.getDepartment()
  },
  methods: {
    // 获取城市
    async getCityList() {
      // this.cityList = []
    },
    // 获取组织架构
    async getDepartment() {
      const { data } = await getDepartment()
      this.departmentList = data
    },
    checkChange() {
      const selectParams = {
        departmentChecks: this.departmentChecks,
        socialSecurityChecks: this.socialSecurityChecks,
        providentFundChecks: this.providentFundChecks,
      }
      this.$parent.changeSelectParams && this.$parent.changeSelectParams(selectParams)
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-top-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
