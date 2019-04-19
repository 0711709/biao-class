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
      <el-row
        class="filter-divide"
        v-loading="loadingBrand"
        :class="loadingBrand? 'brand-height': ''"
      >
        <el-col class="type" :span="4">品牌</el-col>
        <el-col :span="20">
          <el-row class="item">
            <el-col
              :span="4"
              v-for="(it, index) in brandList"
              :key="index"
              @click.native="setBrand(it)"
              :class="query.brandId == it.id? 'active': ''"
            >{{it.name}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="type" :span="4">分类</el-col>
        <el-col :span="20">
          <el-row class="item">
            <el-col
              :span="4"
              v-for="(it, index) in catList"
              :key="index"
              @click.native="setCat(it)"
              :class="query.catId == it.id? 'active': ''"
            >{{it.name}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bar">
      <el-radio-group v-model="radio" size="mini" @change="setSortBy">
        <el-radio-button @click.native="setSortUp" label="新品"></el-radio-button>
        <el-radio-button @click.native="setSortUp" label="价格"></el-radio-button>
        <el-radio-button @click.native="setSortUp" label="库存"></el-radio-button>
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
    <div class="result" v-loading="loading" :class="loading? 'height': ''">
      <div v-if="totalNull" class="search-tip">没找到相关产品，为你推荐以下商品</div>
      <div>
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
      </div>
      <el-pagination
        v-if="total > 12"
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
        新品: "id",
        价格: "price",
        库存: "total"
      },
      result: [],
      total: null,
      limit: 12,
      page: 1,
      loading: true,
      loadingCat: true,
      loadingBrand: true,
      totalNull: false
    };
  },

  mounted() {
    this.read("cat", "loadingCat");
    this.read("brand", "loadingBrand");
    this.query = { ...this.$route.query };
    this.query.sortBy = this.sortList[this.radio];
    // this.query.brandId = this.query.catId = null;
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

    setCat(it) {
      if (this.query.catId == it.id) {
        this.query.catId = null;
        this.page = 1;
        this.reload();
        return;
      }
      this.query.catId = it.id;
      this.page = 1;
      this.reload();
    },

    setBrand(it) {
      if (this.query.brandId == it.id) {
        this.query.brandId = null;
        this.page = 1;
        this.reload();
        return;
      }
      this.query.brandId = it.id;
      this.page = 1;
      this.reload();
    },

    setSortBy() {
      this.query.sortBy = this.sortList[this.radio];

      this.page = 1;
      this.reload();
    },

    setSortUp() {
      if (!this.query.sortUp) {
        this.query.sortUp = "1";
      } else {
        delete this.query.sortUp;
      }

      this.page = 1;
      this.reload();
    },

    toggle() {
      this.checkListCopy.forEach(it => {
        this.query[it] = false;
      });
      this.checkList.forEach(it => {
        this.query[it] = true;
      });
      this.page = 1;
      this.reload();
    },

    reload() {
      this.$router.push({ path: "/search", query: { ...this.query } });
    },

    search() {
      this.totalNull = false;
      this.loading = true;

      let q = this.query;

      let keywordQuery = q.keyword
        ? `"title" contains "${q.keyword}"`
        : `"title" contains ""`;
      let minPriceQuery = q.minPrice ? `and "price" >= ${q.minPrice}` : "";
      let maxPriceQuery = q.minPrice ? `and "price" <= ${q.maxPrice}` : "";
      let freeShippingQuery = q["包邮"] ? `and "shipping_fee" = 0` : "";
      let isHotQuery = q["热门"] ? `and "is_hot" = 1` : "";
      let totalQuery = q["有货"] ? `and "total" > 0` : "";

      let catQuery = q.catId ? `and "cat_id" = ${q.catId}` : "";
      let brandQuery = q.brandId ? `and "brand_id" = ${q.brandId}` : "";

      let query = `where(
        ${keywordQuery} 
        ${minPriceQuery} 
        ${maxPriceQuery} 
        ${freeShippingQuery} 
        ${isHotQuery} 
        ${totalQuery}
        ${catQuery}
        ${brandQuery}
        )`;

      let params = {
        query,
        sort_by: [q.sortBy || "id", q.sortUp ? "up" : "down"],
        limit: this.limit,
        page: this.page
      };

      api("product/read", params).then(r => {
        if (r.success) {
          this.result = r.data;
          this.total = r.total;
          this.loading = false;
          if (r.total == 0) {
            this.totalNull = true;
            this.query = { ...{} };
            // this.reload();
            api("product/read").then(e => {
              if (e.success) {
                this.result = e.data;
                this.total = e.total;
                this.loading = false;
              }
            });
          }
        }
      });
    },

    clear() {
      this.query.minPrice = this.query.maxPrice = null;
    },

    handleCurrentChange(page) {
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
.height {
  height: 500px;
}

.cat-height {
  height: 50px;
}

.brand-height {
  height: 92px;
}

.filter .item .active {
  color: #409eff;
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

.result .search-tip {
  padding: 0.5rem 1rem;
  font-size: 90%;
  background: #fff8db;
  margin-bottom: 1.5rem;
}
</style>


