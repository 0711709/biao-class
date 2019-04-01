<template>
  <div id="dropdown">
    <div class="filter">
      <input @focus="show=true" @blur="hide" class="selected-cat" @keyup="filter" v-model="keyword">
      <span v-if="show">
        <div
          class="select"
          @mousedown="select(it)"
          v-for="(it, index) in result"
          :key="index"
        >{{it[displayBy]}}</div>
      </span>
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
      show: false,
    };
  },

  mounted() {
    this.result = this.list;
    if (this.current) {
      this.keyword = this.current;
    }
  },

  methods: {
    filter() {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(this.keyword);
      });
    },
    
    hide(){
      setTimeout(() => {
        this.show = false;
      }, 10);
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
#dropdown .filter input,
#dropdown .filter span > * {
  padding: 0.3rem 0.2rem;
  width: 40%;
}

#dropdown .select {
  background: #e2e2e2;
}

#dropdown .select:hover {
  background: #e88;
}
</style>

