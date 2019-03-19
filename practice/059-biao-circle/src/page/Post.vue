<template>
  <div id="main">
    <div class="container">
      <div id="post" class="section">
        <div>
          <div class="box">
            <div class="title">title</div>
            <div class="info">
              <span>name</span>
              <span>发布于</span>
              <span>time</span>
            </div>
          </div>
          <div class="box content">content</div>
          <div class="comment-area">
            <div class="box comment">
              <div class="head">
                <span>name</span>
                <span>发布于</span>
                <span>time</span>
              </div>
              <div class="content">content</div>
            </div>
            <div class="box comment">1</div>
            <div class="box comment">1</div>
          </div>
          <div class="box sub-comment">
            <form>
              <div class="head">添加回复</div>
              <textarea placeholder="请尽量让自己的回复可以帮助其他人"></textarea>
              <button>回复</button>
            </form>
          </div>
        </div>
      </div>
      <div class="side">
        <div class="box">
          <div class="me" v-if="session.user()">
            <router-link to="/member" class="post">{{session.user().username}}</router-link>
            <div class="collection">收藏</div>
            <router-link to="/member" class="post">创建新主题</router-link>
            <div class="message">消息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";

export default {
  data() {
    return {
      list: [],
      session
    };
  },

  mounted() {
    this.read();
  },

  methods: {
    read() {
      api("post/find", {
        id: this.$route.params.id,
        with: [{ model: "user", relation: "belongs_to" }]
      }).then(r => {
        this.list = r.data;
        console.log(this.list);
      });
    }
  }
};
</script>

<style>
</style>


