import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import  './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL='https://timemeetyou.com:8889/api/private/v1/'
axios.interceptors.request.use(config => {
// Do something before request is sent
config.headers.Authorization=window.sessionStorage.getItem('token')
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});

Vue.prototype.$http=axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
