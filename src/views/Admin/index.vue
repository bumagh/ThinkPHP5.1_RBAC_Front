<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">管理员列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px;">
      <el-button type="primary" size="mini" @click="add(scope.row)">新增</el-button>
      <el-table border :data="tableData" style="width:100%;margin-top: 10px;">
        <el-table-column prop="create_time" label="日期"></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-change="currentPage"
        :page-sizes="[1, 2, 5, 10]" :page-size="param.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage:1,
      tableData: [],
      param: {
        key: '',
        page: 1,
        limit: 10
      },
      total: 0,
    }
  },
  created() {
    const data = this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await this.$ajax.get('http://rbac/api/v1.admin/index', { params: this.param });
      this.tableData = res.data;
      this.total = res.count;
    },
    handleSizeChange(val) {
      this.param.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.param.page = val;
      this.getList();
    },
    async del(id) {
      const { data: res } = await this.$ajax.get('http://rbac/api/v1.admin/delete', { params: {id:id}});
      if(res.code==0){
        this.$msg.success("删除成功");
        this.getList();
      }else{
        this.$msg.error("删除失败");
      }
    },
  }
}
</script>
