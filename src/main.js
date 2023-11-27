import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)

const app = createApp(App)

app.use(BootstrapVue)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')