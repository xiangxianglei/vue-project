import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import my from '../views/my.vue'
import add_location from '../views/add_location.vue'
import location from '../views/location.vue'
import commodity_details from '../views/commodity_details.vue'
import cart from '../views/cart.vue'

import login from '@/components/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'Home',
    redirect: 'Home',
  },
  {
    path: '/Home',
    name:'Home',
    component: Home
  },
  {
    path: '/About',
    name:'About',
    component: About
  },
  {
    path: '/my',
    name:'my',
    component: my
  },
  {
    path: '/login',
    name:'login',
    component: login
  },
  {
    path: '/add_location',
    name:'add_location',
    component: add_location
  },
  {
    path: '/location',
    name:'location',
    component: location
  },
  {
    path: '/commodity_details',
    name:'commodity_details',
    component: commodity_details
  },
  {
    path: '/cart',
    name:'cart',
    component: cart
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((from, to, next) => {
  let that=this
  let logoin_time =window.localStorage.getItem('logoin_time');
  let present_time=new Date().getTime();
  console.log(present_time-logoin_time)
  if(present_time-logoin_time>10000000){
    window.localStorage.clear();
  }
  let token =window.localStorage.getItem('token');
  window.console.log(token)
  if(token){ //如果已经登录，则直接跳转
    next();
  }else if(from.fullPath == '/login'){
    next() //新增这一句
  }else{
    next('/login')
  }
})
export default router
