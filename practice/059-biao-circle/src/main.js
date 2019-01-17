import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import Home from "./components/Home.vue"
import SignUp from "./components/SignUp.vue"
import SignIn from "./components/SignIn.vue"

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: "/", component: Home },
  { path: "/signUp", component: SignUp },
  { path: "/signIn", component: SignIn }
]

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes
  })
}).$mount('#app')
