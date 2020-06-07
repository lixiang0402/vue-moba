import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [{
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
            path: "/categories/edit",
            name: "CategoriesEdit",
            component: () => import('../views/Categories/CategoriesEdit.vue')
        },
        {
            path: "/categories/list",
            name: "CategoriesList",
            component: () => import('../views/Categories/CategoriesList.vue')
        }
    ]
}, ]

const router = new VueRouter({
    routes
})

export default router