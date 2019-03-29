<template>
  <div id="admin">
    <div class="header">
      <div class="title">帖子管理</div>
    </div>
    <div class="list">
      <table>
        <thead>
          <th>ID</th>
          <th>标题</th>
          <th>日期</th>
          <th>作者</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(it, index) in list" :key="index">
            <td>{{it.id}}</td>
            <td>{{it.title}}</td>
            <td>{{it.create_at}}</td>
            <td>{{it.$user && it.$user.username || "-"}}</td>
            <td>
              <button @click="deleteUser(it.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :total="100" :limit="10" :onChange="a" :radius="3"/>
    </div>
  </div>
</template>

<script>
import store from "../../lib/store";
import api from "../../lib/api";
import Pagination from "../../components/Pagination";

export default {
  components: { Pagination },
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
      api("post/read", {
        with: { model: "user", relation: "belongs_to" }
      }).then(r => {
        this.list = r.data;
      });
    },
    // 测试翻页插件
    a(page){
      console.log(page)
    },

    deleteUser(id) {
      if (!confirm("确定删除")) {
        return;
      }
      api("post/delete", { id }).then(r => {
        this.read();
      });
    }
  }
};
</script>

<style>
</style>

