import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import { createPinia } from 'pinia'
import "./main.scss";
import "bootstrap";
import "@popperjs/core";
import routes from './routes'
import App from './App.vue'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})
const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
