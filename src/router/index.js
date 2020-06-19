import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'

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
        meta: {
          title: '首页'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/Category'),
        meta: {
          title: '分类'
        }
      },
      {
        path: 'shoppingCart',
        name: 'ShoppingCart',
        component: () => import('../views/ShoppingCart'),
        meta: {
          title: '购物车'
        }
      },
      {
        path: 'self',
        name: 'Self',
        component: () => import('../views/Self'),
        meta: {
          title: '我的'
        }
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

export default router
