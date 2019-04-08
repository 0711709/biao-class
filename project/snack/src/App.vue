<template>
  <div id="app">
    <div class="global-nav">
      <div class="container">
        <el-row>
          <el-col :span="12" class="text-left">
            <router-link class="nav-item" to="/">表商铺</router-link>
          </el-col>
          <el-col :span="12" class="text-right">
            <router-link class="nav-item" to="/login">登陆</router-link>
            <router-link class="nav-item" to="/signup">注册</router-link>
            <router-link class="nav-item" to="/about">帮助中心</router-link>
            <router-link class="nav-item" to="/about">联系客服</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
.global-nav{
  background-color: #545c64
}

.nav-item {
  padding: 0.5rem;
  color: #eee;
  font-size: .9rem;
}

.nav-item:hover {
  color: #fff;
}
</style>
