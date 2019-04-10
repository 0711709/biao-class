<template>
  <div class="container">
    <el-row :gutter="10" class="search-nav">
      <el-col class="image" :span="6">
        <img src="../../public/mia2.png" alt>
      </el-col>
      <el-col :span="12">
        <form class="search" @submit.prevent>
          <el-input class="baseline" placeholder="请输入搜索内容" v-model="input"></el-input>
          <button type="submit" hidden></button>
        </form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  }
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
    margin-top: .15rem;
}

</style>



