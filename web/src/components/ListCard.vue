<template>
    <Card iconClass="sprite-news" label="新闻资讯">
        <div class="navbar pt-3 pb-2 d-flex jc-between">
            <div class="nav-item" @click="$refs.list.$swiper.slideTo(i)" v-for="(item,i) in categories" :key="i">
                <div class="link" :class="active==i?'active':''">{{item.name}}</div>
            </div>
        </div>
        <swiper ref="list" @slide-change="active=$refs.list.$swiper.realIndex">
            <swiper-slide v-for="(category,i) in categories" :key="i">
                <slot name="item" :category="category"></slot>
            </swiper-slide>
        </swiper>
    </Card>
</template>

<script>
    import Card from '../components/Card'
    export default {
        components: { Card },
        props: {
            iconClass: { type: String },
            label: { type: String },
            categories: { type: Array }
        },
        data() {
            return {
                active: 0
            }
        },
        created: function() {},
        methods: {
            slidechange() {
                console.log(this.$refs.list.$swiper);
                console.log(this.$refs.list.$swiper.realIndex);

            }
        },
    }
</script>

<style scoped lang="scss">

</style>