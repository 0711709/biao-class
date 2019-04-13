import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'normalize.css/normalize.css';
import './css/main.css'

import Router from "vue-router";

import api from "./lib/api";
import session from "./lib/session"

import Home from "./components/Home.vue";
import Product from "./components/Product.vue";
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";
import Recover from "./components/Recover.vue";
import Search from "./components/Search.vue";
import Help from "./components/Help.vue";

import My from "./components/My/My.vue"
import Setting from "./components/My/Setting.vue"
import Cart from "./components/My/Cart.vue"
import Order from "./components/My/Order.vue"

import AdminBase from "./components/Admin/AdminBase.vue"
import AdminUser from "./components/Admin/AdminUser.vue"
import AdminBrand from "./components/Admin/AdminBrand.vue"
import AdminCat from "./components/Admin/AdminCat.vue"
import AdminProduct from "./components/Admin/AdminProduct.vue"

window.api = api;


Vue.use(ElementUI);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/product/:id",
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
      path: "/recover",
      component: Recover
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/help",
      component: Help
    },
    {
      path: "/my",
      component: My,
      children: [
        {
          path: "setting",
          component: Setting,
        },
        {
          path: "cart",
          component: Cart,
        },
        {
          path: "order",
          component: Order,
        },
      ]
    },
    {
      path: "/admin",
      component: AdminBase,
      children: [
        {
          path: "user",
          component: AdminUser,
        },
        {
          path: "brand",
          component: AdminBrand,
        },
        {
          path: "cat",
          component: AdminCat,
        },
        {
          path: "product",
          component: AdminProduct,
        },
      ]
    }
  ]
})

router.beforeEach((to, form, next) => {
  if(/admin/.test(to.matched[0].path)) {
    if(session.user() && session.user().IS_ADMIN){
      next();
    } else {
      next(false);
    }
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
