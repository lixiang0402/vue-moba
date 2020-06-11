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
            path: "/categories/edit/:id",
            name: "CategoriesEdit",
            component: () => import('../views/Categories/CategoriesEdit.vue'),
            props: true
        },
        {
            path: "/categories/list",
            name: "CategoriesList",
            component: () => import('../views/Categories/CategoriesList.vue')
        },

        {
            path: "/items/edit",
            name: "ItemsEdit",
            component: () => import('../views/Items/ItemsEdit.vue')
        },
        {
            path: "/items/edit/:id",
            name: "ItemsEdit",
            component: () => import('../views/Items/ItemsEdit.vue'),
            props: true
        },
        {
            path: "/items/list",
            name: "ItemsList",
            component: () => import('../views/Items/ItemsList')
        },


        {
            path: "/runes/edit",
            name: "RunesEdit",
            component: () => import('../views/Runes/RunesEdit')
        },
        {
            path: "/runes/edit/:id",
            name: "RunesEdit",
            component: () => import('../views/Runes/RunesEdit'),
            props: true
        },
        {
            path: "/runes/list",
            name: "RunesList",
            component: () => import('../views/Runes/RunesList')
        },



        {
            path: "/heroes/edit",
            name: "HeroesEdit",
            component: () => import('../views/Heroes/HeroesEdit')
        },
        {
            path: "/heroes/edit/:id",
            name: "HeroesEdit",
            component: () => import('../views/Heroes/HeroesEdit.vue'),
            props: true
        },
        {
            path: "/heroes/list",
            name: "HeroesList",
            component: () => import('../views/Heroes/HeroesList')
        },


        {
            path: "/articles/edit",
            name: "ArticlesEdit",
            component: () => import('../views/Articles/ArticlesEdit')
        },
        {
            path: "/articles/edit/:id",
            name: "ArticlesEdit",
            component: () => import('../views/Articles/ArticlesEdit'),
            props: true
        },
        {
            path: "/articles/list",
            name: "ArticlesList",
            component: () => import('../views/Articles/ArticlesList')
        },

        {
            path: "/ads/edit",
            name: "AsEdit",
            component: () => import('../views/Ads/AdsEdit')
        },
        {
            path: "/ads/edit/:id",
            name: "AdsEdit",
            component: () => import('../views/Ads/AdsEdit'),
            props: true
        },
        {
            path: "/ads/list",
            name: "AdsList",
            component: () => import('../views/Ads/AdsList')
        },






        {
            path: "/admin_user/edit",
            name: "AdminUserEdit",
            component: () => import('../views/AdminUser/AdminUserEdit')
        },
        {
            path: "/admin_user/edit/:id",
            name: "AdminUserEdit",
            component: () => import('../views/AdminUser/AdminUserEdit'),
            props: true
        },
        {
            path: "/admin_user/list",
            name: "AdminUserList",
            component: () => import('../views/AdminUser/AdminUserList')
        }




    ]
}, ]

const router = new VueRouter({
    routes
})

export default router