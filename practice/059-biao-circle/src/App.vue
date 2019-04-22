<template>
  <div id="app">
    <div id="top">
      <div class="container">
        <div class="left">
          <router-link to="/" class="logo">
            <img src="../public/logo-sm.png" alt="logo">
          </router-link>
          <div class="search hidden-sm">
            <input type="search" placeholder="此功能未实现">
          </div>
        </div>
        <div class="right">
          <router-link to="/">首页</router-link>
          <span class="loggedin" v-if="session.loggedin()">
            <router-link to="/member">{{session.user().username}}</router-link>
            <router-link to="/setting/me">设置</router-link>
            <router-link v-if="session.user().IS_ADMIN" to="/admin">后台</router-link>
            <span @click="session.logout()">登出</span>
          </span>
          <span class="guest" v-else>
            <router-link to="/login">登陆</router-link>
            <router-link to="/signup">注册</router-link>
          </span>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div id="footer">
      <div class="container">
        <div class="link-group">
          <span>感谢 VUE </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./css/global.css";
import "./css/main.css";

import session from "./lib/session";

export default {
  name: "app",
  components: {},
  data() {
    return {
      session
    };
  }
};
</script>

<style>
</style>
