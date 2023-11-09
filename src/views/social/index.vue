<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <template v-slot:before>
          本月{{ tips.dateRange }}：社保在缴 {{ tips.socialSecurityCount }} 公积金在缴 {{ tips.providentFundCount }} 增员 {{ tips.newsCount }} 减员 {{ tips.reducesCount }} 入职
          {{ tips.worksCount }} 离职 {{ tips.leavesCount }}
        </template>
        <template>
          <el-button size="mini" type="danger" @click="$router.push('/social_securitys/historicalArchiving')">历史归档</el-button>
          <el-button size="mini" type="primary" @click="$router.push(`/social_securitys/monthStatement?yearMonth=${yearMonth}`)">{{ yearMonth }}报表</el-button>
        </template>
      </page-tools>
      <!-- 筛选组件 -->
      <SocialTool />

      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column prop="username" label="姓名" sortable />
          <el-table-column prop="mobile" label="手机" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="departmentName" label="部门" sortable width="180" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column prop="leaveTime" label="离职时间" sortable />
          <el-table-column :formatter="getCity" prop="participatingInTheCity" label="社保城市" width="180" />
          <el-table-column :formatter="getCity" prop="providentFundCity" label="公积金城市" width="180" />
          <el-table-column :formatter="getBase" prop="socialSecurityBase" label="社保基数" />
          <el-table-column :formatter="getBase" prop="providentFundBase" label="公积金基数" />
          <!-- <el-table-column label="操作">
            <template v-slot:default="obj">
              <el-button type="text" size="mini" @click="$router.push(`/social_securitys/detail/${obj.row.id}`)">查看详情</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-row type="flex" align="middle" justify="center" style="height: 60px">
          <el-pagination :total="page.total" :current-page="page.page" :page-size="page.pageSize" layout="prev, pager, next" @current-change="pageChange" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getSettings } from '@/api/social'
import { getEmployeeList } from '@/api/salary'
import SocialTool from './components/social-tool'
import pageTools from './components/page-tools.vue'

export default {
  name: 'SocialTableIndex',
  components: { SocialTool, pageTools },
  data() {
    return {
      list: [],
      yearMonth: '',
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      selectParams: {},
      tips: {},
      loading: false,
    }
  },
  created() {
    // 获取社保列表
    this.getSocialList() // 获取列表数据
    this.getSettings()
  },
  methods: {
    getBase() {
      return [3000, 5000, 6000, 8000, 10000, 12000, 15000, 16000][Math.floor(Math.random() * 8)]
    },
    getCity() {
      return ['北京', '上海', '深圳', '天津', '重庆', '珠海', '广州', '西安'][Math.floor(Math.random() * 8)]
    },
    async getSettings() {
      const { data } = await getSettings()
      this.yearMonth = data.dataMonth
    },
    goDetail(row, event, column) {
      this.$router.push({ path: 'detail' })
    },
    async getSocialList() {
      try {
        const { data } = await getEmployeeList({ ...this.page, ...this.selectParams })
        this.list = data.rows // 列表数据
        this.page.total = data.total // 总数
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    changeSelectParams(selectParams) {
      this.selectParams.departmentChecks = selectParams.departmentChecks
      this.selectParams.providentFundChecks = selectParams.providentFundChecks
      this.selectParams.socialSecurityChecks = selectParams.socialSecurityChecks
      this.page.page = 1
      this.getSocialList()
    },
    pageChange(page) {
      this.page.page = page // 当前
      this.getSocialList() // 获取列表数据
    },
    // 导出
    handleExport() {
      // GaolyQQ待实现
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-bod-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid #ebeef5;
}
</style>
