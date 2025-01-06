import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
axios.interceptors.request.use(config=>{
  config.headers.token = window.sessionStorage.getItem('token');
  return config;
})
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
