import Vue from 'vue'
import VueRouter from 'vue-router'
import todothing from '../views/TodoThing.vue'
import upload from '../views/Upload'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    model:'history',
    component: todothing
  },
  {
    path: '/todothing',
    name: 'todothing',
    model:'history',
    component: todothing
  },
  {
    path: '/about',
    name: 'about',
    model:'history',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/upload',
    name:'upload',
    model:'history',
    component:()=> import('../views/Upload.vue')
  },
  {
    path:'/imgwall',
    name:'imgwall',
    component: ()=> import('../views/Imgwall.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  nprogress.start()
  next()
})
router.afterEach(()=>{
  nprogress.done()
})

export default router
