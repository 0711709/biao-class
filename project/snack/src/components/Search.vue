<template>
  <div class="container">
    <div class="divide">
      <!-- <SearchNav/> -->
      <el-row :gutter="10" class="search-nav">
        <el-col class="image" :span="6">
          <router-link to="/">
            <img src="../../public/mia2.png" alt>
          </router-link>
        </el-col>
        <el-col :span="12">
          <form @submit.prevent="reload">
            <el-input placeholder="请输入内容" v-model="query.keyword" class="search" clearable>
              <el-button @click="reload" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </form>
        </el-col>
        <el-col :span="6" class="text-center">
          <Cart/>
        </el-col>
      </el-row>
    </div>
    <div class="filter">
      <el-row class="filter-divide" v-loading="loadingBrand" :class="loadingBrand? 'brand-height': ''">
        <el-col class="type" :span="4">品牌</el-col>
        <el-col :span="20">
          <el-row class="item">
            <el-col :span="4" v-for="(it, index) in brandList" :key="index">{{it.name}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row v-loading="loadingCat" :class="loadingCat? 'cat-height': ''">
        <el-col class="type" :span="4">分类</el-col>
        <el-col :span="20">
          <el-row class="item">
            <el-col :span="4" v-for="(it, index) in catList" :key="index">{{it.name}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bar">
      <el-radio-group v-model="radio" size="mini" @change="setSortBy">
        <el-radio-button label="新品"></el-radio-button>
        <el-radio-button label="价格"></el-radio-button>
        <el-radio-button label="库存"></el-radio-button>
      </el-radio-group>
      <div class="price-group">
        <el-input size="mini" placeholder="最低价格" v-model="query.minPrice"></el-input>
        <el-input size="mini" placeholder="最高价格" v-model="query.maxPrice"></el-input>
        <el-button @click="reload" class="btn" size="mini">确定</el-button>
        <el-button @click="clear" class="btn" size="mini">清除</el-button>
      </div>
      <el-checkbox-group v-model="checkList" size="mini" @change="toggle">
        <!-- <el-checkbox v-for="it in checkList" :label="it" :key="it">{{it}}</el-checkbox> -->
        <el-checkbox label="包邮"></el-checkbox>
        <el-checkbox label="热门"></el-checkbox>
        <el-checkbox label="有货"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="result">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(it, index) in result" :key="index">
          <router-link :to="'/product/' + it.id" v-if="it.main_img">
            <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
              <img :src="it.main_img[0].url" class="image">
              <div style="padding: 14px;" class="text-center content">
                <div class="title" :title="it.title">{{it.title | cutAll(10)}}</div>
                <div class="desc" :title="it.desc">{{it.desc | cutAll(15)}}</div>
                <div class="price">
                  <span class="rmb">{{it.price}}</span>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination text-center"
        background
        layout="prev, pager, next"
        :page-size="limit"
        :total="total"
        :current-page="page"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Cart from "./Self/Cart";

export default {
  components: { Cart },
  data() {
    return {
      catList: [],
      brandList: [],
      query: {},
      radio: "新品",
      checkList: [],
      checkListCopy: ["包邮", "热门", "有货"],
      sortList: {
        新品: ["id"],
        价格: ["price", "up"],
        库存: ["total"]
      },
      result: [],
      total: null,
      limit: 16,
      page: 1,
      loadingCat: true,
      loadingBrand: true,
    };
  },

  mounted() {
    this.read("cat", "loadingCat");
    this.read("brand", "loadingBrand");
    this.query = { ...this.$route.query };
    this.query.sortBy = this.sortList[this.radio];
    this.toggle();
    this.search();
  },

  methods: {
    read(type, loading) {
      api(`${type}/read`).then(r => {
        if (r.success) {
          this[type + "List"] = r.data;
          this[loading] = false;
        }
      });
    },

    setSortBy() {
      this.query.sortBy = this.sortList[this.radio];
      this.reload();
    },

    toggle() {
      this.checkListCopy.forEach(it => {
        this.query[it] = false;
      });
      this.checkList.forEach(it => {
        this.query[it] = true;
      });

      this.reload();
    },

    reload() {
      this.$router.push({ path: "/search", query: { ...this.query } });
    },

    search() {
      let q = this.query;

      let keywordQuery = `"title" contains "${q.keyword}"`;
      let minPriceQuery = q.minPrice ? `and "price" >= ${q.minPrice}` : "";
      let maxPriceQuery = q.minPrice ? `and "price" <= ${q.maxPrice}` : "";
      let freeShippingQuery = q["包邮"] ? `and "shipping_fee" = 0` : "";
      let isHotQuery = q["热门"] ? `and "is_hot" = 1` : "";
      let totalQuery = q["有货"] ? `and "total" > 0` : "";

      let query = `where(
        ${keywordQuery} 
        ${minPriceQuery} 
        ${maxPriceQuery} 
        ${freeShippingQuery} 
        ${isHotQuery} 
        ${totalQuery}
        )`;

      let params = {
        query,
        sort_by: q.sortBy,
        limit: this.limit,
        page: this.page
      };

      api("product/read", params).then(r => {
        if (r.success) {
          console.log(r.data);
          this.result = r.data;
          this.total = r.total;
        }
      });
    },

    clear() {
      this.query.minPrice = this.query.maxPrice = null;
    },

    handleCurrentChange(page){
      this.page = page;
      this.search();
    }
  },

  watch: {
    $route: {
      deep: true,
      handler(n) {
        this.query = { ...n.query };
        this.search();
      }
    }
  }
};
</script>

<style scoped>
.cat-height {
  height: 30px;
}

.brand-height {
  height: 92px;
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

.bar .price-group .btn {
  margin-left: 0.2rem;
}

.bar .price-group > * {
  max-width: 5rem;
}

.pagination {
  margin: 1rem 0 3rem 0;
}

.result .card .content > * {
  margin-bottom: 1rem;
}

.result .card .title {
  font-size: 105%;
  color: #333;
}

.result .image {
  width: 206px;
  height: 206px;
}

.result .card .desc {
  font-size: 70%;
  color: rgba(0, 0, 0, 0.6);
}

.result .card .price {
  color: #e10;
}
</style>


