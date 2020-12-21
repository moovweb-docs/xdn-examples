import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category/:name',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
  },
  {
    path: '/product/:name',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
