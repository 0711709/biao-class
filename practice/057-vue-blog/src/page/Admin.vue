<template>
  <div class="container">
    <div id="inputForm">
      <form @submit.prevent="onSubmit">
        <h2>添加/更新文章</h2>
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
    </div>
  </div>
</template>

<script>

import api from '../lib/api';

export default {
  data() {
    return {
      current: {}
    }
  },
  methods: {
    onSubmit() {
      api("post/create", this.current)
        // .then(r => {
          // console.log(r)
        // })
    },

    create() {
      api('')
    }
  }
};
</script>

<style>
#inputForm {
  width: 70%;
  margin-left: auto;
}

.input-control > * {
  display: inline-block;
  margin-bottom: .5rem;
}

#inputForm input,
#inputForm textarea,
#inputForm button {
  width: 100%;
  margin-bottom: 1rem;
  padding: .5rem;
}

#inputForm button {
  background: #fff;
  border: 1px solid #666;
}

</style>



