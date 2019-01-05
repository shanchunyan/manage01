// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import Http from '@/plugins/http'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import '@/assets/index.css'
import router from './router'






//使用element ui 
Vue.use(ElementUI)
//使用axios
Vue.use(Http)

//处理日期的过滤器
Vue.filter('format',(v)=>{
   return moment(v).format("YYYY-MM-DD");
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
