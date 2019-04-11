<template>
  <div class="admin">
    <div class="container">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="head">
            <h2>管理中心</h2>
          </div>
          <el-menu class="admin-menu" :router="true">
            <el-menu-item index="user">
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="brand">
              <span slot="title">品牌管理</span>
            </el-menu-item>
            <el-menu-item index="product">
              <span slot="title">商品管理</span>
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
export default {};
</script>

<style>
.admin {
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.admin .head {
  border-bottom: 1px solid #999;
}

.admin .admin-menu {
  margin: 1.5rem 0;
}
</style>