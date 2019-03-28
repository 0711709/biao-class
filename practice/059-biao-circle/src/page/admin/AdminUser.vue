<template>
  <div id="admin">
    <div class="header">
      <div class="title">用户管理</div>
    </div>
    <div class="create-user">
      <button @click="createOrCancel=!createOrCancel; current={}">
        <span v-if="createOrCancel == false">创建用户</span>
        <span v-else>取消创建</span>
      </button>
      <div v-if="createOrCancel">
        <form @submit.prevent="createOrUpdate">
          <label @keyup="validate(current.username, 'username')">
            <div>用户名</div>
            <input type="text" v-model="current.username">
            <div class="error" v-for="(value, e) in errors.username" :key="e">
              <div v-if="value">{{rules.username[e].msg}}</div>
            </div>
          </label>
          <label>
            <div>昵称</div>
            <input type="text" v-model="current.nickname">
          </label>
          <label>
            <div>密码</div>
            <input type="password" v-model="current.password">
          </label>
          <button type="submit">提交</button>
        </form>
      </div>
    </div>
    <div class="list">
      <table>
        <thead>
          <th>ID</th>
          <th>用户名</th>
          <th>昵称</th>
          <th>签名</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(it, index) in list" :key="index">
            <td>{{it.id}}</td>
            <td>{{it.username}}</td>
            <td>{{it.nickname || "-"}}</td>
            <td>{{it.info || "-"}}</td>
            <td>
              <button @click="createOrCancel=true; current=it">更新</button>
              <button @click="deleteUser(it.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import store from "../../lib/store";
import api from "../../lib/api";
import valee from "../../lib/valee";

export default {
  data() {
    return {
      createOrCancel: true,
      list: {},
      current: {},
      errors: {
        // username: { lengthBetween: true, regex: true }
      },
      rules: {
        username: {
          // unique: {
          //   params: ["user/exists"],
          //   msg: "用户名已存在"
          // },
          lengthBetween: {
            params: [4, 12],
            msg: "用户名长度应在4至12位之间"
          },
          regex: {
            params: [/(?=.*[0-9])(?=.*[a-zA-Z])/],
            msg: "用户名应由字母和数字组成"
          }
        },
        nickname: {
          required: {
            msg: "此项为必填项"
          },
          regex: {
            params: [/(?=.*[0-9])(?=.*[a-zA-Z])/],
            msg: "用户名应由字母和数字组成"
          }
        }
      },
      formStatus: {
        username: "pending"
      }
    };
  },

  mounted() {
    this.read();
  },

  methods: {
    read() {
      //, { except: ["password"] }
      api("user/read").then(r => {
        this.list = r.data;
      });
    },

    validate(value, field) {
      let ruleObj = this.rules[field];

      for (let key in ruleObj) {
        let rule = ruleObj[key];
        let valid = valee[key](this.current[field], ...rule.params);
        if (!this.errors[field]) {
          // this.errors[field] = {};
          this.$set(this.errors, field, {});
        }
        this.errors[field][key] = !valid;
      }
    },

    // setError(field, type) {
    //   let errorList = this.error[field];
    //   if (!errorList) {
    //     errorList = this.error[field] = [];
    //   }
    //   errorList.push(type);
    // },

    // removeError(field, type) {
    //   let errorList = this.error[field];
    //   if (!errorList) {
    //     return;
    //   }
    //   let index = errorList.findIndex(it => it === type);
    //   if (index === -1) {
    //     return;
    //   }
    //   errorList.splice(index, 1);
    // },

    deleteUser(id) {
      if (!confirm("确定删除")) {
        return;
      }
      api("user/delete", { id }).then(r => {
        this.read();
      });
    },

    createOrUpdate() {
      let action;
      if (this.current.id) {
        action = "update";
      } else {
        action = "create";
      }
      api(`user/${action}`, this.current).then(r => {
        this.read();
        this.current = {};
        this.createOrCancel = false;
      });
    }
  }
};
</script>

<style>
</style>
