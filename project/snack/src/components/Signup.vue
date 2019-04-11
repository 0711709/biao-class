<template>
  <div class="signup">
    <div class="container">
      <el-form class="form-container" label-position="top">
        <h1 class="text-center">注册</h1>
        <el-tabs v-model="activeName">
          <el-tab-pane label="手机注册" name="phone">
            <el-form-item label="手机号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input>
                <el-button slot="append">发送验证码</el-button>
              </el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="mail">
            <el-form-item label="邮箱">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input>
                <el-button slot="append">发送验证码</el-button>
              </el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">注册</el-button>
          <el-button type="text">
            <router-link to="/">已有帐号, 直接登录</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "phone"
    };
  }
};
</script>

<style>
.signup .form-container {
  max-width: 400px;
  margin: 4rem auto 10rem;
}

.signup .form-container h1{
  margin-bottom: 3rem;
}
</style>


