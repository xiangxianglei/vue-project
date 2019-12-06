import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import my from '../views/my.vue'
import login from '@/components/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Home',
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/About',
    component: About
  },
  {
    path: '/my',
    component: my
  },
  {
    path: '/login',
    component: login
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((from, to, next) => {
  let token =window.localStorage.getItem('token');//获取浏览器缓存的用户信息
  window.console.log(token)
  if(token){ //如果已经登录，则直接跳转
    next();
  }else if(from.fullPath == '/login'){
    next() //新增这一句
  }else{
    next('/login')
    console.log(6666)
  }
})
export default router
