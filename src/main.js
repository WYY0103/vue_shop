import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'


// 设置接口地址
axios.defaults.baseURL='http://vueshop.pixiv.download/api/private/v1/'
// 将axios挂载到vue原型上
Vue.prototype.$http = axios

//axios 请求预处理  不用特殊的记  能找到地方复制粘贴就行
axios.interceptors.request.use(config=>{
	//像header请求头当中添加参数
	config.headers.Authorization = window.sessionStorage.getItem('token');

	//一定要有返回  才能生效
	return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
