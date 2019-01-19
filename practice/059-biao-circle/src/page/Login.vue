<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="header">登陆</div>
        <div id="log-in">
          <form @submit.prevent="login">
            <div class="input-control">
              <label>
                <span>用户名</span>
                <input type="text" v-model="current.username">
              </label>
            </div>
            <div class="input-control">
              <label>
                <span>密码</span>
                <input type="password" v-model="current.password">
              </label>
            </div>
            <div class="error" v-if="inValidMatch">用户名或密码错误</div>
            <button type="submit">登陆</button>
          </form>
        </div>
      </div>
      <div class="side">
        <div class="border">
          <div class="header">表圈子</div>
          <div class="intro">十八相送一水黑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";

export default {
  data() {
    return {
      current: {},
      inValidMatch: false
    };
  },

  methods: {
    login() {
      let username = this.current.username;
      let password = this.current.password;

      if (!username || !password) {
        return;
      }

      let param = {
        where: {
          and: { username, password }
        },
        only: ["id", "username"]
      };

      api("user/first", param).then(r => {
        let user = r.data;

        if (!user) {
          this.inValidMatch = true;
          return;
        }

        session.login(user.id, user, "/");
      });
    }
  }
};
</script>

<style>
</style>

