import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import qs from 'qs'


// import layer from 'vue-layer'
// import 'vue-layer/lib/vue-layer.css'

import { Input,Table,Upload,Button,TableColumn,Message,Image,Scrollbar } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Input)
Vue.use(Table)
Vue.use(Upload)
Vue.use(Button)
Vue.use(TableColumn)
Vue.use(Image)
Vue.use(Scrollbar)


//添加请求拦截器


Vue.config.productionTip = false
Vue.prototype.posturl = 'http://localhost:3030'
Vue.prototype.$message = Message

// Vue.prototype.layer = layer(Vue)


axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    if (config.method == 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
});

axios.interceptors.response.use(function (response) {
    // 在接收响应做些什么，例如跳转到登录页
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

Vue.prototype.axios = axios


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
