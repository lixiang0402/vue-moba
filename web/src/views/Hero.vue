<template>
    <div>
        <!-- topbar 顶部导航 -->
        <div class="topbar bg-dark py-2 px-3 d-flex ai-center">
            <router-link tag="div" to="/">
                <img src="../assets/logo.png" style="height:2.3077rem">
            </router-link>
            <div class="appname text-white mx-3">王者荣耀</div>
            <div class="text-white flex-1">攻略站</div>
            <router-link tag="div" to="/" class="text-white d-flex ai-center">
                <span class="mx-2">更多英雄</span>
                <span class="fs-xl">></span>
            </router-link>
        </div>
        <!-- 英雄基本信息 -->
        <div class="banner" style="position: relative;" v-if="model.categories" :style="`background-image:url(${model.banner})`">
            <div class="info px-3 py-3">
                <div class="text-white fs-xs">{{model.title}}</div>
                <h2 class="text-white my-1">{{model.name}}</h2>
                <div class="text-white fs-xs ">{{model.categories.map(r=>r.name).join("/")}}</div>
                <div class="d-flex ai-center">
                    <div class="flex-1">
                        <span class="text-white fs-xs  mr-2">难度</span>
                        <span class="grede bg-primary text-white  ">{{model.scores.diffclut}}</span>
                        <span class="text-white fs-xs  mr-2">技能</span>
                        <span class="grede bg-blue-1 text-white ">{{model.scores.skill}}</span>
                        <span class="text-white fs-xs  mr-2">攻击</span>
                        <span class="grede bg-red text-white ">{{model.scores.attack}}</span>
                        <span class="text-white fs-xs  mr-2">生存</span>
                        <span class="grede bg-hui text-white ">{{model.scores.survival}}</span>
                    </div>
                    <div class="d-flex ai-center">
                        <span class="text-white fs-xs">皮肤:</span>
                        <span class="text-white fs-xs mx-2">{{model.skin}}</span>
                        <span class="text-white fs-xs">></span>
                    </div>
                </div>
            </div>
            <div style="position: absolute;" class="gradient w-100 h-100"></div>
        </div>
        <!-- 技能信息区域 -->
        <div class="">
            <!-- 按钮切换-->
            <div class="px-2 bg-white">
                <div class="nav pt-3 pb-2 d-flex jc-around border-bottom bg-white ">
                    <div class="nav-item">
                        <div class="link active">英雄初识</div>
                    </div>
                    <div class="nav-item">
                        <div class="link">进阶攻略</div>
                    </div>
                </div>
            </div>
            <!-- 英雄导航链接区域 -->
            <swiper ref="list">
                <swiper-slide>
                    <!-- skills -->
                    <div class="px-2 py-3 bg-white">
                        <div class="d-flex">
                            <router-link class=" bdr flex-1 d-flex ai-center jc-center bg-skillbg" tag="button" to="/">
                                <img class="scal" src="http://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_06.png" alt="">
                                <div>英雄介绍视频</div>
                            </router-link>
                            <div class="px-2"></div>
                            <router-link tag="button" class=" bdr flex-1 d-flex ai-center jc-center  bg-skillbg" to="/">
                                <img src="http://game.gtimg.cn/images/yxzj/m/m201706/images/herodetail/icon_07.png" class="scal" alt="">
                                <div>一图识英雄</div>
                            </router-link>
                        </div>

                        <!-- skills -->
                        <div class="skills-show" v-if="model">
                            <!-- icon展示 -->
                            <div class="d-flex jc-around mt-4">
                                <div v-for="(item,i) in model.skills" :key="item.name">
                                    <img class="skill-icon" @click="activeIndex=i" :class="activeIndex==i?'activeIndex':''" height="60" width="60" :src="item.icon" alt="">
                                </div>
                            </div>
                            <div class="d-flex mt-3" v-if="currentSkill">
                                <h3 class="mr-5">{{currentSkill.name}}</h3>
                                <div class="flex-1 fs-xs text-grey">(冷却值: {{currentSkill.cooling}} &nbsp; &nbsp;消耗:{{currentSkill.consume}})</div>
                            </div>
                            <div class="skill-description mt-4" v-if="currentSkill">
                                {{currentSkill.description}}
                            </div>
                        </div>
                    </div>
                    <Card :pure="true" iconClass="sprite-news" label="出装推荐">
                        <div class="fs-lg my-3">顺风出装</div>
                        <div class="d-flex ai-center jc-around mt-2 border-bottom">
                            <div v-for="item in model.items1" :key="item._id" class="text-center">
                                <img class="item-icon" height="46.5" width="46.5" v-lazy="item.icon" alt="">
                                <div class="fs-xxs">{{item.name}}</div>
                            </div>
                        </div>

                        <div class="fs-lg my-3">逆风出装</div>
                        <div class="d-flex ai-center jc-around mt-2">
                            <div v-for="item in model.items2" :key="item._id" class="text-center">
                                <img class="item-icon" height="46.5" width="46.5" v-lazy="item.icon" alt="">
                                <div class="fs-xxs">{{item.name}}</div>
                            </div>
                        </div>
                    </Card>

                    <Card :pure="true" iconClass="sprite-news" label="铭文推荐">
                        <div class="d-flex jc-center">
                            <div class="d-flex ai-center" v-for="item in model.runes" :key="item._id">
                                <img style="transform:scale(0.7)" class="mr-1" v-lazy="item.icon" alt="">
                                <div class="fs-xs">
                                    <div class="fs-lg mb-1">{{item.name}}</div>
                                    <div>{{item.property1}}</div>
                                    <div>{{item.property2}}</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card :pure="true" iconClass="sprite-news" label="使用技巧">
                        <p class="fs-sm" style="line-height:1.4rem">{{model.useTip}}</p>
                    </Card>
                    <Card :pure="true" iconClass="sprite-news" label="对抗技巧">
                        <p class="fs-sm" style="line-height:1.4rem">{{model.battleTip}}</p>
                    </Card>
                    <Card :pure="true" iconClass="sprite-news" label="团战技巧">
                        <p class="fs-sm" style="line-height:1.4rem">{{model.teamFight}}</p>
                    </Card>
                    <Card :pure="true" iconClass="sprite-news" label="英雄关系">
                        <div class="fs-lg my-2">最佳搭档</div>
                        <div class="mt-4 border-bottom">
                            <div class="d-flex my-2" v-for="item in model.partners" :key="item._id">
                                <img height="40" width="40" v-lazy="item.hero.avatar" alt="">
                                <div class="fs-sm px-3">{{item.description}}</div>
                            </div>
                        </div>
                        <div class="fs-lg my-2">被谁克制</div>
                        <div class="mt-4 border-bottom">
                            <div class="d-flex my-2" v-for="item in model.naturalEnemys" :key="item._id">
                                <img height="40" width="40" v-lazy="item.hero.avatar" alt="">
                                <div class="fs-sm px-3">{{item.description}}</div>
                            </div>
                        </div>

                        <div class="fs-lg my-2">克制谁</div>
                        <div class="mt-4">
                            <div class="d-flex my-2" v-for="item in model.restrainOneselfs" :key="item._id">
                                <img height="40" width="40" v-lazy="item.hero.avatar" alt="">
                                <div class="fs-sm px-3">{{item.description}}</div>
                            </div>
                        </div>
                    </Card>
                </swiper-slide>
                <swiper-slide>
                    2222222222
                </swiper-slide>

            </swiper>
        </div>
    </div>
</template>

<script>
    import Card from '../components/Card'
    export default {
        components: { Card },
        props: {
            id: { required: true }
        },
        data() {
            return {
                model: {
                    skills: []
                },
                activeIndex: 0
            }
        },
        computed: {
            currentSkill() {
                return this.model.skills[this.activeIndex]
            },
        },
        created: function() {
            // 获取英雄数据
            this.fetch()
        },
        methods: {
            async fetch() {
                const { data: res } = await this.$http.get(`/heroes/${this.id}`)
                this.model = res
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/_variables.scss";

    .item-icon {
        border-radius: 50%;
    }

    .skill-icon {
        border: 0.2308rem solid transparent;
        border-radius: 50%;
    }

    .scal {
        transform: scale(0.5);
    }

    .activeIndex {
        border: 0.2308rem solid map-get($colors, "primary");
    }

    .skill-description {
        line-height: 1.5rem;
    }

    .banner {
        display: flex;
        flex-direction: column-reverse;
        width: 100%;
        height: 14.6923rem;
        background: #000 no-repeat top center;
        background-size: auto 100%;

        .grede {
            width: 1rem;
            height: 0.9rem;
            line-height: 1rem;
            text-align: center;
            font-size: 0.6rem;
            padding: 0.2rem;
            border-radius: 50%;
            margin-right: 0.3077rem;
        }
    }

    .gradient {
        background: linear-gradient(to bottom right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))
    }

    .bdr {
        border: 1px solid #eceef0;
        border-radius: 5px;
    }
</style>