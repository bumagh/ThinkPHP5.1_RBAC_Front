<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">角色列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px;">
      <el-button type="primary" size="mini" @click="add()">新增</el-button>
      <el-table border :data="tableData" style="width:100%;margin-top: 10px;">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="create_time" label="日期"></el-table-column>
        <el-table-column prop="name" label="角色名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
            <el-button type="warning" size="mini" @click="ass(scope.row.id)">分配规则</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-change="currentPage"
        :page-sizes="[1, 2, 5, 10]" :page-size="param.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination>
      <el-dialog title="添加表单" :visible.sync="addDialogVisible" width="30%">
        <el-form :model="addform" label-width="80px">
          <el-form-item label="角色名">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio v-model="addform.status" :label="'1'">启用</el-radio>
            <el-radio v-model="addform.status" :label="'0'">禁用</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addSave">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑表单" :visible.sync="editDialogVisible" width="30%">
        <el-form :model="editform" label-width="80px">
          <el-form-item label="角色名">
            <el-input v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio v-model="editform.status" :label='1'>启用</el-radio>
            <el-radio v-model="editform.status" :label='0'>禁用</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editsave">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
      param: {
        key: '',
        page: 1,
        limit: 10
      },
      total: 0,
      addDialogVisible: false,
      addform: {
        name: '',
        status: '1'
      },
      editDialogVisible: false,
      editform: {
        name: '',
        status: ''
      }
    }
  },
  created() {
    const data = this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await this.$ajax.get('http://rbac/api/v1.role/index', { params: this.param });
      this.tableData = res.data;
      this.total = res.count;
    },
    async addSave() {
      const { data: res } = await this.$ajax.post('http://rbac/api/v1.role/save', this.addform);
      if (res.code == 0) {
        this.$msg.success(res.msg);
        this.getList();
        this.addDialogVisible = false;
        this.addform.name = '';
      } else {
        this.$msg.error(res.msg);
      }
    },
    async editsave() {
      const { data: res } = await this.$ajax.post('http://rbac/api/v1.role/save', this.editform);
      if (res.code == 0) {
        this.$msg.success(res.msg);
        this.getList();
        this.editDialogVisible = false;
      } else {
        this.$msg.error(res.msg);
      }
    },
    edit(info) {
      this.editDialogVisible = true;
      this.editform.name = info.name;
      this.editform.status = info.status;
      this.editform.id = info.id;
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
      const { data: res } = await this.$ajax.get('http://rbac/api/v1.role/delete', { params: { id: id } });
      if (res.code == 0) {
        this.$msg.success("删除成功");
        this.getList();
      } else {
        this.$msg.error("删除失败");
      }
    },
    add() {
      this.addDialogVisible = true;
    }
  }
}
</script>
