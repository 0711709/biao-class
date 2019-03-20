import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import session from "./lib/session"

import Home from "./page/Home.vue"
import Post from "./page/Post.vue"


import Signup from "./page/user/Signup.vue"
import Login from "./page/user/Login.vue"
import Member from "./page/user/Member.vue"
import Setting from "./page/user/Setting.vue"
import SettingMe from "./page/user/SettingMe.vue"
import SettingSecurity from "./page/user/SettingSecurity.vue"

import AdminBase from "./page/admin/AdminBase.vue"
import AdminUser from "./page/admin/AdminUser.vue"
import AdminPost from "./page/admin/AdminPost.vue"
import AdminComment from "./page/admin/AdminComment.vue"

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/member", component: Member },
    { path: "/signup", component: Signup },
    { path: "/login", component: Login },
    { path: "/post/:id", component: Post },
    {
      path: "/setting", component: Setting,
      children: [
        { path: "me", component: SettingMe },
        { path: "security", component: SettingSecurity },
      ]
    },
    {
      path: "/admin", component: AdminBase,
      children: [
        { path: "user", component: AdminUser },
        { path: "post", component: AdminPost },
        { path: "comment", component: AdminComment },
      ]
    }
  ]
})

router.beforeEach((to, form, next) => {
  if (/admin/.test(to.matched[0].path)) {
    if (session.user() && session.user().IS_ADMIN) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
