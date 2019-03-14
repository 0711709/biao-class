<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="cat-group box">
          <div class="cat active">全部</div>
          <div class="cat">最新</div>
          <div class="cat">热门</div>
          <div class="cat">其他</div>
        </div>
        <div class="box" v-for="(it,index) in list" :key="index">
          <div class="post">
            <div class="left">
              <img src="..\..\public\helloworld.jpg" alt="img">
            </div>
            <div class="right">
              <router-link :to="'post/' + it.id"><div class="title">{{it.title}}</div></router-link>
              <div class="info">{{it.$user? it.$user.username: "-"}} 发布于 {{it.create_at}}</div>
            </div>
            <div class="operate" v-if="it.$user && session.user() && (it.$user.id === session.user().id)">
              <button @click="postDelete(it.id)">删除</button>
            </div>
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
      api("post/read", { with: [{ model: "user", relation: "belongs_to" }] }).then(r => {
        this.list = r.data;
      });
    },

    postDelete(id) {
      api("post/delete", {id}).then(r => {
        if(r.success) {
          this.read();
        }
      })
    }
  }
};
</script>

<style>
</style>


