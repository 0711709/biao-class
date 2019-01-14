<template>
  <div id="cat">
    <form @submit.prevent="onSubmit">
      <h2 class="text-center">添加/更新分类</h2>
      <div class="input-control">
        <label for>名称</label>
        <input type="text" v-model="current.name">
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(it,index) in list" :key="index">
          <td>{{it.id}}</td>
          <td>{{it.name}}</td>
          <td>
            <button @click="current = it">更新</button>
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
      current: {},
      list: []
    };
  },

  mounted() {
    this.read();
  },
  methods: {
    onSubmit() {
      this.createOrUpdate();
    },

    createOrUpdate() {
      let action = this.current.id ? "update" : "create";

      api(`cat/${action}`, this.current).then(r => {
        this.read();
        this.current = {};
      });
    },

    remove(id) {
      if (!confirm("Sure?")) return;

      api("cat/delete", { id }).then(r => this.read());
    },

    read() {
      api("cat/read").then(r => {
        this.list = r.data;
      });
    }
  }
};
</script>

<style>
#cat {
  width: 80%;
  display: inline-block;
  padding-left: 5%;
  border-left: 1px solid #ddd;
}

.input-control > * {
  display: inline-block;
  margin-bottom: 0.5rem;
}

#cat input,
#cat textarea,
#cat button[type="submit"] {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-family: sans-serif;
}

#cat button[type="submit"] {
  border: 1px solid #666;
}

#cat table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
}
#cat table thead tr > *,
#cat table tbody tr > * {
  /* display: inline-block; */
  text-align: center;
  padding: 0.4rem;
}

#cat table thead tr th:last-of-type,
#cat table tbody tr td:last-of-type {
  text-align: right;
}

#cat table thead tr th {
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #444;
}
</style>

