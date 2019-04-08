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
            <router-link class="nav-item" to="/help">帮助中心</router-link>
            <router-link class="nav-item" to="/about">联系客服</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <router-view></router-view>
    <div class="global-footer">
      <div class="container">
        <el-row class="policy">
          <el-col class="text-center footer-item" :span="6">
            <i class="el-icon-star-on"></i>正品保障
          </el-col>
          <el-col class="text-center footer-item" :span="6">
            <i class="el-icon-success"></i>新鲜美味
          </el-col>
          <el-col class="text-center footer-item" :span="6">
            <i class="el-icon-info"></i>厂家直销
          </el-col>
          <el-col class="text-center footer-item" :span="6">
            <i class="el-icon-goods"></i>满99包邮
          </el-col>
        </el-row>
      </div>

      <el-row class="info">
        <div class="container">
          <el-col class="text-left f-left" :span="12">
            <img src="../public/logo-sm.png" alt>
            <div>表铺子</div>
          </el-col>
          <el-col :span="12">
            <p>©biaoyansu.com 表B1-20190408 表ICP备186666666号-1</p>
            <p>企业名称：表铺子科技有限公司</p>
            <p>由表学员搭建运营</p>
            <p>地址: 神圣兽国游尾郡窝窝乡 联系方式: 888-888-8888</p>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
.global-nav {
  background-color: #545c64;
  margin-bottom: 2rem;
}

.nav-item {
  padding: 0.5rem;
  color: #eee;
  font-size: 0.9rem;
}

.nav-item:hover {
  color: #fff;
}

.global-footer {
  margin-top: 2rem;
}

.global-footer .policy {
   border-top: 1px solid #999;
}

.footer-item {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 1rem 0;
  padding: .5rem;
  border-right: 1px solid #999; 
}

.footer-item:last-child{
  border-right: 0;
}

.info {
  padding: 1rem;
  border-top: 1px solid #999;
}

.info p {
  font-size: 0.8rem;
}

.info .f-left {
  padding: 2rem 0 2rem 5rem;
}

.info .f-left div {
  font-weight: 600;
}

.info img {
  width: 50px;
  display: inline-block;
}
</style>
