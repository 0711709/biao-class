<template>
  <div class="container">
    <div class="divide">
      <SearchNav/>
      <!-- <div class="search">
        <form @submit.prevent="uo">
          <el-input placeholder="请输入内容" v-model="input">
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
          <button type="submit" hidden></button>
        </form>
      </div> -->
    </div>
    <div class="filter">
      <el-row class="filter-divide">
        <el-col class="type" :span="4">品牌</el-col>
        <el-col :span="20">
          <el-row class="item">
            <el-col :span="4">卫龙</el-col>
            <el-col :span="4">三只松鼠</el-col>
            <el-col :span="4">米家</el-col>
            <el-col :span="4">徐福记</el-col>
            <el-col :span="4">周大福</el-col>
            <el-col :span="4">黑鸦</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="type" :span="4">分类</el-col>
        <el-col :span="20">
          <el-row class="item">
            <el-col :span="4">休闲食品</el-col>
            <el-col :span="4">甜食</el-col>
            <el-col :span="4">辣条类</el-col>
            <el-col :span="4">方便面</el-col>
            <el-col :span="4">火锅</el-col>
            <el-col :span="4">军粮</el-col>
            <el-col :span="4">肉类</el-col>
            <el-col :span="4">新品</el-col>
            <el-col :span="4">促销</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bar">
      <el-radio-group v-model="radio" size="mini">
        <el-radio-button label="综合"></el-radio-button>
        <el-radio-button label="新品"></el-radio-button>
        <el-radio-button label="价格"></el-radio-button>
      </el-radio-group>
      <div class="price-group">
        <el-input size="mini" placeholder="最低价格"></el-input>
        <el-input size="mini" placeholder="最高价格"></el-input>
      </div>
      <el-checkbox-group v-model="checkList" size="mini">
        <!-- <el-checkbox v-for="it in checkList" :label="it" :key="it">{{it}}</el-checkbox> -->
        <el-checkbox label="包邮"></el-checkbox>
        <el-checkbox label="折扣"></el-checkbox>
        <el-checkbox label="促销"></el-checkbox>
        <el-checkbox label="有货"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="result">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(o, index) in 24" :key="index">
          <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/150x150" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination class="pagination text-center" background layout="prev, pager, next" :total="100"></el-pagination>
    </div>
  </div>
</template>

<script>
import SearchNav from "./SearchNav"

export default {
  components: { SearchNav },
  data() {
    return {
      input: "",
      radio: "综合",
      checkList: []
      // checkList: ["包邮", "折扣", "促销", "有货"],
    };
  },

  methods: {
    uo() {
      console.log(1);
    }
  }
};
</script>

<style scoped>
.search {
  max-width: 500px;
  margin: 1rem auto 2rem;
}

.divide {
  border-bottom: 1px solid #999;
}

.filter {
  margin: 1rem 0;
  border: 1px solid #aaa;
  background-color: #eee;
}

.filter-divide {
  border-bottom: 1px solid #aaa;
}

.filter .type {
  padding: 0.5rem;
  font-size: 80%;
  opacity: 0.6;
}

.filter .item {
  background: #fff;
}

.filter .item > * {
  padding: 0.5rem;
  font-size: 80%;
}

.filter .item > *:hover {
  color: #409eff;
  cursor: pointer;
}

.bar {
  margin-bottom: 1rem;
  background: rgba(150, 150, 150, 0.1);
  padding: 0.2rem;
}

.bar .price-group > *,
.bar > * {
  display: inline-block;
}

.bar .price-group {
  margin: 0 1rem;
}

.bar .price-group > * {
  max-width: 5rem;
}

.pagination {
  margin: 1rem 0 3rem 0;
}
</style>


