<template>
  <div id="dropdown">
    <div class="filter">
      <select class="search-type" v-model="selectedModel">
        <option v-for="(value, model) in searchModel" :key="model">{{value}}</option>
      </select>
      <input @focus="show=true" @blur="hide" type="search" v-model="keyword">
    </div>
    <div class="search-list">
      <span v-if="show">
        <div v-for="(it, index) in result" :key="index" @mousedown="select(it)">{{it[displayBy]}}</div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchModel", "list", "displayBy", "searchBy", "onSelected"],
  data() {
    return {
      selectedModel: "用户",
      keyword: "",
      allResult: {},
      result: [],
      show: false
    };
  },

  watch: {
    keyword(newKeyword) {
      this.filter(newKeyword);
    }
  },

  mounted() {
    this.result= this.list
  },

  methods: {
    filter(newKeyword) {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(newKeyword);
      });
    },

    // //过滤数据
    // filter(newKeyword) {
    //   this.searchBy.forEach(element => {
    //     this.allResult[element] = this.list.filter(it => {
    //       return it[element].includes(newKeyword);
    //     });
    //   });
    //   this.validData();
    // },

    // //提取有效数据
    // validData() {
    //   for (let key in this.allResult) {
    //     if(this.allResult[key].length){
    //       this.result = this.allResult[key];
    //     }
    //   }
    // },

    select(it) {
      this.keyword = it[this.displayBy];
      if (this.onSelected) {
        this.onSelected(it);
      }
    },

    hide() {
      setTimeout(() => {
        this.show = false;
      }, 10);
    }
  }
};
</script>

<style scoped>
#dropdown .filter {
  position: relative;
}

#dropdown .search-list {
  margin-left: 3.5rem;
  background: #eee;
}

#dropdown .search-list span > * {
  padding: 0.3rem 0.5rem;
}

#dropdown .search-list span > *:hover {
  background: #e2e;
  cursor: pointer;
}

#dropdown .filter input {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem 0.5rem 0.5rem 4rem;
  display: block;
}

#dropdown .filter .search-type {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  font-size: 1.1rem;
  background: #e2e2e2;
  outline: 0;
  appearance: none;
  border: -1px;
  height: 100%;
  width: 3.5rem;
}
</style>

