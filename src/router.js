import { createRouter, createWebHistory } from 'vue-router'
import Home from '/views/Home.vue'
import Configurator from '/views/Configurator.vue'
import About from '/views/About.vue'
import Products from '/views/Products.vue'
import CPUlist from './/components/CPUlist.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/configurator', component: Configurator },
  { path: '/about', component: About },
  { 
    path: '/products', 
    component: Products,
    children: [
      {path: 'cpu', component: CPUlist}
    ] 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router