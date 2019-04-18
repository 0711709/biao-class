<template>
  <div class="my">
    <SearchNav/>
    <div class="container">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="head">
            <h2>个人中心</h2>
          </div>
          <el-menu class="my-menu" :router="true">
            <el-menu-item index="/my/cart">
              <span slot="title">购物车</span>
            </el-menu-item>
            <el-menu-item index="/my/order">
              <span slot="title">订单</span>
            </el-menu-item>
            <el-menu-item index="/my/setting">
              <span slot="title">个人设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SearchNav from "../Self/SearchNav";

export default {
  components: { SearchNav },
};
</script>

<style>
.my {
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.my .head {
  border-bottom: 1px solid #999;
}

.my .my-menu {
  margin: 1.5rem 0;
}
</style>

