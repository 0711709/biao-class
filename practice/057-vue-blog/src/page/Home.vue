<template>
  <div class="container content col-lg-18 col-md-24">
    <div class="articla-group">
      <div class="artical" v-for="(post, index) in postList" :key="index">
        <router-link :to="'post/' + post.id">
          <div class="title">{{post.title}}</div>
          <div class="desc">{{post.content}}</div>
          <div class="more text-right"><a href="">阅读全文</a></div>
        </router-link>
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


