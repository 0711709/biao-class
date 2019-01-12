<template>
  <div id="app">
    <div class="container header">
      <div class="title text-center-md">
        <div class="logo">VUE</div>
        <div class="name">1803的博客</div>
      </div>
      <div class="nav text-right text-center-md">
        <router-link to="/" active-class='current' exact>首页</router-link>
        <router-link to="/Admin" active-class='current' exact>管理</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import "./css/global.css";
import "./css/main.css";
import "./css/home.css";
// import api from './lib/api';

export default {
  name: "app",
  components: {
    // HelloWorld
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
