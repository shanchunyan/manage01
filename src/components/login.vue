<template>
  <div class="wrap">
    <el-form class="form" :label-position="labelPosition" label-width="80px" :model="formData">
      <h2>用户登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click="handleLogin()" type="primary">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formData: {
        username: "",
        password: "",
        type: ""
      }
    };
  },
  methods: {
    //  handleLogin(){
    //    this.$http.post("login",this.formData)
    //        .then((res)=>{
    //          const {data:{meta:{msg,status},data}}= res
    //          if(status === 200){
    //             //  this.$message({
    //             // type: 'info',
    //             // message: msg
    //             // });
    //             // this.$message.success(msg);
    //             this.$router.push({
    //               name:"home"
    //             });
    //          }else{
    //             //   this.$message({
    //             // type: 'info',
    //             // message: msg
    //             // });
    //              this.$message.warning(msg);
    //          }

    //        })
    //  }
    async handleLogin() {
      const res = await this.$http.post("login", this.formData);
      console.log(res);
      const {data:{meta:{msg,status},data}}= res;

     console.log(data);
      if (status === 200) {
        //  this.$message({
        // type: 'info',
        // message: msg
        // });
        // this.$message.success(msg);
        localStorage.setItem("token",data.token);
        this.$router.push({
          name: "home"
        });
         
      } else {
        //   this.$message({
        // type: 'info',
        // message: msg
        // });
        this.$message.warning(msg);
      }
    }
  }
  // 问题1 $http是啥
  // mounted() {
  //   console.log(this.$http);

  // },
};
</script>

<style>
.wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
}
.wrap .form {
  width: 400px;
  background-color: white;
  padding: 30px;
  border-radius: 20px;
}
</style>
