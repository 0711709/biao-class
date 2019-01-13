<template>
  <div class="container main">
    <div class="post-list">
      <div class="post" v-for="(post, index) in postList" :key="index">
        <div>
          <a href>{{post.title}}</a>
        </div>
        <div>{{post.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";

export default {
  data() {
    return {
      postList: []
    };
  },

  mounted() {
    this.readPost();
  },

  methods: {
    readPost() {
      api("post/read").then(r => {
        this.postList = r.data;
      });
    }
  }
};
</script>


