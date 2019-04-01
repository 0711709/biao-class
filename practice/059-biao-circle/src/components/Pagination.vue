<template>
  <div v-if="total" class="pagination">
    <div class="btn-group">
      <button v-if="count > 3" @click="change(1)" :class="(active == 1? 'active':'') +' item'">首页</button>
      <button v-if="count > 2" @click="pre" class="item">上一页</button>
    </div>
    <div class="btn-group">
      <span v-for="(it, index) in count" :key="index">
        <button
          :class="it === active? 'active': ''"
          @click="onClick(it)"
          class="item"
          v-if="Math.abs(it - active) <= radius"
        >{{it}}</button>
      </span>
    </div>
    <div class="btn-group">
      <button v-if="count > 2" @click="next" class="item">下一页</button>
      <button v-if="count > 3" @click="change(count)" :class="(active == count? 'active':'') +' item'">末页</button>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["total", "limit", "onChange"],
  props: {
    total: {},
    limit: {},
    onChange: {},
    radius: {
      default: 2
    }
  },
  data() {
    return {
      active: 1
    };
  },
  computed: {
    count() {
      return Math.ceil(this.total / this.limit);
    }
  },
  mounted() {
    // console.log(this)
  },
  methods: {
    onClick(page) {
      this.change(page);
    },
    pre() {
      this.change(this.active - 1);
    },
    next() {
      this.change(this.active + 1);
    },
    change(page) {
      if (page < 1 || page > this.count) {
        return;
      }
      this.active = page;
      this.onChange && this.onChange(page);
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.pagination .btn-group > * {
  margin: 0 0.2rem;
}

.pagination .item.active {
  background: #000;
  color: #fff;
  border-color: #000;
}
</style>



