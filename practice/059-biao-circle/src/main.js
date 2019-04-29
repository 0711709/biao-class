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
import AdminCat from "./page/admin/AdminCat.vue"
import AdminComment from "./page/admin/AdminComment.vue"

import NotFind from "./page/NotFind.vue"

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
        { path: "cat", component: AdminCat },
        { path: "comment", component: AdminComment },
      ]
    },
    {
      path: "*",
      component: NotFind,
    }
  ]
})

//路由守卫
router.beforeEach((to, form, next) => {
  console.log(to)
  if (/admin/.test(to.matched[0].path)) {
    if (session.user() && session.user().IS_ADMIN) {
      next();
    } else {
      next(false);
    }
  } else if (/member/.test(to.path) || /setting/.test(to.path)) {
    if (session.user()) {
      next()
    } else {
      next(false)
    }
  } else if (/login/.test(to.path) || /signup/.test(to.path)) {
    if (session.user()) {
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
