import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [{
        path: "/login",
        name: "Login",
        meta: { isPublic: true },
        component: () => import( /* webpackChunkName: "group-login" */ '../views/Login'),
    },
    {
        path: '/',
        name: 'Main',
        component: () => import( /* webpackChunkName: "group-main" */ '../views/Main.vue'),
        children: [{
                path: "/categories/edit",
                name: "CategoriesEdit",
                component: () => import( /* webpackChunkName: "group-categories" */ '../views/Categories/CategoriesEdit.vue')
            },
            {
                path: "/categories/edit/:id",
                name: "CategoriesEdit",
                component: () => import( /* webpackChunkName: "group-categories" */ '../views/Categories/CategoriesEdit.vue'),
                props: true
            },
            {
                path: "/categories/list",
                name: "CategoriesList",
                component: () => import( /* webpackChunkName: "group-categories" */ '../views/Categories/CategoriesList.vue')
            },

            {
                path: "/items/edit",
                name: "ItemsEdit",
                component: () => import( /* webpackChunkName: "group-items" */ '../views/Items/ItemsEdit.vue')
            },
            {
                path: "/items/edit/:id",
                name: "ItemsEdit",
                component: () => import( /* webpackChunkName: "group-items" */ '../views/Items/ItemsEdit.vue'),
                props: true
            },
            {
                path: "/items/list",
                name: "ItemsList",
                component: () => import( /* webpackChunkName: "group-items" */ '../views/Items/ItemsList')
            },


            {
                path: "/runes/edit",
                name: "RunesEdit",
                component: () => import( /* webpackChunkName: "group-runes" */ '../views/Runes/RunesEdit')
            },
            {
                path: "/runes/edit/:id",
                name: "RunesEdit",
                component: () => import( /* webpackChunkName: "group-runes" */ '../views/Runes/RunesEdit'),
                props: true
            },
            {
                path: "/runes/list",
                name: "RunesList",
                component: () => import( /* webpackChunkName: "group-runes" */ '../views/Runes/RunesList')
            },



            {
                path: "/heroes/edit",
                name: "HeroesEdit",
                component: () => import( /* webpackChunkName: "group-heores" */ '../views/Heroes/HeroesEdit')
            },
            {
                path: "/heroes/edit/:id",
                name: "HeroesEdit",
                component: () => import( /* webpackChunkName: "group-heores" */ '../views/Heroes/HeroesEdit.vue'),
                props: true
            },
            {
                path: "/heroes/list",
                name: "HeroesList",
                component: () => import( /* webpackChunkName: "group-heores" */ '../views/Heroes/HeroesList')
            },


            {
                path: "/articles/edit",
                name: "ArticlesEdit",
                component: () => import( /* webpackChunkName: "group-articles" */ '../views/Articles/ArticlesEdit')
            },
            {
                path: "/articles/edit/:id",
                name: "ArticlesEdit",
                component: () => import( /* webpackChunkName: "group-articles" */ '../views/Articles/ArticlesEdit'),
                props: true
            },
            {
                path: "/articles/list",
                name: "ArticlesList",
                component: () => import( /* webpackChunkName: "group-articles" */ '../views/Articles/ArticlesList')
            },

            {
                path: "/ads/edit",
                name: "AsEdit",
                component: () => import( /* webpackChunkName: "group-ads" */ '../views/Ads/AdsEdit')
            },
            {
                path: "/ads/edit/:id",
                name: "AdsEdit",
                component: () => import( /* webpackChunkName: "group-ads" */ '../views/Ads/AdsEdit'),
                props: true
            },
            {
                path: "/ads/list",
                name: "AdsList",
                component: () => import( /* webpackChunkName: "group-ads" */ '../views/Ads/AdsList')
            },






            {
                path: "/admin_user/edit",
                name: "AdminUserEdit",
                component: () => import( /* webpackChunkName: "group-adminuser" */ '../views/AdminUser/AdminUserEdit')
            },
            {
                path: "/admin_user/edit/:id",
                name: "AdminUserEdit",
                component: () => import( /* webpackChunkName: "group-adminuser" */ '../views/AdminUser/AdminUserEdit'),
                props: true
            },
            {
                path: "/admin_user/list",
                name: "AdminUserList",
                component: () => import( /* webpackChunkName: "group-adminuser" */ '../views/AdminUser/AdminUserList')
            }
        ]
    },
]

const router = new VueRouter({
    routes
})
// router.afterEach((to, next) => {
//     const token = localStorage.getItem("jwt-token")
//     if (!to.meta.isPublic && !token) {
//         return next('/login')
//     }
//     next()
// })
router.afterEach((to, from) => {
    if (!to.meta.isPublic && !localStorage.getItem("jwt-token")) return this.$router.push("/login")
})
export default router