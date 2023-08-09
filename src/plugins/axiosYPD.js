//axiosInstance.js
//导入axios
import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
	baseURL:'http://192.168.31.66:32020', //请求后端数据的基本地址，自定义
    timeout: 3000, // request timeout
    responseType: 'json', // 默认的
    withCredentials: false, // 默认的
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'POST,GET,OPTIONS,DELETE',
        'Access-Control-Allow-Headers':'x-requested-with,content-type',
    }
})

//导出我们建立的axios实例模块，ES6 export用法
export default API
