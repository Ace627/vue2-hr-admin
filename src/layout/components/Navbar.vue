<template>
  <div class="navbar">
    <!-- 侧栏伸缩菜单 -->
    <Hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- 面包屑导航 -->
    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container cursor-pointer" trigger="click">
        <div class="avatar-wrapper flex justify-center items-center">
          <!-- 用户头像 -->
          <img :src="avatar" class="user-avatar" v-if="avatar" draggable="false" />
          <span v-else class="username flex items-center justify-center text-white">{{ name?.charAt(0) }}</span>
          <!-- 用户名 -->
          <span class="name">{{ name }}</span>
          <!-- icon 图标 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/Ace627/vue2-hr-admin">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" href="https://apifox.com/apidoc/shared-e2644216-aad4-4529-a630-78f0631ab076/api-45197376">
            <el-dropdown-item>接口文档</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="openPwdDialog"> 修改密码 </el-dropdown-item>
          <el-dropdown-item @click.native="logout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 密码修改弹框 -->
    <el-dialog title="密码修改" :visible.sync="dialogVisible" width="500px" :before-close="closePwdDialog">
      <el-form label-width="80px" :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" size="small">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input prefix-icon="el-icon-lock" v-model="pwdForm.oldPassword" type="password" show-password placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input prefix-icon="el-icon-lock" v-model="pwdForm.newPassword" type="password" show-password placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="confirmPassword">
          <el-input prefix-icon="el-icon-lock" v-model="pwdForm.confirmPassword" type="password" show-password placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="closePwdDialog">取 消</el-button>
          <el-button type="primary" @click="submitPwdForm" :loading="pwdForm.loading">
            <span v-if="pwdForm.loading">确认修改</span>
            <span v-else>确认修改</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePass } from '@/api/user'

export default {
  name: 'Navbar',
  components: { Breadcrumb, Hamburger },
  data() {
    return {
      dialogVisible: false, // 是否显示密码修改的 Dialog
      pwdForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        loading: false,
      },
      // 表单校验规则
      pwdFormRules: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度应该在 6~16 位之间', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: (rule, value, callback) => (value === this.pwdForm.newPassword ? callback() : callback(new Error('两次新密码输入不一致'))), trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    /** 打开修改密码弹框 */
    openPwdDialog() {
      this.dialogVisible = true
    },

    /** 关闭密码修改弹框 */
    closePwdDialog() {
      if (this.pwdForm.loading) return void 0
      this.$refs.pwdFormRef.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.dialogVisible = false
    },

    /** 提交密码修改表单 */
    async submitPwdForm() {
      try {
        this.pwdForm.loading = true
        await this.$refs.pwdFormRef.validate() // 对整个表单进行校验
        const { message } = await updatePass(this.pwdForm)
        this.$message.success(message)
        this.pwdForm.loading = false
        this.closePwdDialog() // 关闭密码修改弹框
      } catch (error) {
        this.pwdForm.loading = false
        console.log('error: ', error)
      }
    },

    /** 退出登录 */
    async logout() {
      try {
        await this.$confirm('确定注销并退出系统吗？', '系统提示', { type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消' })
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  background: #fff1;
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 16px;

      .avatar-wrapper {
        .user-avatar,
        .username {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .username {
          border-radius: 50%;
          background-color: #04c9be;
        }
        .name {
          margin: 0 8px;
          font-size: 16px;
          font-weight: 500;
        }
        .el-icon-setting {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
