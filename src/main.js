import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import { BootstrapVueNext } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'  
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)
library.add(faComputer)
library.add(faScrewdriverWrench)
library.add(faFilter)
library.add(faBolt)
library.add(faReceipt)
library.add(faCodeBranch)
library.add(faTriangleExclamation)
library.add(faInfoCircle)

document.title = 'PC Planner'

const app = createApp(App)

app.use(BootstrapVueNext)
app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')