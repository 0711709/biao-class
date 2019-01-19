import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import Home from "./page/user/Home.vue"
import Signup from "./page/user/Signup.vue"
import Login from "./page/user/Login.vue"
import Setting from "./page/user/Setting.vue"
import SettingMe from "./page/user/SettingMe.vue"
import SettingSecurity from "./page/user/SettingSecurity.vue"



Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  {
    path: "/setting", component: Setting,
    children: [
      { path: "me", component: SettingMe },
      { path: "security", component: SettingSecurity },
    ]
  },
]

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes
  })
}).$mount('#app')
