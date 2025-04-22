import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ZJUI from './ui/index'
import '@/styles/ZJGlobal.css'
import i18n from './locales/i18n'

const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(pinia)
app.use(ZJUI)
// 挂在多语言i8n
app.use(i18n)


app.mount('#app')