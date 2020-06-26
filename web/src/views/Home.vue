<template>
    <div class="home">
        <!-- swiper start -->
        <swiper ref="mySwiper" :options="swiperOptions" :auto-destroy="true">
            <swiper-slide v-for="item in swipers" :key="item._id">
                <a :href="item.url">
                    <img class="w-100" :src="item.img">
                </a>
            </swiper-slide>
            <div class="swiper-pagination text-right py-2 px-3" slot="pagination"></div>
        </swiper>
        <!-- swiper end -->
        <!-- nav start -->
        <div class="nav bg-white mt-2">
            <div class="container">
                <div class="d-flex  pt-2 navlist" :class="flag?'width-10':'flex-wrap'">
                    <div class="nav-item text-center mb-3">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-baoliao mb-1"></i>
                            <div>爆料站</div>
                        </router-link>
                    </div>
                    <div class="nav-item text-center mb-3">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-story mb-1"></i>
                            <div>故事站</div>
                        </router-link>
                    </div>
                    <div class="nav-item text-center mb-3">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-store mb-1"></i>
                            <div>周边商城</div>
                        </router-link>
                    </div>
                    <div class="nav-item text-center mb-3">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-tiyan mb-1"></i>
                            <div>体验服</div>
                        </router-link>
                    </div>
                    <div class="nav-item text-center mb-3">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-xinren mb-1"></i>
                            <div>新人专区</div>
                        </router-link>
                    </div>
                    <div class="nav-item text-center mb-3">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-rongyaochuancheng mb-1"></i>
                            <div>荣耀传承</div>
                        </router-link>
                    </div>
                    <div class="nav-item text-center mb-3">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-moni mb-1"></i>
                            <div>模拟战</div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div @click="isUnfold" class="bg-light py-2 d-flex jc-center ai-center">
                <i class="sprite mr-1" :class="flag?'sprite-arrowbottom':'sprite-arrowtop'"></i>
                <div>{{flag?'展开':'收起'}}</div>
            </div>
        </div>
        <!-- nav end -->
        <!-- news start -->
        <ListCard iconClass="sprite-news" label="新闻资讯" :categories="newsCat">
            <template #item="{category}">
                <router-link tag="div" :to="`/article/${item._id}`" class="new d-flex mb-2 pt-2 px-1" v-for="(item,i) in category.newsList" :key="i">
                    <span style="padding:0 0.0869rem;border-radius:4px" class="fs-xs" :class=" item.categoryName |fmCatColor">{{item.categoryName}}</span>
                    <span class="title mx-2 flex-1 text-ellipsis">{{item.title}}</span>
                    <span class="time mx-2 fs-xs text-grey">{{item.createdAt | fmdate("MM/DD")}}</span>
                </router-link>
            </template>
        </ListCard>
        <!-- news end -->

        <!-- heroes start -->
        <ListCard iconClass="sprite-hero" label="英雄分类" :categories="heroesCat">
            <template #item="{category}">
                <div class="d-flex flex-wrap" style="margin:0 -0.5rem;min-height:14rem">
                    <router-link tag="div" :to="`/heroes/${item._id}`" class="hero px-2 py-2 text-center" v-for="(item) in category.heroesList" :key="item._id">
                        <img class="" v-lazy="item.avatar" alt="">
                        <div class="fs-sm text-grey">{{item.name}}</div>
                    </router-link>
                </div>
            </template>
        </ListCard>
        <!-- heroes end -->



        <ListCard iconClass="sprite-hero" label="精彩视频" :categories="heroesCat">
        </ListCard>
    </div>
</template>

<script>
    import Nav from '../components/Nav'
    import Card from '../components/Card'
    import ListCard from '../components/ListCard'
    // import dayjs from 'dayjs'
    export default {
        components: { Nav, Card, ListCard },
        filters: {
            // datefm(val) {
            //     return dayjs().format(" MM/DD")
            // },
            fmCatColor(val) {
                let arr = ["新闻", "公告", "活动", "赛事"]
                let indexof = arr.indexOf(val)
                let classArr = ["notice-color", "activity-color", "news-color", "match-color"]
                return classArr[indexof]
            }
        },
        data() {
            return {
                flag: true,
                swipers: [],
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    autoplay: true, //可设置数值来指定播放速度
                    speed: 400, // 切换图片速度
                    loop: true,
                },
                newsCat: [],
                heroesCat: []
            }
        },
        created: function() {
            // 获取轮播图
            this.getSwiper()
            // 获取新闻列表
            this.getNewsList()
            // 获取英雄列表
            this.getHeroesList()
        },
        methods: {
            // 获取首页轮播图
            async getSwiper() {
                const { data: res } = await this.$http.get("/swiper")
                this.swipers = res.images
            },
            // 获取新闻列表
            async getNewsList() {
                const { data: res } = await this.$http.get("/news/list")
                this.newsCat = res
                console.log(res)
            },
            // 获取英雄列表
            async getHeroesList() {
                const { data: res } = await this.$http.get("/heroes/list")
                this.heroesCat = res
                console.log(res)
            },
            isUnfold() {
                this.flag = !this.flag
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/_variables.scss";

    // @import "../assets/style/style.scss";
    .hero {
        width: 20%;

        img {
            width: 100%;
        }
    }

    .notice-color {
        color: #f09a37;
        border: 1px solid #f09a37;
    }

    .activity-color {
        color: red;
        border: 1px solid red;
    }

    .news-color {
        color: #1e96ab;
        border: 1px solid #1e96ab;
    }

    .match-color {
        color: #4d9cff;
        border: 1px solid #4d9cff;
    }

    ::v-deep .swiper-pagination {
        .swiper-pagination-bullet {
            opacity: 1;
            background-color: map-get($colors, "white");
            border-radius: 0.1538rem;

            &.swiper-pagination-bullet-active {
                background-color: map-get($colors, "primary");
            }
        }
    }

    // nva导航横向排列 的class名
    .width-10 {
        width: 25% * 10 !important;
    }

    .nav {
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;

        .container {
            overflow: auto;

            .navlist {
                .nav-item {
                    border-right: 1px solid $border-color;
                    width: 25%;

                    &:nth-child(4n) {
                        border-right: none;
                    }
                }
            }
        }
    }
</style>