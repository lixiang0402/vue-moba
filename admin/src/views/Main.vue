<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="backgroundColor:rgb(241, 241, 241)">
      <el-menu router :default-active="activepath" class="el-menu-vertical-demo" :unique-opened="true" :collapse-transition="false" @select="select">
        <el-submenu index="categories">
          <template slot="title">
            <i class="el-icon-copy-document"></i>
            <span>分类管理</span>
          </template>
          <el-menu-item index="/categories/edit">添加分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-submenu>
        <el-submenu index="items">
          <template slot="title">
            <i class="el-icon-full-screen"></i>
            <span>装备管理</span>
          </template>
          <el-menu-item index="/items/edit">添加物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-submenu>
        <el-submenu index="runes">
          <template slot="title">
            <i class="el-icon-orange"></i>
            <span>铭文管理</span>
          </template>
          <el-menu-item index="/runes/edit">添加铭文</el-menu-item>
          <el-menu-item index="/runes/list">铭文列表</el-menu-item>
        </el-submenu>
        <el-submenu index="heroes">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>英雄管理</span>
          </template>
          <el-menu-item index="/heroes/edit">添加英雄</el-menu-item>
          <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
        </el-submenu>
        <el-submenu index="articles">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>新闻管理</span>
          </template>
          <el-menu-item index="/articles/edit">添加文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-submenu>

        <el-submenu index="ads">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>广告管理</span>
          </template>
          <el-menu-item index="/ads/edit">添加广告</el-menu-item>
          <el-menu-item index="/ads/list">广告列表</el-menu-item>
        </el-submenu>

        <el-submenu index="admin_user">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>管理员</span>
          </template>
          <el-menu-item index="/admin_user/edit">添加管理员</el-menu-item>
          <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
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
  watch: {
    $route(to, from) {
      // if (to.path.endsWith('list') || to.path.endsWith('edit')) {
      this.activepath = to.path
      // } else {
      // this.activepath = to.path.slice(0, to.path.lastIndexOf("/"))
      // }
    }
  },

  methods: {
    select(index, idnexpath) {
      // console.log(index);
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
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>