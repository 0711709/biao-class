<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="header">注册</div>
        <div id="sign-up">
          <form @submit.prevent="signup">
            <div class="input-control">
              <label>
                <span>用户名</span>
                <input type="text" v-model="current.username">
                <span v-if="error.username" class="error">{{error.username}}</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <span>密码</span>
                <input type="password" v-model="current.password">
                <span v-if="error.password" class="error">{{error.password}}</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <span>重复密码</span>
                <input type="password" v-model="current.password2">
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
  methods: {
    signup() {
      if (!this.validateCurrent()) {
        return;
      }

      api("user/create", this.current).then(r => {
        if (r.success) {
          this.current = {};
          
          this.$router.push("/login");
        }
      });
    },

    validateCurrent() {
      let e = this.error;
      let username = this.current.username;
      let password = this.current.password;
      let password2 = this.current.password2;

      let inValidateUsername = !username || !/[a-zA-Z0-9]{4,20}/.test(username);
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
    }
  }
};
</script>

<style>
</style>


