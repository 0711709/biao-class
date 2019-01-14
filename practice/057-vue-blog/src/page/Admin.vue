<template>
  <div class="container content">
    <div id="side">
        <router-link active-class="active" to="post">管理文章</router-link>
        <router-link active-class="active" to="comment">管理评论</router-link>
        <router-link active-class="active" to="cat">管理分类</router-link>
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
  width: 15%;
  display: inline-block;
  margin-right: 5%;
  vertical-align: top
}

#side a {
  display: block;
  margin: 1rem 0;
  text-align: center;
  padding: 1rem 0;
}
</style>

