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
          <label>
            <div>用户名</div>
            <input type="text" v-model="current.username">
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

export default {
  data() {
    return {
      createOrCancel: false,
      list: {},
      current: {}
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

    deleteUser(id) {
      if(!confirm("确定")){
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
      api(`user/${action}`, this.current).then(r=>{
          this.read();
          this.current = {};
          this.createOrCancel = false;
      })
    }
  }
};
</script>

<style>
</style>
