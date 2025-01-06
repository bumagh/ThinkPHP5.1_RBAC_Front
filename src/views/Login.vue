<template>
  <div class="login">
    <el-form v-model="LoginForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="LoginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="LoginForm.password" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
   async login() {
      let url = "http://rbac/api/login/index?username=admin&password=123456";
      const {data:res} = await this.$ajax.post(url, this.LoginForm);
      console.log(res);
    }
  }
}
</script>
<style scoped>
.login {
  width: 500px;
  margin: 0 auto;
  margin-top: 200px;
}
</style>
