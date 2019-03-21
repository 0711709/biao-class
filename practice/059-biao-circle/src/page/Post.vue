<template>
  <div id="main">
    <div class="container">
      <div id="post" class="section">
        <div v-if="current.title">
          <div class="box">
            <div class="title">{{current.title}}</div>
            <div class="info">
              <span>{{name(current) || "-"}}</span>
              <span>发布于</span>
              <span>{{current.create_at}}</span>
            </div>
          </div>
          <div class="box content">{{current.content}}</div>
          <div class="comment-area">
            <div class="box comment" v-for="(it,index) in comment" :key="index">
              <div class="head">
                <span>{{name(it)}}</span>
                <span>发布于</span>
                <span>{{it.create_at}}</span>
                <!-- <span>{{index + 1}}楼</span> -->
              </div>
              <div class="content">{{it.content}}</div>
            </div>
          </div>
          <div class="box sub-comment" v-if="session.user()">
            <form @submit.prevent="commentCreate()">
              <div class="head">添加回复</div>
              <textarea placeholder="请尽量让自己的回复可以帮助其他人" v-model="form.content"></textarea>
              <button>回复</button>
            </form>
          </div>
        </div>
        <div v-else >加载中...<i class="fas fa-spinner"></i></div>
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
import dateFormatter from "../lib/dateFormatter.js";
import name from "../lib/name.js";

export default {
  data() {
    return {
      current: [],
      session,
      name,
      comment: [],
      form: {}
    };
  },

  mounted() {
    this.readPost();
    this.readComment();
  },

  methods: {
    readPost() {
      api("post/find", {
        id: this.$route.params.id,
        with: [{ model: "user", relation: "belongs_to" }]
      }).then(r => {
        this.current = r.data;
      });
    },

    readComment() {
      api("comment/read", {
        where: {
          and: { post_id: this.$route.params.id }
        },
        with: [{ model: "user", relation: "belongs_to" }]
      }).then(r => {
        this.comment = r.data;
      });
    },

    commentCreate() {
      if(!this.form.content || !this.form.user_id){
        return;
      }
      this.form.user_id = this.session.user().id;
      this.form.post_id = this.$route.params.id;
      this.form.create_at = dateFormatter.format(new Date());
      api("comment/create", this.form).then(r => {
        this.readComment();
        this.form = {};
      })
    }
  }
};
</script>

<style>
</style>


