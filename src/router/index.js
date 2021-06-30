import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import User from '../components/user/user.vue'
import Right from '../components/power/right.vue'
import Roles from '../components/power/roles.vue'
import Cate from '../components/goods/cate.vue'
import Params from '../components/goods/parmas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login,
  },
  {
    path: '/home',
    component: Home,
    redirect:'/welcome',
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:User},
      {path:'/rights',component:Right},
      {path:'/roles',component:Roles},
      {path:'/categories',component:Cate},
      {path:'/params',component:Params}
    ]
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
