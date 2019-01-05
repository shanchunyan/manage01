<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索+添加用户 -->
    <el-col style="margin-top: 15px;" class="search">
      <el-input
        clearable
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
        @clear="getAllUsers()"
      >
        <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
      </el-input>
      <el-button type="primary" @click="showDiaAdd()">添加用户</el-button>
    </el-col>
    <!-- 表格 -->
    <!-- create_time: 1486720211
email: "adsfad@qq.com"
id: 500
mg_state: true
mobile: "12345678"
role_name: "主管"
    username: "admin"-->
    <template>
      <el-table :data="tableData" style="width: 100%" height="300px">
        <el-table-column prop="id" label="#" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="80"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="120">
          <template slot-scope="scope">{{scope.row.create_time|format}}</template>
        </el-table-column>
        <el-table-column label="用户状态" width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-edit"
              circle
              @click="showDiaedit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              plain
              icon="el-icon-delete"
              circle
              @click="showDiadelete(scope.row)"
            ></el-button>
            <el-button
              type="success"
              size="mini"
              plain
              icon="el-icon-check"
              circle
              @click="showDiaRole(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加内容的对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑的对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser(form)">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑角色-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名:" :label-width="formLabelWidth">{{currentname}}</el-form-item>

        <el-form-item label="角色:" :label-width="formLabelWidth">{{currentRoldId}}
          <el-select v-model="currentRoldId" placeholder="请选择活动区域" >
              <el-option disabled label="请选择" :value="-1"></el-option>
            <el-option v-for="(v,i) in roles" :key="i" :label="v.roleName" :value="v.id"></el-option>
            <!-- <el-option label="区域二" :value="beijing"></el-option>
            <el-option label="区域一" :value="shanghai"></el-option>
            <el-option label="区域二" :value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>


<script>
export default {
  data() {
    return {
      // 添加弹出窗的默认按钮
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      currentname: "hah",
      currentId:-1,
      currentRoldId:-1,
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      //与请求成功1不同
      total: -1,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "100px",
      roles:[]
    };
  },

  created() {
    this.getTableData();
  },
  methods: {
    // 发送请求
  async setRole(){
    // console.log(this.currentId);
      const res = await this.$http.put(`users/${this.currentId}/role`,{
        rid:this.currentRoldId
      });
      dialogFormVisibleRole = false;
      console.log(res);

    },
    //角色的显示  此处需要修改
  async showDiaRole(roles) {
      console.log(roles);
      this.form = roles;
      this.currentname = roles.username;
      this.currentId = roles.id;
      this.dialogFormVisibleRole = true;
      const res3 = await this.$http.get(`users/${roles.id}`);
      this.currentRoldId = res3.data.data.rid;
    
      const res2 =  await this.$http.get("roles");
      console.log(res2);
      const {meta:{msg,status},data} = res2.data;
      if(status == 200){
       this.roles = data;

      }
    },
    
    //编辑用户列表 1显示
    // 处理用户列表
    async changeStatus(user) {
      console.log(user);
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      console.log(res);
   


    },
    async editUser(form) {
      console.log(form);
      const res = await this.$http.put(`users/${this.form.id}`, this.form);

      const {
        meta: { msg, status }
      } = res.data;
      console.log(res);

      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.getTableData();
        this.$message.warning = "修改成功";
      } else {
        this.$message.warning = "修改失败";
      }
    },
    async showDiaedit(user) {
      this.form = user;
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`users/${user.id}`);

      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        // data
        this.form = data;
        // console.log(this.form);
      }
    },

    //删除用户列表
    showDiadelete(user) {
      // console.log(user + "haha");
      this.$confirm("Sure?????", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${user.id}`);
          // console.log(res);
          this.$message.success("删除成功");
          this.getTableData();
        })
        .catch(() => {
          this.$message.warning("删除失败");
        });
    },
    // //  @size-change 每页的页数
    // @current-change
    // :current-page
    // total
    // 分页的方法
    // 添加列表，1 先弹出对话框
    showDiaAdd() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //添加列表，2 发送添加请求
    async addUser() {
      // 1 发送添加按钮
      const res = await this.$http.post("users", this.form);
      // console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;

      if (status === 201) {
        // 2关闭对话框
        this.dialogFormVisibleAdd = false;
        //3 重新刷新页面
        this.getTableData();
        //4 添加成功
      } else {
        this.$message.warning("添加失败");
      }
    },
    handleSizeChange(val) {
      this.pagenum = 1;
      this.pagesize = val;

      this.getTableData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getTableData();
      console.log(`当前页: ${val}`);
    },
    //按钮点击搜索
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    //
    //   clear(){
    //      this.getTableData();
    //   },
    //  点×时触发的事件
    getAllUsers() {
      this.getTableData();
    },
    //   需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
    //获取数据，渲染页面
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const {
        data: { total, users },
        meta: { msg, status }
      } = res.data;

      // console.log(msg);
      // console.log(status);
      if (status === 200) {
        this.tableData = users;
        this.total = total;
        // console.log(users);
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}

.search .input-with-select {
  width: 360px;
}
</style>
