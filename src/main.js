// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import $ from 'jquery'
import filters from '@/assets/api/utils.js';

router.afterEach((to, from, next) => {
    document.getElementById("qwe").scrollTop = 0
});
Vue.use(Antd)
Vue.config.productionTip = false
    // 加载过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})