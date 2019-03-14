<template>
    <div id="main">
      <div class="container">
        <div class="section">
          <div>
            <div class="box">表圈子</div>
            <div class="box title">title</div>
            <div class="box content">content</div>
            <div class="box comment">comment</div>
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
      api("post/find", { with: [{ model: "user", relation: "belongs_to" }] }).then(r => {
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


