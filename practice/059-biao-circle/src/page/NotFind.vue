<template>
  <div class="not-find">
    <div class="container">
      <div class="content text-center">
        <div class="box">
          <h1>404 未找到页面</h1>
          <span>
              <router-link to="/">返回首页</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-find {
  background: #e2e2e2;
  padding: 1rem 0;
}

.content {
  margin: 4rem;
}

.box {
  padding: 8rem 2rem;
  background: #fff;
  border-radius: 5px;
}

.box span {
    display: inline-block;
    margin: 1rem;
}
</style>

