<template>
  <div class="signup">
    <div class="container">
      <el-form class="form-container" label-position="top">
        <h1 class="text-center">注册</h1>
        <el-tabs v-model="activeName">
          <el-tab-pane label="手机注册" name="phone">
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
              <span v-if="errors.phone">{{errors.phone}}</span>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="mail">
            <el-form-item label="邮箱">
              <el-input v-model="form.mail"></el-input>
              <span v-if="errors.mail">{{errors.mail}}</span>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item label="验证码">
          <el-input v-model="formCode">
            <el-button slot="append" class="button" @click="sendCode" :disabled="!!countDown">
              <span v-if="countDown">{{countDown}}s后获取</span>
              <span v-else>发送验证码</span>
            </el-button>
          </el-input>
          <span v-if="errors.code">{{errors.code}}</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="密码长度不小于6位"></el-input>
          <span v-if="errors.password">{{errors.password}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!valid" @click="signup">注册</el-button>
          <el-button type="text">
            <router-link to="/">已有帐号, 直接登录</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import is from "../lib/valee";

export default {
  data() {
    return {
      activeName: "phone",
      byObj: {
        phone: "手机",
        mail: "邮箱"
      },
      form: {},
      formCode: null,
      countDown: 0,
      errors: {
        phone: "",
        mail: "",
        password: "",
        code: ""
      },
      code: null,
      valid: false
    };
  },

  mounted() {
    // console.log(this.$router);
  },

  methods: {
    //验证手机或邮箱
    validateSignBy() {
      let f = this.form;
      let signupBy = this.activeName;
      if (!f[signupBy]) {
        this.errors[signupBy] = `${this.byObj[signupBy]}为必填项`;
        return false;
      }

      if (!is[signupBy](f[signupBy])) {
        this.errors[signupBy] = `${this.byObj[signupBy]}格式不合法`;
        return false;
      }

      this.errors[signupBy] = "";
      return true;
    },

    //验证密码和验证码
    validatePasswordAndCode() {
      this.errors.code = this.errors.password = "";

      if (!this.form.password) {
        this.errors.password = "密码不能为空";
      } else {
        if (this.form.password.length < 6) {
          this.errors.password = "密码长度不能小于六位";
        }
      }

      if (this.formCode !== this.code) {
        this.errors.code = "验证码有误";
      }

      if (this.errors.code || this.errors.password) {
        return false;
      }

      this.errors.code = this.errors.password = "";
      return true;
    },

    //验证码发送计时器
    count() {
      this.countDown = 60;
      let timer = setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },

    //发送验证码
    sendCode() {
      let action;
      let signupBy = this.activeName;
      let param = {};

      if (!this.validateSignBy()) {
        return;
      }

      this.valid = true;

      this.count();

      if (signupBy === "phone") {
        action = "sms";
      } else {
        action = "mail";
      }

      param[signupBy] = this.form[signupBy];

      api(`captcha/${action}`, param).then(r => {
        if (r.success) {
          this.code = atob(r.data.result);
          console.log(this.code);
        }
      });
    },

    signup() {
      if (!this.validatePasswordAndCode()) {
        return;
      }

      api("user/create", this.form).then(r => {
        if (r.success) {
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style>
.signup .form-container {
  max-width: 400px;
  margin: 4rem auto 10rem;
}

.signup .form-container h1 {
  margin-bottom: 3rem;
}
</style>


