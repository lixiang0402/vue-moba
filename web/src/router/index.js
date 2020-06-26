import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'Main',
        component: () => import("../views/Main.vue"),
        children: [
            { path: "/", name: "home", component: () => import("../views/Home.vue") },
            { path: "/article/:id", name: "article", component: () => import("../views/Article.vue"), props: true },
        ]
    }, { path: "/heroes/:id", name: "heroes", component: () => import("../views/Hero.vue"), props: true },


]
const router = new VueRouter({
    routes
})

export default router