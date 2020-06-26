<template>
    <div class="card mt-2 bg-white px-3 py-2">
        <div class="card-header py-3 d-flex ai-center">
            <i class="sprite" :class="iconClass"></i>
            <span class="fs-xl mx-2 flex-1">{{label}}</span>
            <router-link v-if="!pure" to="/">
                <i class="sprite sprite-showmore"></i>
            </router-link>
        </div>
        <div :class="pure==true?'':'border-bottom'"></div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            iconClass: { type: String, required: true },
            label: { type: String, required: true },
            pure: { type: Boolean }
        },
        data() {
            return {

            }
        },
        created: function() {},
        methods: {},
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/_variables.scss";

    .card {
        .card-header {}
    }

    .border-bottom {
        border-bottom: 1px solid $border-color;
    }

    .new {
        font-family: "微软雅黑";
    }
</style>