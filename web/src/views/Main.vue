<template>
    <div class="main">
        <!-- 下载区 -->
        <div class="topbar bg-dark py-2 px-3 d-flex ai-center">
            <img @click="goHome" src="../assets/logo.png" style="height:2.3077rem">
            <div class="mx-3 flex-1">
                <div class="appname text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button class="btn bg-primary">立即下载</button>
        </div>
        <!-- navBar 导航区 -->
        <Nav class="jc-around text-white bg-primary" :reverse="true" :navlink="navlink" :textnumber="42"></Nav>
        <router-view></router-view>
    </div>
</template>
<script>
    import Nav from '../components/Nav'
    export default {
        components: { Nav },
        data() {
            return {
                navlink: [
                    { label: "首页", to: "/", id: 1321 },
                    { label: "攻略中心", to: "/", id: 1322 },
                    { label: "赛事中心", to: "/", id: 1323 },
                ],
            }
        },
        methods: {

            goHome() {
                this.$router.push("/")
            }
        },
    }
</script>
<style lang="scss">
    .topbar {
        position: sticky;
        top: 0;
        z-index: 999;
    }
</style>