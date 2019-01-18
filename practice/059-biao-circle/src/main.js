import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import Home from "./page/Home.vue"
import Signup from "./page/Signup.vue"
import Login from "./page/Login.vue"

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login }
]

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes
  })
}).$mount('#app')
