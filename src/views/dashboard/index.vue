<template>
  <div class="dashboard">
    <div class="container">
      <!-- 左侧内容 -->
      <div class="left">
        <div class="panel">
          <!-- 个人信息 -->
          <div class="user-info">
            <img class="avatar" v-if="userInfo.staffPhoto" :src="userInfo.staffPhoto" alt="" />
            <img class="avatar" v-else src="../../assets/common/defaultHead.png" alt="" />
            <div class="company-info">
              <div class="title">
                江苏传智播客教育科技股份有限公司
                <span>体验版</span>
              </div>
              <div class="depart">{{ userInfo.username }} ｜ {{ userInfo.company }} - {{ userInfo.departmentName }}</div>
            </div>
          </div>
          <!-- 代办 -->
          <div class="todo-list">
            <div class="todo-item">
              <span>组织总人数</span>
              <!-- 起始值 终点值  滚动时间 -->
              <CountTo :start-val="0" :end-val="homeData.employeeTotal" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>正式员工</span>
              <CountTo :start-val="0" :end-val="homeData.regularEmployeeTotal" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>合同待签署</span>
              <CountTo :start-val="0" :end-val="homeData.contractSignTotal" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>待入职</span>
              <CountTo :start-val="0" :end-val="homeData.toBeEmployed" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>本月待转正</span>
              <CountTo :start-val="0" :end-val="homeData.toBeConfirmed" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>本月待离职</span>
              <CountTo :start-val="0" :end-val="homeData.toBeDismissed" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>接口总访问</span>
              <CountTo :start-val="0" :end-val="homeData.interfaceAccessTotal" :duration="1000" />
            </div>
          </div>
        </div>
        <!-- 快捷入口 -->
        <div class="panel">
          <div class="panel-title">快捷入口</div>
          <div class="quick-entry">
            <div class="entry-item">
              <div class="entry-icon approval" />
              <span>假期审批</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon social" />
              <span>社保管理</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon role" />
              <span>角色管理</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon salary" />
              <span>薪资设置</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon bpm" />
              <span>流程设置</span>
            </div>
          </div>
        </div>
        <!-- 图表数据 -->
        <div class="panel">
          <div class="panel-title">社保申报数据</div>
          <div class="chart-container">
            <div class="chart-info">
              <div class="info-main">
                <span>申报人数</span>
                <CountTo :start-val="0" :end-val="homeData.socialInsurance?.declarationTotal" :duration="1000" />
              </div>
              <div class="info-list">
                <div class="info-list-item">
                  <span>待申报(人)</span>
                  <CountTo :start-val="0" :end-val="homeData.socialInsurance?.toDeclareTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>申报中(人)</span>
                  <CountTo :start-val="0" :end-val="homeData.socialInsurance?.declaringTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>已申报(人)</span>
                  <CountTo :start-val="0" :end-val="homeData.socialInsurance?.declaredTotal" :duration="1000" />
                </div>
              </div>
            </div>
            <div class="chart">
              <!-- 图表 -->
              <div ref="social" style="width: 100%; height: 100%" />
            </div>
          </div>
        </div>
        <!-- 图表数据 -->
        <div class="panel">
          <div class="panel-title">公积金申报数据</div>
          <div class="chart-container">
            <div class="chart-info">
              <div class="info-main">
                <span>申报人数</span>
                <CountTo :start-val="0" :end-val="homeData.providentFund?.declarationTotal" :duration="1000" />
              </div>
              <div class="info-list">
                <div class="info-list-item">
                  <span>待申报(人)</span>
                  <CountTo :start-val="0" :end-val="homeData.providentFund?.toDeclareTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>申报中(人)</span>
                  <CountTo :start-val="0" :end-val="homeData.providentFund?.declaringTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>已申报(人)</span>
                  <CountTo :start-val="0" :end-val="homeData.providentFund?.declaredTotal" :duration="1000" />
                </div>
              </div>
            </div>
            <div class="chart">
              <!-- 图表 -->
              <div ref="provident" style="width: 100%; height: 100%" />
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <!-- 帮助链接 -->
        <div class="panel">
          <div class="help">
            <div class="help-left">
              <div class="panel-title">帮助链接</div>
              <div class="help-list">
                <div class="help-block">
                  <i class="icon-entry" />
                  入门指南
                </div>
                <div class="help-block">
                  <i class="icon-help" />
                  在线帮助手册
                </div>
                <div class="help-block">
                  <i class="icon-support" />
                  联系技术支持
                </div>
                <div class="help-block">
                  <i class="icon-add" />
                  添加链接
                </div>
              </div>
            </div>
            <div class="help-right">
              <div class="calendar">
                <!-- <el-calendar /> -->
                <el-calendar />
              </div>
            </div>
          </div>
        </div>
        <!-- 通知公告 -->
        <div class="panel">
          <div class="panel-title">通知公告</div>
          <div class="information-list">
            <div class="information-list-item" v-for="(v, i) in list" :key="i">
              <img :src="v.icon" alt="" />
              <div>
                <p>
                  <span class="col">{{ v.notice?.split(' ')[0] }}</span>
                  <span>{{ v.notice?.split(' ')[1] + ' ' + v.notice?.split(' ')[2] }}</span>
                </p>
                <p>{{ v.createTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import * as echarts from 'echarts' // 引入所有的 Echarts
import { getHomeData, getMessageList } from '@/api/home'

export default {
  namr: 'Dashboard',
  components: { CountTo },
  data() {
    return {
      homeData: {}, // 存放首页数据的对象
      list: [],
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {}
    },
  },

  methods: {
    async getHomeData() {
      this.homeData = (await getHomeData()).data
    },

    async getMessageList() {
      this.list = (await getMessageList()).data
    },

    echartsResize() {
      this.social.resize()
      this.provident.resize()
    },
  },

  watch: {
    homeData() {
      this.social.setOption({
        xAxis: { type: 'category', boundaryGap: false, data: this.homeData.socialInsurance?.xAxis },
        yAxis: { type: 'value' },
        series: [
          {
            data: this.homeData.socialInsurance?.yAxis,
            type: 'line',
            areaStyle: { color: '#04c9be' }, // 填充颜色
            lineStyle: { color: '#04c9be' }, // 线的颜色
          },
        ],
      })

      this.provident.setOption({
        xAxis: { type: 'category', boundaryGap: false, data: this.homeData.providentFund?.xAxis },
        yAxis: { type: 'value' },
        series: [
          {
            data: this.homeData.providentFund?.yAxis,
            type: 'line',
            areaStyle: { color: '#04c9be' },
            lineStyle: { color: '#04c9be' },
          },
        ],
      })
    },
  },

  created() {
    // 各个请求不相干 并发
    Promise.all([this.getHomeData(), this.getMessageList()])
  },
  mounted() {
    // 获取展示的数据 设置给图表
    // 监听 homeData 的变化
    this.social = echarts.init(this.$refs.social) // 初始化echart
    // data 中没有声明 不是响应式
    this.provident = echarts.init(this.$refs.provident)

    window.addEventListener('resize', this.echartsResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.echartsResize)
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar-day {
  height: 40px;
}
::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}

.dashboard {
  background: #f5f6f8;
  width: 100%;
  min-height: calc(100vh - 80px);

  .date-content {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .date-content .rest {
    color: #fff;
    border-radius: 50%;
    background: rgb(250, 124, 77);
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
  }
  .date-content .text {
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
  }
  ::v-deep .el-calendar-table td.is-selected .text {
    background: #409eff;
    color: #fff;
    border-radius: 50%;
  }
  ::v-deep .el-calendar__header {
    display: none;
  }
  .container {
    display: flex;
    .right {
      width: 40%;
      .panel {
        margin-left: 8px;
      }
      :nth-child(1) {
        margin-top: 0;
      }
    }
    .left {
      flex: 1;
      :nth-child(1) {
        margin-top: 0;
      }
    }
    .panel {
      background-color: #fff;

      margin-top: 8px;
      padding: 20px;
      .panel-title {
        font-size: 16px;
        color: #383c4e;
        font-weight: 500;
      }
      // 用户信息样式
      .user-info {
        display: flex;
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #d9d9d9;
          line-height: 48px;
          text-align: center;
        }
        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #fff;
          margin-right: 4px;
        }
        .company-info {
          margin-left: 10px;
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            color: #383c4e;
            font-weight: 500;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;
            span {
              font-size: 12px;
              background: #f5f6f8;
              text-align: center;
              padding: 2px 8px;
              border-radius: 2px;
              color: #697086;
            }
          }
          .depart {
            font-size: 14px;
            color: #697086;
            font-weight: 400;
          }
        }
      }
      // 代办样式
      .todo-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        .todo-item {
          width: 18%;
          height: 90px;
          display: flex;
          flex-direction: column;
          padding: 10px;
          justify-content: space-around;
          :nth-child(1) {
            color: #697086;
            font-size: 14px;
          }
          :nth-child(2) {
            color: #383c4e;
            font-size: 30px;
            font-weight: 500;
          }
        }
      }
      // 快捷入口
      .quick-entry {
        margin-top: 16px;
        display: flex;
        .entry-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 60px;
          &:nth-child(1) {
            margin-left: 0px;
          }
          .entry-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: #f5f6f8;
            background-size: cover;
            &.approval {
              background-image: url('~@/assets/common/approval.png');
            }
            &.social {
              background-image: url('~@/assets/common/social.png');
            }
            &.salary {
              background-image: url('~@/assets/common/salary.png');
            }
            &.role {
              background-image: url('~@/assets/common/role.png');
            }
            &.bpm {
              background-image: url('~@/assets/common/bpm.png');
            }
          }
          span {
            color: #697086;
            font-size: 14px;
            margin-top: 8px;
          }
        }
      }
      // 图表数据
      .chart-container {
        display: flex;
        .chart-info {
          width: 240px;
          margin-top: 10px;
          .info-main {
            padding: 10px;
            display: flex;
            flex-direction: column;
            :nth-child(1) {
              font-size: 14px;
              color: #697086;
            }
            :nth-child(2) {
              margin-top: 10px;
              font-size: 30px;
              color: #04c9be;
              font-weight: 500;
            }
          }
          .info-list {
            background: #f5f6f8;
            border-radius: 4px;
            padding: 12px 15px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .info-list-item {
              width: 50%;
              margin-top: 10px;
              display: flex;
              flex-direction: column;

              :nth-child(1) {
                font-size: 14px;
                color: #697086;
              }
              :nth-child(2) {
                margin-top: 10px;
                font-size: 30px;
                color: #383c4e;
                font-weight: 500;
              }
            }
          }
        }
        .chart {
          flex: 1;
        }
      }
      // 帮助链接
      .help {
        display: flex;
        .help-left {
          width: 40%;
        }
        .help-right {
          flex: 1;
        }
        .help-list {
          .help-block {
            background: #f5f6f8;
            border-radius: 4px;
            width: 264px;
            height: 54px;
            padding: 17px 10px;
            font-size: 14px;
            color: #697086;
            margin-top: 10px;
            i {
              width: 14px;
              height: 14px;
              display: inline-block;
              background-size: cover;
              vertical-align: middle;
            }
            i.icon-help {
              background-image: url('~@/assets/common/help.png');
            }
            i.icon-support {
              background-image: url('~@/assets/common/support.png');
            }
            i.icon-add {
              background-image: url('~@/assets/common/add.png');
            }
            i.icon-entry {
              background-image: url('~@/assets/common/entry.png');
            }
          }
        }
      }
      // 通知公告
      .information-list {
        margin-top: 20px;
        .information-list-item {
          display: flex;
          align-items: center;
          margin: 15px 0;
          img {
            width: 40px;
            height: 40px;
            border: 50%;
          }
          .col {
            color: #8a97f8;
          }
          div :nth-child(2) {
            color: #697086;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
