import { createApp } from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios.ts'
import 'vuetify/dist/vuetify.min.css'


createApp(App).use(store).use(Vuetify).use(router).mount('#app')
