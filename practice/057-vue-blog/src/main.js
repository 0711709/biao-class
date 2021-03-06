import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './page/Home.vue'
import Post from './page/Post.vue'
import Admin from './page/Admin.vue'
import AdminPost from './page/AdminPost.vue'
import AdminComment from './page/AdminComment.vue'
import AdminCat from './page/AdminCat.vue'


Vue.config.productionTip = false

Vue.use(VueRouter);

const routeConfig = [
  {
    path: '/',
    component: Home,
  },
  {
    path: "/post/:id",
    component: Post,
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'post/',
        component: AdminPost
      },
      {
        path: 'comment/',
        component: AdminComment
      },
      {
        path: 'cat/',
        component: AdminCat
      }
    ]
  },
]

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: routeConfig,
    // linkExactActiveClass: 'active',
  }),
}).$mount('#app')
