import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/style.scss'
// swiper 轮播图组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import http from './http'
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')