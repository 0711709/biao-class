<template>
  <div id="admin">
    <div class="header">
      <div class="title">评论管理</div>
    </div>
    <div class="list">
      <table>
        <thead>
          <th>ID</th>
          <th>作者</th>
          <th>日期</th>
          <th>帖子</th>
          <th>评论</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(it, index) in list" :key="index">
            <td>{{it.id}}</td>
            <td>{{it.$user && it.$user.username || "-"}}</td>
            <td>{{it.create_at}}</td>
            <td>{{it.$post && it.$post.title || "-"}}</td>
            <td>{{it.content}}</td>
            <td>
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
      list: {}
    };
  },

  mounted() {
    this.read();
  },

  methods: {
    read() {
      //, { except: ["password"] }
      api("comment/read", {
        with: [
          { model: "user", relation: "belongs_to" },
          { model: "post", relation: "belongs_to" }
        ]
      }).then(r => {
        this.list = r.data;
      });
    },

    deleteUser(id) {
      if(!confirm("确定")){
        return;
      }
      api("comment/delete", { id }).then(r => {
        this.read();
      });
    }
  }
};
</script>

<style>
</style>


