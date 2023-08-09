import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    // 是否主动唤醒浏览器
    open: false,
    // 占用端口 开发环境启动的端口
    port: 8080,
    // 是否使用https请求
    //  https: ,
    // 扩展访问端口
    host: true,
    hmr: true,
    watch: {
      usePolling: true, // WSL必须,否则热更新无效
    },
    //proxy: createProxy(),代理配置
  },
})

