import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.mixin({
    computed: {
        ActionUrl() {
            return this.$http.defaults.baseURL + '/upload'
        }
    },
    methods: {
        getAuthorization() {
            return {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")||''}`
            }
        }
    },
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')