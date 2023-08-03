/*
 * @Descripttion: 
 * @version: 
 * @Date: 2023-07-27 19:40:33
 * @LastEditTime: 2023-08-03 13:39:34
 */
import { createApp } from 'vue'
import router from './router'
import store from './store'
import naive from './naive'
import App from './app.vue'
import '@/utils/serialization'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(naive)

app.mount('#app')
