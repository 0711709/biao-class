<template>
  <div id="dropdown">
    <div class="filter">
      <input class="selected-cat" @keyup="filter" v-model="keyword">
      <div class="select" @click="select(it)" v-for="(it, index) in result" :key="index">{{it[displayBy]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list", "displayBy", "searchBy", "onSelected", "current"],
  data() {
    return {
      result: [],
      keyword: "",
    };
  },

  mounted() {
    if(this.current){
      this.keyword =this.current;
    }
  },

  methods: {
    filter() {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(this.keyword);
      });
    },

    select(it) {
      if (this.onSelected) {
        this.onSelected(it);
        this.keyword = it.name;
        this.result = [];
      }
    }
  }
};
</script>

<style scoped>
#dropdown .filter> *{
  padding: .3rem .2rem;
  width: 40%;
}

#dropdown .select {
  background: #e2e2e2;
}

#dropdown .select:hover{
  background: #e88
}

</style>

