<template>
  <div class="login">
    <div class="container">
      <el-form class="form-container" label-position="top">
        <h1 class="text-center">登录</h1>
        <el-form-item label="手机号/邮箱">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登录</el-button>
          <el-button type="text"><router-link to="/">忘记密码?</router-link></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.login .form-container {
  max-width: 400px;
  margin: 4rem auto 10rem;
}

.login .form-container h1{
  margin-bottom: 3rem;
}
</style>
