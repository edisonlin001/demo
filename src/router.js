import { createWebHistory, createRouter } from 'vue-router'
const router = createRouter({
    history:createWebHistory(), // 路由模式
    routes: [
      {
        // 页面逻辑
        path: '/commonClass',
        name: 'commonClass',
        component: () => import('./pages/commonClass/commonClass.vue') 
      },
      {
        // 页面逻辑
        path: '/checkBal',
        name: 'checkBal',
        component: () => import('./pages/checkBal/checkBal.vue') 
      }
    ]
  })

export default router