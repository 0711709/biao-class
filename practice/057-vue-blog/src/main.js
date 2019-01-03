import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './page/Home.vue'
import Admin from './page/Admin.vue'


Vue.config.productionTip = false

Vue.use(VueRouter);

const routeConfig = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/Admin',
    component: Admin,
  },
]

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: routeConfig,
    linkExactActiveClass: 'active',
  }),
}).$mount('#app')
