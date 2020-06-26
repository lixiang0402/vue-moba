<template>
    <div class="article">
        <!-- 头部 back 标题 时间 部分 -->
        <div class="nav d-flex ai-center px-2 py-2 border-bottom" v-if="this.article">
            <router-link tag="div" to="/" class="back"></router-link>
            <div class="flex-1 fs-xl px-2 text-ellipsis text-blue">{{article.title}}</div>
            <div class="fs-xs text-grey">{{article.updatedAt| fmdate("YYYY-MM-DD")}}</div>
        </div>
        <!-- 文章部分 -->
        <div class="article-body px-3 fs-lg" v-html="article.body"></div>
        <!-- 相关文章 部分 -->
        <div class="corren-article px-3">
            <div class="d-flex ai-center">
                <div class="correlation"></div>
                <div class="text-blue fs-lg flex-1" style="font-weight:bold">相关资讯</div>
            </div>
            <div>
                <router-link tag="div" :to="`/article/${item._id}`" v-for="item in article.releted" :key="item._id" class="d-flex ai-center mt-2">
                    <div class="text-ellipsis flex-1">{{item.title}}</div>
                    <div class="fs-xs text-grey">{{item.updateAt |fmdate("YYYY-MM-DD")}}</div>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: { required: true }
        },
        data() {
            return {
                article: {}
            }
        },
        created: function() {
            this.fetch()
        },
        watch: {
            id() {
                this.fetch()
            }
        },
        methods: {
            async fetch() {
                const { data: res } = await this.$http.get(`/article/${this.id}`);
                this.article = res
            }
        },
    }
</script>

<style scoped lang="scss">
    .article {
        .nav {
            .back {
                width: 1.2308rem;
                height: 2.1538rem;
                background: url(http://game.gtimg.cn/images/yxzj/m/m201606/cp/backBg.png) no-repeat 0 0;
                transform: scale(0.7);
            }
        }

        ::v-deep .article-body {
            line-height: 20px;

            img {
                max-width: 100%;
                height: auto;
            }

            iframe {
                width: 100%;
                height: auto;
            }
        }

        .corren-article {
            .correlation {
                width: 2.2308rem;
                height: 2.1538rem;
                background-size: 1rem;
                background: url(http://game.gtimg.cn/images/yxzj/m/m201606/cp/lin.png) no-repeat 0 0;
                transform: scale(0.8);
            }
        }
    }
</style>