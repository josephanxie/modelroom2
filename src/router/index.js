import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/views/home.vue'
import modelView from '@/views/model.vue'
import newModel from '@/views/newModel.vue'
import newModel2 from '@/views/newModel2.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/model', component: modelView },
  { path: '/newModel', component: newModel},
  { path: '/newModel2', component: newModel2}
]

const router =  createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem('isLogin')
    if(isLogin !== '1' && to.path !== '/') {
        next('/')
    } else {
        next()
    }
  })

export default router
