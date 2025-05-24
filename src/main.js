import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ZJUI from './ui/index'
import '@/styles/ZJGlobal.css'
import i18n from './locales/i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

// pinia.use(piniaPluginPersistedstate({
// 	auto:true,	//	该配置将会使所有 Store 持久化存储，且必须配置 persist: false 显式禁用持久化。
//   storage: sessionStorage,	//	默认持久化存储方式 修改为 sessionStorage
//  })
// )

app.use(router)
app.use(pinia)
app.use(ZJUI)
// 挂载多语言i8n
app.use(i18n)


app.mount('#app')