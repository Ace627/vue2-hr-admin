import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'nprogress/nprogress.css' // progress bar style

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import directives from './directives'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(directives)
Vue.use(ElementUI, { zIndex: 3000 })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
