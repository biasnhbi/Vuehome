import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import Home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/home',
    component: Home
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path==='/') {
    return next()  //访问登录页时,直接通过
  }
  const token=window.sessionStorage.getItem('token')
  if (!token) {
    return next('/') //无token是,跳转回登录页
  }
  next()  //不通过登录页直接进入系统时有token的话,直接放行
})

export default router
