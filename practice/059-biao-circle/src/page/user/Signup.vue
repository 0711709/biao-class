<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="header">注册</div>
        <div id="sign-up">
          <form @submit.prevent="validateSignup">
            <div class="input-control">
              <label>
                <span>用户名</span>
                <input type="text" v-model="current.username" @focus="error.username=false">
                <span v-if="error.username" class="error">{{error.username}}</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <span>密码</span>
                <input type="password" v-model="current.password" @focus="error.password=false">
                <span v-if="error.password" class="error">{{error.password}}</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <span>重复密码</span>
                <input type="password" v-model="current.password2" @focus="error.password2=false">
                <span v-if="error.password2" class="error">{{error.password2}}</span>
              </label>
            </div>
            <button type="submit">注册</button>
          </form>
        </div>
      </div>
      <div class="side">
        <div class="box">
          <div class="header">表圈子</div>
          <div class="intro">十八相送一水黑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../lib/api";

export default {
  data() {
    return {
      current: {},
      error: {
        username: null,
        password: null,
        password2: null
      }
    };
  },

  //测试用 项目完成后删除
  mounted() {
    api("user/read").then(r => {
      console.log(r.data);
    });
  },

  methods: {
    validateSignup() {
      if (!this.validateCurrent()) {
        return;
      }

      let param = { where: { and: { username: this.current.username } } };
      api("user/exists", param).then(r => {
        if (r.data) {
          this.error.username = "用户名已存在";
          return;
        } else {
          this.signup();
        }
      });
    },

    validateCurrent() {
      let e = this.error;
      let username = this.current.username;
      let password = this.current.password;
      let password2 = this.current.password2;

      let inValidateUsername =
        !username ||
        !username ||
        /[\W_]/.test(username) ||
        username.length < 4 ||
        username.length > 20;
      let inValidatePassword = !password || password.length < 6;
      let inValidatePassword2 = !password2 || password2 !== password;

      inValidateUsername
        ? (e.username = "用户名格式有误,长度应在4到20位之间")
        : (e.username = null);

      inValidatePassword
        ? (e.password = "密码长度应大于6位")
        : (e.password = null);

      inValidatePassword2
        ? (e.password2 = "两次密码输入不一致")
        : (e.password2 = null);

      return !e.username && !e.password;
    },

    signup() {
      api("user/create", this.current).then(r => {
        if (r.success) {
          this.current = {};
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style>
</style>


