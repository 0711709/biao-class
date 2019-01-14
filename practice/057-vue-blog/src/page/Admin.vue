<template>
  <div class="container content">
    <div id="side">
        <router-link to="post">管理文章</router-link>
        <router-link to="comment">管理评论</router-link>
        <router-link to="cat">管理分类</router-link>
    </div>
    <router-view> 
    </router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
#side {
  width: 20%;
  display: inline-block;
  margin-right: 10%;
}

#side a {
  display: block;
  margin: 3rem 0;
  text-align: center;
}
</style>

