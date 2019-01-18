<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="header">注册</div>
        <div id="sign-up">
          <form @submit.prevent="signUp">
            <div class="input-control">
              <label>
                <span>昵称</span>
                <input type="text">
              </label>
            </div>
            <div class="input-control">
              <label>
                <span>用户名</span>
                <input type="text">
              </label>
            </div>
            <div class="input-control">
              <label>
                <span>密码</span>
                <input type="password">
              </label>
            </div>
            <button type="submit">注册</button>
          </form>
        </div>
      </div>
      <div class="side">
        <div class="border">
          <div class="header">表圈子</div>
          <div class="intro">十八相送一水黑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>


