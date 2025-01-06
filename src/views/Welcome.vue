<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
      <el-menu :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>
            管理员功能
          </template>
          <el-menu-item index="/admin">管理员列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>
            角色功能
          </template>
          <el-menu-item index="/role">角色列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>
            规则
          </template>
          <el-menu-item index="/rule">规则列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-button type="primary" @click="logout()" class="logout-btn">退出</el-button>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      LoginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>
<style>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #2b4b6b;
  color: #fff;
}

.el-aside {
  background-color: #ccc;
  height: 100%;
}

.el-main {
  background-color: #fff;
}

.logout-btn {
  float: right;
  margin-top: 10px;
}
</style>
