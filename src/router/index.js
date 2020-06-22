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
