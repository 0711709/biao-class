<template>
  <div id="main">
    <div class="container">
      <div class="side-left">
        <div class="box-left">
          <div class="header">管理</div>
          <router-link active-class="current" to="/admin/user">管理用户</router-link>
          <router-link active-class="current" to="/admin/post">管理帖子</router-link>
          <router-link active-class="current" to="/admin/comment">管理评论</router-link>
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

