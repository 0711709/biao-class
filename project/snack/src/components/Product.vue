<template>
  <div>
    <SearchNav/>
    <div class="product" v-loading="loading">
      <div class="product-head">
        <div class="container">
          <router-link to="/" class="item item-home">首页</router-link>
          <span class="item">></span>
          <span class="item">{{row.$cat.name || "分类"}}</span>
          <span class="item">></span>
          <span class="item">{{row.$brand.name || "品牌"}}</span>
        </div>
      </div>
      <div class="overview">
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-carousel height="350px">
                <el-carousel-item v-for="(item, index) in row.main_img" :key="index">
                  <img :src="item.url" alt="图">
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :span="14">
              <el-row>
                <div class="title">
                  <h3>{{row.title}}</h3>
                </div>
              </el-row>
              <div class="desc">{{row.desc}}</div>
              <div class="price-card background">
                <el-row>
                  <el-col :span="2">
                    <span class="small">价格</span>
                  </el-col>
                  <el-col :span="22">
                    <span class="hot rmb">{{row.price}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="2">
                    <span class="small">运费</span>
                  </el-col>
                  <el-col :span="22">
                    <span class="rmb small">{{row.shipping_fee}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="2">
                    <span class="small">服务</span>
                  </el-col>
                  <el-col class="service" :span="22">
                    <span class="small-black">正品保障</span>
                    <span class="small-black">破损包换</span>
                    <span class="small-black">满99包邮</span>
                  </el-col>
                </el-row>
              </div>
              <el-row class="info">
                <el-col class="text-center" :span="8">
                  <span class="small">库存</span>
                  <span class="hot-small">{{row.total}}</span>
                </el-col>
                <el-col class="text-center" :span="8">
                  <span class="small">累计销量</span>
                  <span class="hot-small">999</span>
                </el-col>
                <el-col class="text-center" :span="8">
                  <span class="small">送积分</span>
                  <span class="hot-small">10</span>
                </el-col>
              </el-row>
              <el-row class="space option" v-for="(options, value) in row.prop" :key="value">
                <el-col :span="3">
                  <span class="small">{{value}}</span>
                </el-col>
                <el-col class="pill-option" :span="21">
                  <span
                    v-for="(option, index) in options.split('|')"
                    :key="index"
                    @click="setProp(value, option)"
                    :class="form.prop[value] == option? 'active': ''"
                  >{{option}}</span>
                </el-col>
              </el-row>
              <el-row class="space much">
                <el-col :span="3">
                  <span class="small number">数量</span>
                </el-col>
                <el-col :span="21">
                  <el-input-number
                    v-model="num"
                    size="mini"
                    controls-position="right"
                    :min="1"
                    :max="10"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row class="space">
                <el-col :span="21" :offset="3">
                  <el-button type="danger" size="medium" plain @click="createOrder">立即购买</el-button>
                  <el-button type="danger" size="medium" @click="addCart">加入购物车</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail">
        <div class="container">
          <el-tabs type="border-card" class="card">
            <el-tab-pane label="商品详情">
              <div v-for="(item, value) in row.detail" :key="value">
                <img :src="item.url" alt="图">
              </div>
            </el-tab-pane>
            <el-tab-pane label="产品参数">
              <div class="product-info">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <p>生产许可证编号：SC10443061200101</p>
                    <p>厂址：湖南省岳阳市经济开发区康王工</p>
                    <p>储藏方法：30℃以下阴凉避光保存</p>
                    <p>产品名称：劲仔 劲仔豆干1000克组合</p>
                    <p>口味: 60号】香辣味*2盒 61号】麻辣味</p>
                    <p>重量(g): 1000</p>
                  </el-col>
                  <el-col :span="8">
                    <p>产品标准号：Q/YPHW 0003S1</p>
                    <p>厂家联系方式：0730-8652199</p>
                    <p>保质期：365 天</p>
                    <p>品牌: 劲仔</p>
                    <p>产地: 中国大陆</p>
                    <p>包装方式: 包装</p>
                  </el-col>
                  <el-col :span="8">
                    <p>厂名：湖南省华文食品有限公司</p>
                    <p>配料表：饮用水、非转基因大豆、植物油</p>
                    <p>食品添加剂：有</p>
                    <p>系列: 劲仔豆干1000克组合</p>
                    <p>省份: 湖南省</p>
                    <p>豆制品种类: 豆腐干</p>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchNav from "./Self/SearchNav";
import { orderSum } from "../lib/help.js";
import session from "../lib/session";
import api from "../lib/api";
import cart from "../lib/cart";

export default {
  components: { SearchNav },
  data() {
    return {
      num: 1,
      row: {
        $cat: { name: "" },
        $brand: { name: "" }
      },
      findParams: {
        id: null,
        with: [
          { model: "brand", relation: "belongs_to" },
          { model: "cat", relation: "belongs_to" }
        ]
      },
      form: {
        prop: {}
      },
      loading: true,
      cart
    };
  },

  mounted() {
    this.findParams.id = this.$route.params.id;
    this.find();
  },
  methods: {
    find() {
      api("product/find", this.findParams).then(r => {
        if (r.success) {
          this.row = r.data;
          this.loading = false;
        }
      });
    },

    setProp(value, option) {
      this.$set(this.form.prop, value, option);
    },

    allPropChecked() {
      let props = this.row.prop;

      for (let key in props) {
        if (!this.form.prop[key]) {
          return false;
        }
      }
      return true;
    },

    createOrder() {
      //检查是否选中所有属性
      if (!this.allPropChecked()) {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [h("span", null, "请选择所有商品类型 ")]),
          confirmButtonText: "确定"
        });
        return;
      }
      //完成订单数据
      this.form.product_id = this.row.id;
      this.form.count = this.num;
      this.form.product_snapshot = this.row;
      this.form.status;

      let order = {
        detail: [this.form]
      };
      order.user_id = session.user().id;
      order.sum = orderSum(order.detail);
      // order.status = "created";

      //提交订单并跳转至个人订单页面
      api("order/create", order).then(r => {
        if (r.success) {
          this.$router.push(`/my/order/${r.data.id}`);
        }
      });
    },

    addCart() {
      //检查是否选中所有属性
      if (!this.allPropChecked()) {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [h("span", null, "请选择所有商品类型 ")]),
          confirmButtonText: "确定"
        });
        return;
      }

      cart.change(this.row.id, this.num, this.row, this.form.prop)
    }
  }
};
</script>

<style>
.product {
  margin-top: 3rem;
}

.product-head {
  margin: 2rem 0;
}

.product-head .container {
  padding: 0.5rem 0;
  border: solid #999;
  border-width: 1px 0;
}

.product-head .item {
  padding-right: 0.2rem;
  font-size: 90%;
}

.product-head .item-home {
  font-weight: 600;
}

.product-head .item-home:hover {
  color: #409eff;
}

.overview .title h3 {
  margin: 0;
  padding: 0 0 0.6rem 0;
  font-size: 1.1rem;
}

.overview .desc {
  font-size: 85%;
  color: rgba(0, 0, 0, 0.7);
  padding: 0 0 0 0.1rem;
}

.overview .price-card {
  margin: 1rem 0;
  background-color: #f9f9f9;
}

.overview .price-card > * {
  padding: 0.5rem;
}

.service > * {
  display: inline-block;
  margin-right: 1rem;
}

.rmb::before {
  content: "￥";
}

.hot {
  color: #e10;
  font-weight: bold;
  font-size: 120%;
}

.small {
  font-size: 80%;
  color: rgb(0, 0, 0, 0.6);
}

.small-black {
  font-size: 80%;
}

.pill-option > * {
  margin-right: 0.5rem;
  padding: 0.3rem;
  border: 2px solid rgba(0, 0, 0, 0.2);
  font-size: 80%;
}

.pill-option > *:hover {
  border-color: #e10;
  cursor: pointer;
}

.pill-option .active {
  border-color: #e10;
}

.space {
  margin: 2.5rem 0;
}

.number {
  display: inline-block;
  vertical-align: sub;
}

.pair {
  margin: 0.2rem 0;
}

.background {
  background-image: url(../../public/background.png);
}

.info {
  padding: 0.5rem 0;
  border: 1px dotted #c9c9c9;
  border-width: 1px 0;
}

.info > * {
  border-left: 1px dotted #c9c9c9;
}

.info > *:first-child {
  border-left: 0;
}

.hot-small {
  color: #e10;
  font-size: 110%;
  padding-left: 0.3rem;
}

.detail {
  margin: 3rem 0;
}

.detail img {
  margin: 0.5rem 0;
}

.card {
  box-shadow: none;
}

.product-info {
  font-size: 75%;
  margin: 1rem;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.5);
  border: 1px;
}
</style>


