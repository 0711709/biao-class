<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="cat-group">
          <div class="cat active">全部</div>
          <div class="cat">最新</div>
          <div class="cat">热门</div>
          <div class="cat">其他</div>
        </div>
        <router-view></router-view>
      </div>
      <div class="side">
        <div class="box">
          <div class="me">
            <div class="name">username</div>
            <div class="collection">收藏</div>
            <router-link to="/member" class="post">创建新主题</router-link>
            <div class="message">消息</div>
          </div>
        </div>
        <div class="box">
          <div class="state">
            <div class="title">社区运行状况</div>
            <div class="number">
              <div class="member">注册人数</div>
              <div class="topic">主题</div>
              <div class="comment">回复</div>
            </div>
            <div class="date">运行时间</div>
          </div>
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


