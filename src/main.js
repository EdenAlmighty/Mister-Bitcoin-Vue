import './assets/styles/main.scss'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import store from './store/store';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)

const app = createApp(App)
const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(store)
app.use(router)
app.mount('#app')

