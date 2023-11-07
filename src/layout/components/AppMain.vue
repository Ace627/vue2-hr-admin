<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  position: relative;
  min-height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
  min-height: 100vh;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
