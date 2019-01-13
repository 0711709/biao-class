<template>
  <div class="container content artical">
    <h1>{{post.title}}</h1>
    <div class="post-content">{{post.content}}</div>
    <div class="comment-area">
      <button @click="commentFormVisible=!commentFormVisible">评论</button>
      <form v-if="commentFormVisible" class="commentForm" @submit.prevent="createComment">
        <label>邮箱</label>
        <input type="email" placeholder="邮箱" v-model="current.email">
        <label>评论</label>
        <textarea placeholder="好人一生平安" v-model="current.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div v-for="(it, index) in commentList" :key="index" class="comment">
          <div class="email">{{it.email}}</div>
          <div class="comment-content">{{it.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";

export default {
  data() {
    return {
      id: null,
      post: {},
      commentFormVisible: false,
      current: {},
      commentList: []
    };
  },

  mounted() {
    let id = (this.id = this.current.post_id = this.$route.params.id);
    this.findPost(id);
    this.readComment();
  },

  methods: {
    findPost(id) {
      api("post/find", { id }).then(r => {
        this.post = r.data;
      });
    },

    createComment() {
      api("comment/create", this.current).then(r => {
        if (r.success) {
          this.current = {};
          this.readComment();
        }
      });
    },

    readComment() {
      api("comment/read", {where: {and: {post_id: this.id}}}).then(r => {
        if (r.success) {
          this.commentList = r.data;
          console.log(r.data)
        }
      });
    }
  }
};
</script>

<style>
.post-content {
  white-space: pre-wrap;
}

.comment-area {
  margin-top: 3rem;
}

.commentForm {
  margin-top: 1rem;
}

.commentForm > * {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.commentForm input,
.commentForm textarea {
  display: block;
  width: 50%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-family: sans-serif;
}

.comment-list {
  margin-top: 2rem;
  border-top: 2px solid rgba(0, 0, 0, .4);
}

.comment {
  border-bottom: 1px solid #999;
}
.comment > * {
  margin: .8rem 0; 
}
</style>



