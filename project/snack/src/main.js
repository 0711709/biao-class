import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'normalize.css/normalize.css';
import './css/main.css'

import Router from "vue-router";

import Home from "./components/Home.vue";
import Product from "./components/Product.vue";
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";
import Search from "./components/Search.vue";





Vue.use(ElementUI);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/product",
      component: Product
    }, 
    {
      path: "/signup",
      component: Signup
    }, 
    {
      path: "/login",
      component: Login
    },
    {
      path: "/search",
      component: Search
    },
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
