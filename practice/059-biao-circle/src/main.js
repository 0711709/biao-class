import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import Home from "./page/Home.vue"
import SignUp from "./page/SignUp.vue"
import LogIn from "./page/LogIn.vue"

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: "/", component: Home },
  { path: "/signUp", component: SignUp },
  { path: "/logIn", component: LogIn }
]

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes
  })
}).$mount('#app')
