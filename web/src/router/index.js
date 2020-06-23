import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'Main',
    component: () => import("../views/Main.vue"),
    children: [
        { path: "/", name: "home", component: () => import("../views/Home.vue") }
    ]
}]
const router = new VueRouter({
    routes
})

export default router