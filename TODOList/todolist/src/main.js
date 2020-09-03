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

import {
    Button,
    Select,
    Container,
    Menu,
    RadioGroup,
    Header,
    Main,
    Dropdown,
    Aside,
    Pagination,
    Table,
    TableColumn,
    Card,
    DropdownItem,
    MenuItem,
    DropdownMenu,
    Submenu,
    MessageBox,
    Message,
    Popover,
    Loading,
    Breadcrumb,
    BreadcrumbItem,
    PageHeader,
    Input,
    Tabs,
    TabPane,
    Form,
    Badge,
    FormItem,
    Radio,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    Switch,
    TimePicker,
    Row,
    Col,
    DatePicker,
    Option,
    Link,
    Avatar,
    Dialog,
    Upload,
    Tree,
    Steps,
    Step,
    Image,
    Progress,
    Collapse,
    CollapseItem,
    Autocomplete,
    TimeSelect

} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Avatar);
Vue.use(Link);
Vue.use(Steps);
Vue.use(Badge);
Vue.use(Step);
Vue.use(Option);
Vue.use(Tree);
Vue.use(DatePicker);
Vue.use(Col);
Vue.use(Row);
Vue.use(TimePicker);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(PageHeader);
Vue.use(BreadcrumbItem);
Vue.use(Breadcrumb);
Vue.use(Loading);
Vue.use(Popover);
Vue.use(Submenu);
Vue.use(DropdownMenu);
Vue.use(MenuItem);
Vue.use(DropdownItem);
Vue.use(Card);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Aside);
Vue.use(Dropdown);
Vue.use(Main);
Vue.use(Header);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Menu);
Vue.use(Select);
Vue.use(Container);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Image);
Vue.use(Progress);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Autocomplete);
Vue.use(TimeSelect);

//添加请求拦截器

import global from '../util/globalComponent'
Vue.use(global);


Vue.config.productionTip = false;
Vue.prototype.posturl = 'http://localhost:3030';
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;

// Vue.prototype.layer = layer(Vue)


axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    if (config.method === 'post') {
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

Vue.prototype.axios = axios;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
