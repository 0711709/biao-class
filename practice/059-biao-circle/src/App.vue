<template>
  <div id="app">
    <div id="top">
      <div class="container">
        <div class="left">
          <router-link to="/" class="logo">
            <img src="../public/logo-sm.png" alt="logo">
          </router-link>
          <div class="search">
            <input type="search">
          </div>
        </div>
        <div class="right">
          <router-link to="/">首页</router-link>
          <router-link to="/signIn">登陆</router-link>
          <router-link to="/signUp">注册</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div id="footer">
      <div class="container">
        <div class="link-group">
          <router-link to>关于</router-link>
          <router-link to>FAQ</router-link>
          <router-link to>API</router-link>
          <router-link to>我们的愿景</router-link>
          <router-link to>广告投放</router-link>
          <router-link to>感谢</router-link>
          <router-link to>关于</router-link>
          <router-link to>关于</router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import "./css/global.css";
import "./css/main.css";

export default {
  name: "app",
  components: {}
};
</script>

<style>
</style>
