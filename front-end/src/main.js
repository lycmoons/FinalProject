import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js"
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import axios from "axios"
import "@/assets/global.css"

axios.defaults.baseURL = 'http://127.0.0.1:8080'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

