<template>
  <div>
    <div class="head">
      <h2>用户管理</h2>
    </div>
    <div class="content">
      <div class="button">
        <el-button @click="show=true; errors={}" round size="small" type="success">
          <span>创建用户</span>
        </el-button>
      </div>
      <div v-if="show" class="form">
        <el-form size="small" label-width="3rem">
          <el-form-item label="昵称">
            <el-input v-model="form.username" placeholder="必填项" @keyup.native="debounceValidate('username')"></el-input>
            <div class="error" v-for="(value, e) in errors.username" :key="e">
              <div v-if="value">{{rules.username[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="手机" @keyup.native="debounceValidate('phone')">
            <el-input v-model="form.phone"  placeholder="选填项"></el-input>
            <div class="error" v-for="(value, e) in errors.phone" :key="e">
              <div v-if="value">{{rules.phone[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="邮箱" @keyup.native="debounceValidate('mail')">
            <el-input v-model="form.mail"  placeholder="选填项"></el-input>
            <div class="error" v-for="(value, e) in errors.mail" :key="e">
              <div v-if="value">{{rules.mail[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="密码" @keyup.native="debounceValidate('password')">
            <el-input v-model="form.password"  placeholder="必填项" show-password></el-input>
            <div class="error" v-for="(value, e) in errors.password" :key="e">
              <div v-if="value">{{rules.password[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createOrUpdate" :disabled="pending">提交</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-list">
        <el-table :data="list" size="small" :row-class-name="tableRowClassName" style="width: 100%">
          <el-table-column width="50" prop="id" label="ID"></el-table-column>
          <el-table-column width="120" prop="username" label="用户名"></el-table-column>
          <el-table-column width="160" prop="phone" label="手机号"></el-table-column>
          <el-table-column width="160" prop="mail" label="邮箱"></el-table-column>
          <el-table-column width="150" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../lib/api";
import { call as valee } from "../../lib/valee";

export default {
  data() {
    return {
      list: [],
      show: false,
      form: {},
      rules: {
        username: {
          unique: {
            params: ["user", "exists", "username"],
            msg: "昵称已存在"
          },
          lengthBetween: {
            params: [4, 12],
            msg: "昵称长度应在4至12位之间"
          }
        },
        phone: {
          unique: {
            params: ["user", "exists", "phone"],
            msg: "手机号已注册"
          },
          phone: {
            msg: "手机格式不正确"
          }
        },
        mail: {
          unique: {
            params: ["user", "exists", "mail"],
            msg: "邮箱已注册"
          },
          mail: {
            msg: "邮箱格式不正确"
          }
        },
        password: {
          required: {
            msg: "此项为必填项"
          },
          lengthBetween: {
            params: [6, 32],
            msg: "密码长度在6到32位之间"
          }
        }
      },
      errors: {},
      tiemr: null,
      asynValid: false,
      pending: true,
      formCopy: {}
    };
  },

  mounted() {
    this.read();
  },

  methods: {
    read() {
      api("user/read").then(r => {
        if (r.success) {
          this.list = r.data;
        }
      });
    },

    debounceValidate(field) {
      //如果某个字段和原值一样就不验证
      if (this.form[field] == this.formCopy[field]) {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.validate(field);
      }, 500);
    },

    //验证某一个字段的规则
    validate(field) {
      //拿到这个字段的所有规则
      let ruleObj = this.rules[field];
      let fieldValue = true;
      this.pending = true;
      //循环验证每一个规则
      for (let key in ruleObj) {
        let rule = ruleObj[key];
        let params = rule.params || [];
        let valid = valee(key, this.form[field], ...params);
        //同步规则返回布尔值, 异步规则返回一个 promise
        if (typeof valid === "boolean") {
          if (!valid) {
            fieldValue = false;
          }
          this.afterValidate(field, key, valid);
        } else {
          valid.then(r => {
            this.afterValidate(field, key, r);
            this.pending = false;
            this.asynValid = r;
          });
        }
      }
      return fieldValue;
    },

    //验证规则之后
    afterValidate(field, key, valid) {
      //初始化空的 errors 对象
      if (!this.errors[field]) {
        this.$set(this.errors, field, {});
      }
      this.$set(this.errors[field], key, !valid);
    },

    //验证整个表单
    validateForm() {
      let valid = true;
      for (let field in this.rules) {
        //如果某个字段和原值一样就不验证
        if (this.form[field]  && (this.form[field] === this.formCopy[field])) {
          continue;
        }
        if (!this.validate(field)) {
          valid = false;
        }
      }
      return valid;
    },

    //设置各行颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },

    handleDelete(i, r) {
      if (!confirm("确定删除")) {
        return;
      }
      let id = r.id;
      api(`user/delete`, { id }).then(r => {
        this.read();
      });
    },

    handleEdit(i, r) {
      this.show = true;
      this.formCopy = { ...r };
      this.form = r;
    },

    cancelEdit() {
      this.form = {};
      this.show = false;
      this.errors = {};
    },

    createOrUpdate() {
      if (!this.validateForm()) {
        return;
      }
      //异步验证结果
      if (!this.asynValid) {
        return;
      }

      let action = this.form.id ? "update" : "create";
      api(`user/${action}`, this.form).then(r => {
        if (r.success) {
          this.read();
          this.form = {};
          this.formCopy = {};
          this.show = false;
          this.errors = {};
        }
      });
    }
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

