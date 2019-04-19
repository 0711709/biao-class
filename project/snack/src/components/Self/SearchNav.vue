<template>
  <div class="container">
    <el-row :gutter="10" class="search-nav">
      <el-col class="image" :span="6">
        <router-link to="/">
          <img src="../../../public/mia2.png" alt>
        </router-link>
      </el-col>
      <el-col :span="12">
        <form @submit.prevent="toSearch">
          <el-input placeholder="请输入内容" v-model="search.keyword" class="search" clearable>
            <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
          </el-input>
        </form>
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
      search: {
        keyword: "",
      },
    };
  },

  mounted() {},

  methods: {
    toSearch(){
      this.$router.push({path: "/search", query: this.search})
    }
  }
};
</script>

<style>
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



