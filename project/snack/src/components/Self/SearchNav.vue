<template>
  <div class="container">
    <el-row :gutter="10" class="search-nav">
      <el-col class="image" :span="6">
        <router-link to="/">
          <img src="../../../public/mia2.png" alt>
        </router-link>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="input" class="search" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6" class="text-center">
        <Cart/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cart from "./Cart";

export default {
  components: { Cart },

  data() {
    return {
      input: "",
      list: {}
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style scoped>
.search-nav {
  margin: 2rem 0;
}

.search-nav img {
  max-width: 7rem;
}

.search {
  margin-top: 0.15rem;
}

.buy-cart {
  padding: 0.5rem;
}
</style>



