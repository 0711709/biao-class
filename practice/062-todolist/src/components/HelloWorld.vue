<template>
  <div class="hello">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="value">
    </form>
    <div>待办事项</div>
    <div v-for="(it, index) in list" :key="it.id">
      <label style="margin: 10px">
        <input type="checkbox" @change="todo(it,index)">
        <span>{{it.value}}</span>
      </label>
    </div>
    <div>已完成</div>
    <div v-for="it in list2" :key="it.id">
      <span>{{it.value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      list: [],
      list2: [],
      total: 0
    };
  },

  methods: {
    handleSubmit() {
      if (this.value == "") return;
      this.total++;
      this.list.push({ value: this.value, id: this.total });
      this.value = "";
    },

    todo(it, index) {
      this.list2.push(it);
      this.list.splice(index, 1);
    }
  }
};
</script>

