import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axiosYPD from './plugins/axiosYPD.js'
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createWebHistory, createRouter } from 'vue-router'
import router from './router'
const history = createWebHistory()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(router)
app.mount('#app')
app.config.globalProperties.$axiosYPD=axiosYPD;

