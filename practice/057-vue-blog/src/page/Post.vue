<template>
  <div class="container content">
    <h1>{{post.title}}</h1>
    <div>{{post.content}}</div>
  </div>
</template>

<script>
import api from "../lib/api";

export default {
  data() {
    return {
      id: null,
      post: {}
    };
  },

  mounted() {
    let id = this.id = this.$route.params.id
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


