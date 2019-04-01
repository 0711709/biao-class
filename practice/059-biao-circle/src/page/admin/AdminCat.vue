<template>
  <div id="admin">
    <div class="header">
      <div class="title">分类管理</div>
    </div>
    <div class="create-post">
      <button @click="createOrCancel=!createOrCancel; current={}; errors={}">
        <span v-if="createOrCancel == false">创建分类</span>
        <span v-else>取消创建</span>
      </button>
      <div v-if="createOrCancel">
        <form @submit.prevent="createOrUpdate">
          <label @keyup="debounceValidate('name')">
            <div>名称</div>
            <input type="text" v-model="current.name">
            <div class="error" v-for="(value, e) in errors.cat" :key="e">
              <div v-if="value">{{rules.name[e].msg}}</div>
            </div>
          </label>
          <button type="submit">提交</button>
        </form>
      </div>
    </div>
    <div class="list">
      <table>
        <thead>
          <th>ID</th>
          <th>分类</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(it, index) in list" :key="index">
            <td>{{it.id}}</td>
            <td>{{it.name}}</td>
            <td>
              <button @click="createOrCancel=true; current=it">更新</button>
              <button @click="deleteUser(it.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :total="total" :limit="readParams.limit" :onChange="filp" :radius="3"/>
    </div>
  </div>
</template>

<script>
import admin from "../../mixin/admin";
import api from "../../lib/api";

export default {
  mixins: [admin],
  data() {
    return {
      model: "cat",
      readParams: {
        limit: 4,
        page: 1,
      },
      rules: {
        name: {
          required: {
            msg: "此项为必填项"
          }
        }
      }
    };
  },

  methods: {
    createOrUpdate() {
      //先验证
      if (!this.validateForm()) {
        return;
      }

      let action;
      if (this.current.id) {
        action = "update";
      } else {
        action = "create";
      }
      api(`${this.model}/${action}`, this.current).then(r => {
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

