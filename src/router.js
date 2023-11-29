import { createRouter, createWebHistory } from 'vue-router'
import Home from '/views/Home.vue'
import Configurator from '/views/Configurator.vue'
import About from '/views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/configurator', component: Configurator },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router