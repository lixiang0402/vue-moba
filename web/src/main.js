import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/style.scss'
import dayjs from 'dayjs'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
})

// swiper 轮播图组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import http from './http'
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.filter("fmdate", (val, rule) => {
    return dayjs(val).format(rule)
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')