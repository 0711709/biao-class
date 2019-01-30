<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="box profile">
          <div class="thumb"><img src="../../../public/helloworld.jpg" alt="me"></div>
          <div class="me">
            <div>username</div>
            <div>表圈子第 * 位会员</div>
          </div>
        </div>
        <div class="box">
          <button @click="postOrCancel = !postOrCancel">
            <span v-if="!postOrCancel">创建新主题</span>
            <span v-else>取消创建</span>
          </button>
        </div>
        <div v-if="postOrCancel">
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
        <div class="box thread">
          <div class="cat active">时间线</div>
        </div>
        <div class="box">
          <div class="post">1</div>
        </div>
      </div>
      <div class="side">
        <div class="box">
          <div class="cell">社区指导原则</div>
          <div class="inner">
            <ul>
              <li>
                <span>尊重原创</span>
                <div>请不要在表圈子发布任何盗版下载链接，包括软件、音乐、电影等等。表圈子是创意工作者的社区，我们尊重原创。</div>
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
import dateFormatter from "../../lib/dateFormatter.js"
import api from "../../lib/api.js"

export default {
  data() {
    return {
      postOrCancel: false,
      post: {},
      error: {
        title: false,
        content: false,
        create: false,
      }
    };
  },

  methods: {
    postCreate() {
      if(!this.post.title || this.post.title.length > 120) {
        this.error.title = true;
        return;
      }

      if(this.post.content > 2000) {
        this.error.content = true;
        return;
      }

      this.post.create_at = dateFormatter.format(new Date)
      api("post/create", this.post).then(r => {
        if(!r.success){
          return;
          this.error.create = true;
        }
        console.log(r.data)
        this.post = {};
      })
    }
  },


};
</script>

<style>
</style>


