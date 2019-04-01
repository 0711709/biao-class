<template>
  <div id="admin">
    <div class="header">
      <div class="title">帖子管理</div>
    </div>
    <div class="create-post">
      <button @click="createOrCancel=!createOrCancel; current={}; errors={}">
        <span v-if="createOrCancel == false">创建帖子</span>
        <span v-else>取消创建</span>
      </button>
      <div v-if="createOrCancel">
        <form @submit.prevent="createOrUpdate">
          <label @keyup="debounceValidate('title')">
            <div>标题</div>
            <input type="text" v-model="current.title">
            <div class="error" v-for="(value, e) in errors.title" :key="e">
              <div v-if="value">{{rules.title[e].msg}}</div>
            </div>
          </label>
          <label @keyup="debounceValidate('cat')">
            <div>分类</div>
            <input type="text" v-model="current.cat_id">
            <div class="error" v-for="(value, e) in errors.cat" :key="e">
              <div v-if="value">{{rules.cat[e].msg}}</div>
            </div>
          </label>
          <label @keyup="debounceValidate('content')">
            <div>内容</div>
            <textarea type="text" v-model="current.content"></textarea>
            <div class="error" v-for="(value, e) in errors.content" :key="e">
              <div v-if="value">{{rules.content[e].msg}}</div>
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
          <th>标题</th>
          <th>分类</th>
          <th>日期</th>
          <th>作者</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(it, index) in list" :key="index">
            <td>{{it.id}}</td>
            <td>{{it.title}}</td>
            <td>{{it.$cat && it.$cat.name|| "-"}}</td>
            <td>{{it.create_at}}</td>
            <td>{{it.$user && it.$user.username || "-"}}</td>
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
import session from "../../lib/session.js";
import dateFormatter from "../../lib/dateFormatter.js";

export default {
  mixins: [admin],
  data() {
    return {
      model: "post",
      readParams: {
        limit: 4,
        page: 1,
        with: [
          { model: "user", relation: "belongs_to" },
          { model: "cat", relation: "belongs_to" }
        ]
      },
      rules: {
        title: {
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

      this.current.user_id = session.user().id;
      this.current.create_at = dateFormatter.format(new Date());

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

