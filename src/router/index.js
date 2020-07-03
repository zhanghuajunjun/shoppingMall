import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'
import { Dialog } from 'vant';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'categorys',
        name: 'Categorys',
        component: () => import('../views/Categorys'),
      },
      {
        path: 'shoppingCart',
        name: 'ShoppingCart',
        component: () => import('../views/ShoppingCart'),
      },
      {
        path: 'self',
        name: 'Self',
        component: () => import('../views/Self'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/city',
    name: 'City',
    component: () => import('../views/City.vue')
  },
  {
    path: '/saveUser',
    name: 'SaveUser',
    component: () => import('../views/saveUser.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue')
  },
  {
    path: '/addaddress',
    name: 'AddAddress',
    component: () => import('../views/AddAddress.vue')
  },
  {
    path: '/eidtaddress',
    name: 'EidtAddress',
    component: () => import('../views/EidtAddress.vue')
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/browsing',
    name: 'Browsing',
    component: () => import('../views/Browsing.vue')
  },
  {
    path: '/allOrder',
    name: 'AllOrder',
    component: () => import('../views/AllOrder.vue')
  },
  {
    path: '/detailEva',
    name: 'DetailEva',
    component: () => import('../views/DetailEva.vue')
  },
  {
    path: '/evaluate',
    name: 'Evaluate',
    component: () => import('../views/Evaluate.vue')
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: () => import('../views/Settlement.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/Details.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  let arr = ['Self', 'Home', 'Categorys', 'ShoppingCart', 'Details', 'City', 'Login']
  if (!localStorage.getItem('username')) {
    if (arr.includes(to.name)) {
      next()
    } else {
      Dialog
        .alert({
          title: "登录后才可启用此功能", //加上标题
          message: "是否跳转登录/注册界面",
          showCancelButton: true
        })
        .then(() => {
          next('/login')
        })
        .catch(() => {

        });
    }

  } else next()
})
export default router
