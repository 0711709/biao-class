<template>
  <div class="scroll-load">
    <div v-if="noMore">没有更多了</div>
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
      emit: null
    };
  },

  mounted() {
    this.current = this.page || 1;
    this.bindScroll();
  },

  methods: {
    next() {
      //判断是否正在发送请求
      // if (this.pending) {
      //   return;
      // }
      this.emit = this.current;
      console.log(this.emit, this.current);
      //判断是否到最后一页
      if (this.current >= this.totalPage) {
        return (this.noMore = true);
      }

      this.$emit("flip", ++this.current);
      console.log(this.emit, this.current);
      //判断是否到最后一页
      if (this.current === this.totalPage) {
        return (this.noMore = true);
      }
    },

    bindScroll() {
      console.log(1);
      window.addEventListener("scroll", e => {
        if (this.calcRemain() < 10) {
          if (this.emit === this.current) {
            return;
          }
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
</style>
