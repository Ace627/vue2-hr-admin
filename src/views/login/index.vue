<template>
  <div class="login-container">
    <div class="logo"></div>
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-full">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
        isAgree: true,
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号码格式错误', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度应该在 6~16 位之间', trigger: 'blur' },
        ],
      },
    }
  },
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url('../../assets/common/login_back.png') no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
