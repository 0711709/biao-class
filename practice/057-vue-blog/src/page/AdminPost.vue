<template>
  <div id="inputForm">
    <form @submit.prevent="onSubmit">
      <h2 class="text-center">添加/更新文章</h2>
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>分类</label>
        <select v-model="current.cat_id">
          <option v-for="(it, index) in catList" :key="index" :value="it.id">{{it.name}}</option>
        </select>
      </div>
      <div class="input-control">
        <label>内容</label>
        <textarea v-model="current.content"></textarea>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>标题</th>
          <th>分类</th>
          <th>内容</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(it,index) in list" :key="index">
          <td>{{it.id}}</td>
          <td>{{it.title}}</td>
          <td>{{it.$cat? it.$cat.name: "-"}}</td>
          <td :title="it.content">{{it.content | cut}}</td>
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
      list: [],
      catList: {}
    };
  },
  mounted() {
    this.read();
    this.readCat();
  },
  filters: {
    cut(value) {
      return value.length < 6 ? value : value.substring(0, 5) + "...";
    },
    show(value) {
      return value ? value : "-";
    }
  },
  methods: {
    onSubmit() {
      this.createOrUpdate();
    },

    createOrUpdate() {
      let action = this.current.id ? "update" : "create";

      api(`post/${action}`, this.current).then(r => {
        this.read();
        this.current = {};
      });
    },

    remove(id) {
      if (!confirm("Sure?")) return;

      api("post/delete", { id }).then(r => this.read());
    },

    read() {
      let param = {
        with: [
          {
            model: "cat",
            relation: "belongs_to"
          }
        ]
      };

      api("post/read", param).then(r => {
        this.list = r.data;
        console.log(r.data);
      });
    },

    readCat() {
      api("cat/read").then(r => (this.catList = r.data));
    }
  }
};
</script>

<style>
#inputForm {
  width: 80%;
  display: inline-block;
  padding-left: 5%;
  border-left: 1px solid #ddd;
}

.input-control > * {
  display: inline-block;
  margin-bottom: 0.5rem;
}

#inputForm input,
#inputForm textarea,
#inputForm select,
#inputForm button[type="submit"] {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-family: sans-serif;
}

#inputForm button[type="submit"] {
  border: 1px solid #666;
}

#inputForm table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
}
#inputForm table thead tr > *,
#inputForm table tbody tr > * {
  /* display: inline-block; */
  text-align: center;
  padding: 0.4rem;
}

#inputForm table thead tr th:last-of-type,
#inputForm table tbody tr td:last-of-type {
  text-align: right;
}

#inputForm table thead tr th {
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #444;
}
</style>



