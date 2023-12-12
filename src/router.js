import { createRouter, createWebHistory } from 'vue-router'
import Home from '/views/Home.vue'
import Configurator from '/views/Configurator.vue'
import About from '/views/About.vue'
import Products from '/views/Products.vue'
import CPUList from './/components/CPUList.vue'
import CoolerList from './/components/CoolerList.vue'
import MotherboardList from './/components/MotherboardList.vue'
import RAMList from './/components/RAMList.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/configurator', component: Configurator },
  { path: '/about', component: About },
  { 
    path: '/products', 
    component: Products,
    children: [
      {path: 'cpu', component: CPUList},
      {path: 'coolers', component: CoolerList},
      {path: 'motherboards', component: MotherboardList},
      {path: 'ram', component: RAMList}
    ] 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router