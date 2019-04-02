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
            <div class="card">
                <h3>测试账号</h3>
                <div>
                  <div>
                    <span>管理员:</span>
                    <span>test</span>
                  </div>
                  <div>
                    <span>密码:</span>
                    <span>111111</span>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>
      <div class="side">
        <div class="box">
          <div class="header">表圈子</div>
          <div class="intro">十八相送一水黑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../lib/api.js";
import session from "../../lib/session.js";

export default {
  data() {
    return {
      current: {},
      inValidMatch: false
    };
  },

  methods: {
    login() {
      // api("user/read").then(r => {
      //   console.log(r.data)
      // })

      let username = this.current.username;
      let password = this.current.password;

      if (!username || !password) {
        return;
      }

      let param = {
        where: {
          and: { username, password }
        },
        except: ["password"]
      };

      api("user/first", param).then(r => {
        let user = r.data;
        if (!user) {
          this.inValidMatch = true;
          return;
        }
        if (user.username === "test") {
          user.IS_ADMIN = true;
          session.login(user.id, user, "/#/admin");
          return;
        }
        session.login(user.id, user, "/");
      });
    }
  }
};
</script>

<style scoped>
#main .card {
  background: #e2e2e2;
  border-radius: 5px;
}

#main .card h3 {
  text-align: center;
  padding-top: 1rem;
}

#main .card div{
  padding: .5rem 2rem;
}

#main .card div span {
  padding: .5rem;
}
</style>


