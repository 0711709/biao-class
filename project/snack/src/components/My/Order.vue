<template>
  <div>
    <div class="head">
      <h2>订单</h2>
    </div>
    <div class="order">
      <div v-if="$route.params.id" class="order-detail">
        <el-card class="box-card">
          <div slot="header" class="clearfix detail-header">
            <span>订单详情</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="cancelDetail">关闭</el-button>
          </div>
          <el-row>
            <el-col :span="16">
              <div class="text-item">
                <el-row>
                  <el-col :span="4">订单编号:</el-col>
                  <el-col :span="20">{{orderDetail.id}}</el-col>
                </el-row>
              </div>
              <div class="text-item">
                <el-row>
                  <el-col :span="4">
                    <span>商品详情:</span>
                  </el-col>
                  <el-col :span="20">
                    <div
                      class="product-item"
                      v-for="(product, index) in orderDetail.detail"
                      :key="index"
                    >
                      <span>{{product.product_snapshot.title}}</span>
                      <span v-for="(value, key) in product.prop" :key="key">{{value}}</span>
                      <span>数量:{{product.count}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="text-item">
                <el-row>
                  <el-col :span="4">支付状态:</el-col>
                  <el-col :span="20">
                    <span v-if="orderDetail._paid">已支付</span>
                    <span v-else>未支付</span>
                  </el-col>
                </el-row>
              </div>
              <div class="text-item">
                <el-row>
                  <el-col :span="4">支付方式:</el-col>
                  <el-col :span="20">{{lang.payment[orderDetail.pay_by] || "-"}}</el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8" class="text-center button">
              <div class="order-sum">
                <span class="sum-text">总价</span>
                <span class="rmb sum-numb">{{orderDetail.sum}}</span>
              </div>
              <div class="order-paid" v-if="orderDetail._paid">支付成功</div>
              <div v-else>
                <div class="test-pay">测试支付为 0.01元</div>
                <div class="order-pay">
                  <el-button size="mini" type="primary" @click="generatePaymentUrl('alipay')">支付宝</el-button>
                  <!-- <el-button size="mini" type="success" @click="generatePaymentUrl('wechat')">微信支付</el-button> -->
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="table-list">
        <el-table :data="list" size="small" :row-class-name="tableRowClassName" style="width: 100%">
          <el-table-column width="100" prop="id" label="ID"></el-table-column>
          <el-table-column width="120" prop="sum" label="总价"></el-table-column>
          <el-table-column width="120" label="支付方式">
            <template slot-scope="scope">{{lang.payment[scope.row.pay_by]}}</template>
          </el-table-column>
          <el-table-column width="120" label="支付状态">
            <template slot-scope="scope">{{scope.row._paid ? "已支付": "未支付"}}</template>
          </el-table-column>
          <el-table-column width="160" prop="_paid_at" label="支付时间"></el-table-column>
          <el-table-column width="120" label="查看">
            <template slot-scope="scope">
              <router-link :to="`/my/order/${scope.row.id}`">
                <el-button size="mini" @click="handleDetail(scope.row)">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination text-center">
          <el-pagination
            layout="prev, pager, next, total"
            :page-size="params.limit"
            :total="total"
            :current-page="params.page"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import session from "../../lib/session";
import { url } from "../../lib/help";

export default {
  data() {
    return {
      list: [],
      id: null,
      params: {
        limit: 8,
        page: 1,
        where: { and: { user_id: null } }
      },
      total: 0,
      orderDetail: {},
      lang: {
        payment: {
          alipay: "支付宝",
          wechat: "微信支付"
        }
      }
    };
  },

  mounted() {
    this.id = session.user().id;
    this.params.where.and.user_id = this.id;
    this.read();
    let order_id = this.$route.params.id;
    if (order_id) {
      this.find(order_id);
    }
  },

  methods: {
    read() {
      api("order/read", this.params).then(r => {
        if (r.success) {
          this.list = r.data;
          this.total = r.total;
        }
      });
    },

    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },

    handleDetail(row) {
      this.orderDetail = row;
    },

    find(id) {
      api("order/find", { id }).then(r => {
        if (r.success) {
          this.orderDetail = r.data;
          console.log(this.orderDetail);
        }
      });
    },

    update(type, id) {
      api("order/update", { id, pay_by: type }).then(r => {
        this.orderDetail = r.data;
      });
    },

    generatePaymentUrl(type) {
      api("order/payment/url", {
        id: this.orderDetail.id,
        pay_by: type,
        fee: 0.01,
        return_url: url(`/#my/order/${this.orderDetail.id}`)
      }).then(r => {
        if (r.success) {
          this.orderDetail.$payment = r.data;

          if (type === "wechat") {
            this.$alert(
              "<img src=" + r.data.qrcode + "alt='支付二维码'>",
              "扫码支付",
              {
                dangerouslyUseHTMLString: true,
                callback: () => {
                  this.update(type, this.orderDetail.id);
                  this.read();
                }
              }
            );
          } else {
            window.open(r.data.url);
            this.$alert("支付完成后请点击确定", "支付宝支付", {
              confirmButtonText: "确定",
              callback: () => {
                this.update(type, this.orderDetail.id);
                this.read();
              }
            });
          }
        }
      });
    },

    cancelDetail() {
      this.$router.push("/my/order");
    },

    handleCurrentChange(page) {
      this.params.page = page;
      this.read();
    }
  }
};
</script>

<style>
.order {
  margin: 1.5rem 0;
}

.order-detail {
  max-width: 80%;
  margin: 0 auto 2rem auto;
}

.order .detail-header {
  font-size: 85%;
}

.order .text-item {
  margin-bottom: 1rem;
  font-size: 80%;
}

.order .order-sum {
  margin: 1rem 1rem;
}

.order .order-sum > * {
  padding: 0.2rem;
}

.order .order-pay {
  margin-bottom: 1rem;
}

.order .sum-text {
  font-weight: 600;
  font-size: 90%;
}

.order .sum-numb {
  font-size: 110%;
  color: #e10;
}

.order .product-item > * {
  padding-right: 0.2rem;
}

.order .test-pay {
  font-size: 50%;
  margin: 0.5rem 0;
}
</style>
