<template>
  <div id="main">
    <div class="container">
      <div class="side-left">
        <div class="box-left">
          <div class="header">个人设置</div>
          <router-link class="item" active-class="current" to="/setting/me">基础信息</router-link>
          <router-link class="item" active-class="current" to="/setting/security">安全设置</router-link>
        </div>
      </div>
      <div class="section-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
