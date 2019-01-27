<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="box">创建新主题</div>
        <div class="box">
          <span>主题标题</span>
          <span class="msg">120字数以内</span>
        </div>
        <input
          class="box"
          type="text"
          placeholder="请输入主题标题,如果标题能够表达完整内容,则正文可以为空"
          v-model="post.title"
        >
        <div class="box">
          <span>正文</span>
          <span class="msg">200字数以内</span>
        </div>
        <textarea rows="20" v-model="post.content"></textarea>
        <div class="box">
          <button @click="postCreate">发布主题</button>
        </div>
      </div>
      <div class="side">
        <div class="box">
          <div class="cell">社区指导原则</div>
          <div class="inner">
            <ul>
              <li>
                <span>尊重原创</span>
                <div>请不要在 V2EX 发布任何盗版下载链接，包括软件、音乐、电影等等。V2EX 是创意工作者的社区，我们尊重原创。</div>
              </li>
              <li>
                <span>友好互助</span>
                <div>保持对陌生人的友善。用知识去帮助别人。</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    };
  },

  methods:{
    postCreate() {
      console.log(1)
    }
  }
};
</script>

<style>
</style>


