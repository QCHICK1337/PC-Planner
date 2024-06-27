import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVueNext } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faTriangleExclamation, faComputer, faScrewdriverWrench, faFilter, faBolt, faReceipt, faCodeBranch, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import pl from './locales/pl.json'

library.add(faHeart, faTriangleExclamation, faComputer, faScrewdriverWrench, faFilter, faBolt, faReceipt, faCodeBranch, faInfoCircle)

document.title = 'PC Planner'

const app = createApp(App)

const messages = { en, pl }

const i18n = createI18n({
  locale: 'en', 
  fallbackLocale: 'pl',
  messages,
})

app.use(BootstrapVueNext)
app.use(router)
app.use(store)
app.use(i18n)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')