<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">管理员列表</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      param:{},
      total:0,
    }
  },
  created() {
    const data = this.getList();
   },
  methods: {
   async getList() {
      const {data:res} = await this.$ajax.get('http://rbac/api/v1.admin/index', {params:this.param});
      this.tableData = res.data;
      this.total = res.count;
      console.log(res);
    }
  }
}
</script>
