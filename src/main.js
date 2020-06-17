import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './components/http/api'
// 后面调用请求时 ：this.$api.方法名().then().catch()
import dayjs from 'dayjs'
// 后面调用请求时 ：this.$dayjs


Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
