<template>
  <div class="container content artical">
    <h1>{{post.title}}</h1>
    <div class="cat" v-if="post.$cat">分类: {{post.$cat.name}}</div>
    <div class="post-content">{{post.content}}</div>
    <div class="comment-area">
      <button @click="commentFormVisible=!commentFormVisible">评论</button>
      <form v-if="commentFormVisible" class="commentForm" @submit.prevent="createComment">
        <label>邮箱</label>
        <input type="email" placeholder="邮箱" class="comment-md" v-model="current.email">
        <label>评论</label>
        <textarea placeholder="好人一生平安" class="comment-md" v-model="current.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div v-for="(it, index) in commentList" :key="index" class="comment">
          <div class="email">
            {{it.email}}
            <span v-if="it.reply_to">回复 {{it.$reply_to.email}}</span>
          </div>
          <div class="comment-content">{{it.content}}</div>
          <button @click="fillReply(it)">回复</button>
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
      let param = {
        id,
        with: [
          {
            model: "cat",
            relation: "belongs_to",
          }
        ]
      };

      api("post/find", param).then(r => {
        this.post = r.data;
        console.log(r.data)
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
      let param = {
        with: [
          {
            model: "comment",
            relation: "belongs_to",
            foreign_key: "reply_to",
            as: "reply_to"
          }
        ],
        where: { and: { post_id: this.id } }
      };

      api("comment/read", param).then(r => {
        if (r.success) {
          this.commentList = r.data;
        }
      });
    },

    fillReply(comment) {
      this.commentFormVisible = true;
      this.current.reply_to = comment.id;
    }
  }
};
</script>

<style>
.post-content {
  white-space: pre-wrap;
}

.cat {
  margin: 0.5rem 0;
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
  border-top: 2px solid rgba(221, 221, 221, 0.4);
}

.comment {
  border-bottom: 1px solid #ddd;
}
.comment > * {
  margin: 0.8rem 0;
}

@media screen and (max-width: 800px) {
  .comment-md {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>



