<template>
  <div class="container">
    <div id="side">
      <!-- <div class="item">管理文章</div> -->
    </div>
    <div id="inputForm">
      <form @submit.prevent="onSubmit">
        <h2 class="text-center">添加/更新文章</h2>
        <div class="input-control">
          <label for>标题</label>
          <input type="text" v-model="current.title">
        </div>
        <div class="input-control">
          <label for>内容</label>
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
            <th>内容</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(it,index) in list" :key="index">
            <td>{{it.id}}</td>
            <td>{{it.title}}</td>
            <td>{{it.content}}</td>
            <td>
              <button>更新</button>
              <button>删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";

export default {
  data() {
    return {
      current: {},
      list: [],
    };
  },
  mounted () {
    this.read();
  },
  methods: {
    onSubmit() {
      api("post/create", this.current).then(r => {
        this.read();
        this.current = {};
      });
      api("post/read").then(r => {
        console.log(r);
      });
    },

    create() {
      api("post/create", this.current).then(r => {
        console.log(r);
      });
    },

    update() {},

    delete() {},

    read() {
      api("post/read").then(r => {
        this.list = r.data;
        console.log(this.list)
      });
    }
  }
};
</script>

<style>
#side {
  width: 20%;
  display: inline-block;
  margin-right: 10%;
}

#inputForm {
  width: 70%;
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
#inputForm button[type=submit] {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

#inputForm button[type=submit] {
  border: 1px solid #666;
}

#inputForm table {
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
}
#inputForm table thead tr > *,
#inputForm table tbody tr >*  {
  /* display: inline-block; */
  text-align: center;
  padding: .4rem;
}

#inputForm table thead tr th:last-of-type, 
#inputForm table tbody tr td:last-of-type {
  text-align: right;
}

#inputForm table thead tr th{
  padding-bottom: .6rem;
  border-bottom: 1px solid #444;
}

</style>



