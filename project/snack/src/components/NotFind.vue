<template>
  <div class="not-find">
    <div class="container">
      <div class="box text-center">
        <h1>404 未找到页面</h1>
        <span><router-link to="/">返回首页</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-find {
  padding: 2rem;
}

.box {
  margin: 4rem;
  padding: 8rem 4rem;
  background: #eee;
  border-radius: 5px;
}

.box span:hover{
  color: #999;
}
</style>
