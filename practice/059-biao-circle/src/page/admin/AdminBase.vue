<template>
  <div id="main">
    <div class="container">
      <div class="side-left">
        <div class="box-left">
          <div class="header">
            <router-link to="/admin">管理</router-link>
          </div>
          <router-link class="item" active-class="current" to="/admin/user">管理用户</router-link>
          <router-link class="item" active-class="current" to="/admin/post">管理帖子</router-link>
          <router-link class="item" active-class="current" to="/admin/cat">管理分类</router-link>
          <router-link class="item" active-class="current" to="/admin/comment">管理评论</router-link>
        </div>
      </div>
      <div class="section-right">
        <div v-if="$route.path == '/admin'">
          <div id="admin">
            <div class="header">
              <div class="title">管理</div>
            </div>
            <div class="admin-search">
              <h3>搜索页面</h3>
              <Dropdown
                :searchModel="searchModel"
                :onSelected="onSelected"
              />
            </div>
          </div>
        </div>
        <router-view v-else></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "../../components/Dropdown.vue";

export default {
  components: { Dropdown },
  data() {
    return {
      searchModel: {
        cat: {
          key: "分类",
          searchBy: "name",
          displayBy: "name"
        },
        post: {
          key: "帖子",
          searchBy: "title",
          displayBy: "title"
        },
        user: {
          key: "用户",
          searchBy: "username",
          displayBy: "username"
        },
      },
      /* userlist: [
        {
          id: 1,
          username: "whh",
          name: "王花花"
        },
        {
          id: 2,
          username: "lsd",
          name: "李拴蛋"
        },
        {
          id: 3,
          username: "zks",
          name: "赵柯爽"
        },
        {
          id: 4,
          username: "wmm",
          name: "王萌萌"
        }
      ],*/ 
      // searchBy: ["username","name"]
    };
  },

  methods: {
    onSelected(it) {
      console.log(it)
    }
  }
};
</script>

<style scoped>
.admin-search {
  width: 60%;
  margin: 2rem auto 4rem;
}

.admin-search h3 {
  font-weight: 500;
  text-align: center;
}

.admin-search .search-group {
  position: relative;
  margin: 1.5rem 0;
}

.admin-search input {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem 4rem;
}

.admin-search select {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.1rem;
  width: 3.5rem;
  padding: 0.5rem;
  border: -1px;
  outline: 0;
  appearance: none;
  background: #e2e2e2;
  height: 100%;
}
</style>


