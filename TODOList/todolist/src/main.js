import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import qs from 'qs'

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'

//添加请求拦截器
axios.interceptors.request.use(function (config) {
    //在发送请求之前做某事
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    if (config.method == 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
});

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.layer = layer(Vue)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
