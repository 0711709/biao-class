<template>
  <div class="login">
    <div class="container">
      <el-form class="form-container" label-position="top">
        <h1 class="text-center">登录</h1>
        <el-form-item label="手机号/邮箱">
          <el-input v-model="unique" placeholder="请输入手机或密码"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" show-password></el-input>
          <span class="error" v-if="errors">{{errors}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="text">
            <router-link to="/recover">忘记密码?</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import session from "../lib/session";
import store from "../lib/store";

export default {
  data() {
    return {
      errors: "",
      unique: "",
      password: "",
      loginBy: "phone"
    };
  },

  methods: {
    validate() {
      this.errors = "";
      if (!this.unique || !this.password) {
        this.errors = "请输入手机或邮箱和密码";
        return;
      }
    },

    login() {
      this.validate();
      //判断输入为邮箱还是手机
      if (this.unique.includes("@")) {
        this.loginBy = "mail";
      } else {
        this.loginBy = "phone";
      }
      //判断账号是否正确
      api("user/first", {
        where: {
          and: { [this.loginBy]: this.unique, password: this.password }
        },
        except: ["password"]
      }).then(r => {
        if (r.success) {
          if (r.data) {
            this.mergeCart(r.data.cart);
            if (r.data.username === "admin") {
              r.data.IS_ADMIN = true;
              session.login(r.data.id, r.data, "/#/admin/user");
              return;
            }
            session.login(r.data.id, r.data, "/");
          } else {
            this.errors = "手机或邮箱或密码错误";
          }
        }
      });
    },

    //合并购物车数据
    mergeCart(cart) {
      let localCart = store.get("cart") || {};
      let localCartArry = Object.keys(localCart);

      localCartArry.forEach(it => {
        if (cart[it]) {
          cart[it].count += localCart[it].count;
        } else {
          cart[it] = localCart[it];
        }
      });

      store.set("cart", cart);
    }
  }
};
</script>

<style>
.login .form-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 1.5rem;
  background: #eee;
}

.login .form-container h1 {
  margin-bottom: 2rem;
}
</style>
