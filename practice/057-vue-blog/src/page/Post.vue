<template>
  <div class="container content artical">
    <h1>{{post.title}}</h1>
    <div class="post-content">{{post.content}}</div>
    <div class="comment-area">
      <button @click="commentFormVisible=!commentFormVisible">评论</button>
      <form v-if="commentFormVisible" class="commentForm">
        <label for>邮箱</label>
        <input type="email">
        <label>评论</label>
        <textarea></textarea>
      </form>
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
      commentFormVisible: false
    };
  },

  mounted() {
    let id = (this.id = this.$route.params.id);
    this.findPost(id);
  },

  methods: {
    findPost(id) {
      api("post/find", { id }).then(r => {
        this.post = r.data;
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
</style>



