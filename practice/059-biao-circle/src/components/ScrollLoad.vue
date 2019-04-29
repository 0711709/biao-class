<template>
  <div class="scroll-load">
    <div v-if="noMore" class="no-more">已经到底了</div>
    <button v-else @click="next">
      <span v-if="pending">加载中...</span>
      <span v-else>加载更多</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["page", "flip", "pending", "totalPage"],
  data() {
    return {
      current: 1,
      noMore: false,
    };
  },

  mounted() {
    this.current = this.page || 1;
    this.bindScroll();
  },

  methods: {
    next() {
      //判断是否正在发送请求
      if (this.pending) {
        return;
      }
      //判断是否到最后一页
      if (this.current >= this.totalPage) {
        return (this.noMore = true);
      }

      this.$emit("flip", ++this.current);
      //判断是否到最后一页
      // if (this.current === this.totalPage) {
      //   return (this.noMore = true);
      // }
    },

    bindScroll() {
      window.addEventListener("scroll", e => {
        if (this.calcRemain() < 10) {
          this.next();
        }
      });
    },

    calcRemain() {
      let html = document.documentElement;
      let htmlHeight = html.scrollHeight;
      let scrollTop = html.scrollTop;
      let windowHeight = window.innerHeight;

      let result = htmlHeight - windowHeight - scrollTop;
      return result;
    }
  }
};
</script>

<style scoped>
.scroll-load {
  text-align: center;
}

.scroll-load button {
  padding: 0.5rem;
  width: 100%;
  border: 0;
  background: #eeeeee;
}

.scroll-load .no-more {
  display: inline-block;
  margin: .5rem;
  padding: .5rem;
  font-size: 90%;
  color: rgba(0, 0, 0, .6)
}
</style>
