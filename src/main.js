// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css'//引入初始化样式
import 'amfe-flexible/index'//引入淘宝样式
import '@/globalCss/init.scss' // 引入自己的初始化样式
import {fetch} from '@/utils/index'//引入封装好的axios
import api from '@/utils/api'//引入所有的接口

Vue.config.productionTip = false
//挂载封装的axios加入vue实例原型上
Vue.prototype.$axios=fetch
//将接口挂载vue实例上
Vue.prototype.$api=api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
