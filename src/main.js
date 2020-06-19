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
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Search } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';
import { Grid, GridItem } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { PullRefresh } from 'vant';


Vue.use(PullRefresh);



Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(ElementUI);
Vue.use(Vant);

Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


