<template>
  <div id="comment">
    <h2 class="text-center">管理评论</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>邮箱</th>
          <th>内容</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(it, index) in list" :key="index">
          <td>{{it.id}}</td>
          <td>{{it.email}}</td>
          <td :title="it.content">{{it.content | cut}}</td>
          <td>
            <button @click="remove(it.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../lib/api";

export default {
  data() {
    return {
      list: []
    };
  },

  mounted() {
    this.read();
  },
  filters: {
    cut(value) {
      return value.length < 8 ? value : value.substring(0, 7) + "...";
    }
  },
  methods: {
    read() {
      api("comment/read").then(r => {
        if (r.success) {
          this.list = r.data;
        }
      });
    },

    remove(id) {
      api("comment/delete", { id }).then(r => this.read());
    }
  }
};
</script>

<style>
#comment {
  width: 80%;
  display: inline-block;
  padding-left: 5%;
  border-left: 1px solid #ddd;
}

#comment table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
}
#comment table thead tr > *,
#comment table tbody tr > * {
  /* display: inline-block; */
  text-align: center;
  padding: 0.4rem;
}

#comment table thead tr th:last-of-type,
#comment table tbody tr td:last-of-type {
  text-align: right;
}

#comment table thead tr th {
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #444;
}
</style>


