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
      <Pagination :total="total" :limit="readParams.limit" :onChange="filp" :radius="3"/>
    </div>
  </div>
</template>

<script>
import admin from "../../mixin/admin";

export default {
  mixins: [admin],
  data() {
    return {
      model: "comment",
      readParams: {
        limit: 10,
        page: 1,
        with: [
          { model: "user", relation: "belongs_to" },
          { model: "post", relation: "belongs_to" }
        ]
      }
    };
  },
};
</script>

<style>
</style>


