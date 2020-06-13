import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http'
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