import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Configurator from './views/Configurator.vue'
import About from './views/About.vue'
import Products from './views/Products.vue'
import CPUList from './components/CPUList.vue'
import CoolerList from './components/CoolerList.vue'
import MotherboardList from './components/MotherboardList.vue'
import RAMList from './components/RAMList.vue'
import StorageList from './components/StorageList.vue'
import GPUList from './components/GPUList.vue'
import CaseList from './components/CaseList.vue'
import PSUList from './components/PSUList.vue'
import ProductDetails from './components/ProductDetails.vue'

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
      {path: 'ram', component: RAMList},
      {path: 'storage', component: StorageList},
      {path: 'gpu', component: GPUList},
      {path: 'cases', component: CaseList},
      {path: 'psu', component: PSUList}
    ] 
  },
  { path: '/product/:collection/:name', name: 'ProductDetails', component: ProductDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router