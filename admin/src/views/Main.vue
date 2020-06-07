<template>
    <el-container style="height: 100vh">
        <el-aside width="200px" style="backgroundColor:rgb(241, 241, 241)">
            <el-menu router :default-active="activepath" class="el-menu-vertical-demo" :unique-opened="true" :collapse-transition="false" @select="select">
                <el-submenu index="categories">
                    <template slot="title">
                        <i class="el-icon-copy-document"></i>
                        <span>内容管理</span>
                    </template>
                    <el-menu-item index="/categories/edit">分类编辑</el-menu-item>
                    <el-menu-item index="/categories/list">分类列表</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>

            </el-header>
            <el-main class="bg">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        data() {
            return {
                activepath: "",
            }
        },
        created() {
            this.activepath = localStorage.getItem("activepath")
        },
        methods: {
            select(index, idnexpath) {
                this.activepath = index
                localStorage.setItem('activepath', index)
            }
        },
    };
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

    }

    .bg {
        background: #fafafa;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>