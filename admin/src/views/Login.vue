<template>
  <div>
    <el-card header="请登录" style="width:30%;margin:8rem auto;text-align:center">
      <el-form ref="form" :model="model" :rules="rules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form style="text-align:center">
          <el-button type="success" @click.stop.prevent="submit('form')">登录</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      model: {},
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  created: function () { },
  methods: {
    submit(form) {
      this.$refs[form].validate(async v => {
        if (v) {
          let { data: token } = await this.$http.post("/login", this.model)
          // 将返回的token存入storage中
          localStorage.setItem('jwt-token', token)
          this.$message.success("登录成功")
          this.$router.push("/")
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>