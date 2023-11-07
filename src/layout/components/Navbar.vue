<template>
  <div class="navbar">
    <Hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper flex items-center">
          <!-- 用户头像 -->
          <img :src="avatar" class="user-avatar" />
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
            <el-dropdown-item>仓库地址</el-dropdown-item>
          </a>
          <a target="_blank" href="https://apifox.com/apidoc/shared-e2644216-aad4-4529-a630-78f0631ab076/api-45197376">
            <el-dropdown-item>接口文档</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Navbar',
  components: { Breadcrumb, Hamburger },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

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
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .name {
          margin: 0 8px;
          font-size: 16px;
          font-weight: 500;
        }
        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
