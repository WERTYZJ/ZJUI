import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ZJUI from './ui/index'
import '@/styles/ZJGlobal.css'

const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(pinia)
app.use(ZJUI)


app.mount('#app')