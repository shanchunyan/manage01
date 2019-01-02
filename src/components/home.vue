<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="@/assets/logo.png" alt srcset>
          </div>
        </el-col>
        <el-col :span="16" class="middle">
          <h1>电商管理系统</h1>
        </el-col>
        <el-col :span="4" class="loginout">
          <a href="#" @click.prevent="handleLoginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">

          <!-- 第一个 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="1-3">
              <i class="el-icon-success"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 第二个 -->
                     <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-success"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="1-4">
              <i class="el-icon-success"></i>
              权限列表
            </el-menu-item>
          </el-submenu>

          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-success"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-success"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-success"></i>
              商品分类
            </el-menu-item>
          </el-submenu>

          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-success"></i>
              订单列表
            </el-menu-item>
          </el-submenu>

          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-success"></i>
              数据报表
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    beforeCreate() {
        if(!localStorage.getItem('token')){
            this.$message.warning("请先登陆");
            this.$router.push({
                name:'login'
            })
        }
    },
    methods: {
        // 退出登陆
        handleLoginout(){
            localStorage.clear();
            
            this.$router.push({
                name:'login'
            });
            this.$message.success("退出成功");
        },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  
};
</script>

<style>
.container {
  height: 100%;
  /* background-color: yellow; */
}
.container .header {
  background-color: #b3c0d1;
}
.container .header .middle {
  color: white;
  text-align: center;
  line-height: 60px;
}
.container .header .loginout a {
  text-decoration: none;
  line-height: 60px;
}
.container .aside {
  /* background-color: blue; */
}
.container .main {
  /* background-color: black; */
}
</style>
