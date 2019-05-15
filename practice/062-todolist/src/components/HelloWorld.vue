<template>
  <div class="hello">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="value">
    </form>
    <div>待办事项</div>
    <div v-for="(item, index) in list" :key="index">
      <div style="margin: 10px">
        <input type="checkbox" @change="todo(index)">
        <span>{{item}}</span>
      </div>
    </div>
    <div>已完成</div>
    <div>
      <div v-for="item in list2" :key="item">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      list: [],
      list2: []
    };
  },

  methods: {
    handleSubmit() {
      this.list.push(this.value);
      this.value = "";
    },

    todo(index) {
      console.log(index)
      this.list2.push(this.list[index]);
      this.list.splice(index, 1);
    }
  }
};
</script>

