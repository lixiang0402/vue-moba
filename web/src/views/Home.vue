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
                    <div class="nav-item text-center mb-3" v-for="n in 10" :key="n">
                        <router-link to="/">
                            <i class="nav-icon sprite sprite-news mb-1"></i>
                            <div>故事站</div>
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


        <!-- <Card iconClass="sprite-news" label="新闻资讯">
            <Nav class="jc-between" :navlink="navlink"></Nav>
            <swiper>
                <swiper-slide v-for="n in 5" :key="n">
                    <div class="new d-flex mb-3 pt-2" v-for="j in 5" :key="j" style="overflow:hidden">
                        <i>[公告]</i>
                        <span class="title mx-2 flex-1">6月20日体验服停机更新公告</span>
                        <span class="time mx-2">06/20</span>
                    </div>
                </swiper-slide>
            </swiper>
        </Card> -->
        <ListCard iconClass="sprite-news" label="新闻资讯" :categories="newsCat">
            <template #item="{category}">
                <div class="new d-flex mb-2 pt-2 px-1" v-for="(item,i) in category.newsList" :key="i">
                    <span style="padding:0 0.0869rem;border-radius:4px" class="fs-xs" :class=" item.categoryName |fmCatColor">{{item.categoryName}}</span>
                    <span class="title mx-2 flex-1 text-ellipsis">{{item.title}}</span>
                    <span class="time mx-2 fs-xs text-grey">{{item.createdAt | datefm}}</span>
                </div>
            </template>
        </ListCard>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
    </div>
</template>

<script>
    import Nav from '../components/Nav'
    import Card from '../components/Card'
    import ListCard from '../components/ListCard'
    import dayjs from 'dayjs'
    export default {
        components: { Nav, Card, ListCard },
        filters: {
            datefm(val) {
                return dayjs().format(" MM/DD")
            },
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
                newsCat: []
            }
        },
        created: function() {
            // 获取轮播图
            this.getSwiper()
            // 获取新闻列表
            this.getNewsList()
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
            isUnfold() {
                console.log(this.flag);
                this.flag = !this.flag
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/_variables.scss";

    // @import "../assets/style/style.scss";
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
        border: 1px solid #1e96ab
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