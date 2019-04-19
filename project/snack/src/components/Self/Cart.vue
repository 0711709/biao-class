<template>
  <div class="buy-cart">
    <el-badge :value="num">
      <el-button size="small">购物车</el-button>
    </el-badge>
    <div class="cart-all">
      <el-row class="text-left head">加入的商品</el-row>
      <el-row class="cart-content">
        <div v-for="(v, k) in listCart" :key="k" class="item">
          <!-- <span>{{k}} count:{{v.count}}</span>
          <button @click="cart.change(k, 1)">+</button>-->
          <el-row :gutter="10">
            <el-col :span="4" class="image">
              <img :src="v.product_snapshot.main_img[0].url">
            </el-col>
            <el-col :span="12" class="title text-left">
              <div>{{v.product_snapshot.title}}</div>
              <div class="count">x{{v.count}}</div>
            </el-col>
            <el-col :span="4">
              <span class="rmb price">{{v.product_snapshot.price}}</span>
            </el-col>
            <el-col :span="4" class="text-right">
              <button class="remove" @click="cart.remove(v.product_id)">x</button>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <div v-if="num" class="text-right btn-group">
        <el-button type="text" size="mini" @click="cart.clear()">清空购物车</el-button>
        <router-link to="/my/cart">
          <el-button type="primary" size="mini">查看购物车</el-button>
        </router-link>
      </div>
      <div v-else class="tip">这里空空如也, 随便转转吧</div>
    </div>
  </div>
</template>

<script>
import cart from "../../lib/cart";
import store from "../../lib/store";

export default {
  data() {
    return {
      num: null,
      listCart: {},
      cart
    };
  },

  mounted() {
    //恢复数据
    this.listCart = store.get("cart") || {};
    this.num = Object.keys(this.listCart).length;
    //推入函数
    cart.onChange(() => (this.listCart = store.get("cart")));
    cart.onChange(() => (this.num = Object.keys(this.listCart).length));
  },

  methods: {}
};
</script>

<style scoped>
.buy-cart {
  position: relative;
}

.cart-all {
  position: absolute;
  display: none;
  z-index: 5;
  right: 3rem;
  top: 2.8rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  padding: 0.5rem 1rem;
  width: 300px;
}

.buy-cart:hover .cart-all {
  display: block;
}

.cart-all .cart-content {
  max-height: 180px;
  overflow: auto;
}

.cart-all .head {
  font-weight: 600;
  font-size: 90%;
  padding-bottom: .5rem;
}

.cart-all .tip {
  padding: 1.5rem;
  font-size: 90%;
  color: rgba(0, 0, 0, 0.6);
}

.cart-all .item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.4rem;
  margin-bottom: 0.1rem;
}

.cart-all .title {
  font-size: 80%;
}

.cart-all .count {
  color: rgba(0, 0, 0, 0.6);
}

.cart-all .price {
  color: #e10;
}

.cart-all .remove {
  outline: 0;
  border: 0;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  padding: 0.1rem 0.1rem 0.3rem 0.1rem;
  color: #fff;
  font-size: 80%;
}

.cart-all .remove:hover {
  background: #999;
  cursor: pointer;
}

.cart-all .btn-group {
  margin-top: 1rem;
}

.cart-all .btn-group > * {
  margin-left: 0.3rem;
}
</style>


