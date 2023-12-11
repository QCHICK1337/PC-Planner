import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import { BootstrapVueNext } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'  
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)
library.add(faComputer)
library.add(faScrewdriverWrench)

document.title = 'PC Planner'

const app = createApp(App)

app.use(BootstrapVueNext)
app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')