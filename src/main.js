import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './components/http/api'
import dayjs from 'dayjs'
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
import { Sidebar, SidebarItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { IndexBar, IndexAnchor } from 'vant';import { Dialog } from 'vant';
import { Sku } from 'vant';
import utils from './utils';





Vue.use(Sku);
Vue.use(Dialog);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sidebar);
Vue.use(SidebarItem);
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
Vue.prototype.$utils = utils;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


