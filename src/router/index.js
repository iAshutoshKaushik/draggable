import Vue from 'vue'
import VueRouter from 'vue-router'
import Draggable from '../views/Draggable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Draggable',
    component: Draggable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
