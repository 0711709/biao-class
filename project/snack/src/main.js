import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Router from "vue-router";

import Home from "./Home.vue"



Vue.use(ElementUI);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
    }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
