<template>
  <div>
    <div class="head">
      <h2>购物车</h2>
    </div>
    <div class="cart">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品展示" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.product_snapshot.main_img[0].url" class="image">
          </template>
        </el-table-column>
        <el-table-column prop="product_snapshot.title" label="商品名称" width="250"></el-table-column>
        <el-table-column label="数量" width="150">
          <template slot-scope="scope">
            <el-input-number size="mini" :min="0" v-model="scope.row.count" @change="numChange"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.product_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cart-info" v-if="tableData.length">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button type="text" @click="cart.clear()">清空购物车</el-button>
        </el-col>
        <el-col :span="12">
          <div class="text-right tip">已选商品 {{productNum}} 件</div>
          <div class="text-right tip">
            总价
            <span class="rmb hot">{{count}}</span>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" :disabled="goBuy" @click="createOrder">去结算</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="cart-info text-center" v-else>这里空空如也, 赶快去购物吧</div>
  </div>
</template>

<script>
import store from "../../lib/store";
import api from "../../lib/api";
import session from "../../lib/session";
import cart from "../../lib/cart";
import { orderSum } from "../../lib/help";

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      productNum: 0,
      count: 0,
      cart,
      goBuy: true
    };
  },

  mounted() {
    this.tableData = Object.values(store.get("cart"));
    cart.onChange(() => (this.tableData = Object.values(store.get("cart"))));
  },

  methods: {
    handleSelectionChange(r) {
      this.multipleSelection = r;
      this.productNum = r.length;
      if (r.length > 0) {
        this.goBuy = false;
      }
      this.count = orderSum(r);
    },

    numChange() {
      this.tableData.forEach(it => {
        if (it.count == 0) {
          cart.remove(it.product_id);
        }
      });
      this.handleSelectionChange(this.multipleSelection);
    },

    handleDelete(id) {
      cart.remove(id);
    },

    createOrder() {
      let order = {
        detail: this.multipleSelection
      };
      order.user_id = session.user().id;
      order.sum = orderSum(order.detail);

      //提交订单并跳转至个人订单页面
      api("order/create", order).then(r => {
        if (r.success) {
          cart.clear();
          this.$router.push(`/my/order/${r.data.id}`);
        }
      });
    }
  }
};
</script>

<style>
.cart {
  margin: 1.5rem 0;
}

.cart .image {
  width: 50px;
}

.cart-info {
  background: rgb(247, 247, 247);
  padding: 1rem;
  font-size: 90%;
}

.cart-info .tip {
  margin-bottom: 0.5rem;
  margin-right: 1rem;
}
</style>

