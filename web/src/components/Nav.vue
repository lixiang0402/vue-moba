<template>
    <div class="navbar pt-3 pb-2 d-flex ">
        <div class="nav-item" @click="changeActive(i)" v-for="(item,i) in navlink" :key="i">
            <div class="link" :class="isActive==i?reverse?'reverse-active':'active':''">{{item.label}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            navlink: { type: Array },
            reverse: { type: Boolean }
        },
        data() {
            return {
                isActive: 0
            }
        },
        methods: {
            changeActive(i) {
                this.isActive = i
            },
        },
    }
</script>
<style lang="scss">
    @import "../assets/style/_variables.scss";

    .nav-item {
        .link {
            border-bottom: 2px solid transparent;
            padding-bottom: 0.1rem;

            &.active {
                color: map-get($colors, "primary");
                border-bottom: 2px solid map-get($colors, "primary");
            }

            &.reverse-active {
                color: map-get($colors, "white");
                border-bottom: 2px solid map-get($colors, "white");
            }
        }
    }
</style>