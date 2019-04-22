<template>
  <div id="main">
    <div class="container">
      <div class="section section-sm">
        <div class="cat-group box">
          <div class="cat" :class="cat=='all'? 'active': ''" @click="catRead('all')">全部</div>
          <div class="cat" :class="cat==2? 'active': ''" @click="catRead(2)">前端</div>
          <div class="cat" :class="cat==6? 'active': ''" @click="catRead(6)">JavaScript</div>
          <div class="cat" :class="cat==3? 'active': ''" @click="catRead(3)">vue</div>
          <div class="cat" :class="cat==4? 'active': ''" @click="catRead(4)">react</div>
        </div>
        <div class="box" v-for="(it,index) in list" :key="index">
          <div class="post">
            <div class="left">
              <img src="..\..\public\hello.png" alt="img">
            </div>
            <div class="right">
              <router-link :to="'post/' + it.id">
                <div class="title">{{it.title}}</div>
              </router-link>
              <div class="info">{{it.$user? it.$user.username: "-"}} 发布于 {{it.create_at}}</div>
            </div>
            <div
              class="operate"
              v-if="it.$user && session.user() && (it.$user.id === session.user().id)"
            >
              <button @click="postDelete(it.id)">删除</button>
            </div>
          </div>
        </div>
        <scrollLoad
          v-if="scroll"
          :page="1"
          :totalPage="totalPage"
          :pending="pending"
          @flip="onFlip"
        />
      </div>
      <div class="side hidden-sm">
        <div class="box" v-if="session.user()">
          <div class="me">
            <router-link to="/member" class="post">{{session.user().username}}</router-link>
            <router-link to="/member" class="post">创建新主题</router-link>
          </div>
        </div>
        <div class="box">
          <div class="state">
            <div class="cell">社区指导原则</div>
            <div class="inner">
              <ul>
                <li>
                  <span>尊重原创</span>
                  <div>请不要在表圈子发布任何盗版下载链接，包括软件、音乐、电影等等。表圈子是创意工作者的社区，我们尊重原创。</div>
                </li>
                <li>
                  <span>友好互助</span>
                  <div>保持对陌生人的友善。用知识去帮助别人。</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import scrollLoad from "../components/ScrollLoad";

export default {
  components: { scrollLoad },
  data() {
    return {
      list: [],
      session,
      readParams: {
        limit: 8,
        page: 1,
        with: [{ model: "user", relation: "belongs_to" }],
        where: {}
      },
      totalPage: 0,
      pending: false,
      scroll: false,
      cat: "all"
    };
  },

  mounted() {
    this.read();
  },

  methods: {
    read() {
      api("post/read", this.readParams).then(r => {
        if (r.success) {
          let data = r.data || [];
          this.list = [...this.list, ...data];
          this.pending = false;
          this.scroll = true;
          this.totalPage = Math.ceil(r.total / this.readParams.limit);
        }
      });
    },

    catRead(cat) {
      this.cat = cat;
      this.scroll = false;
      this.list = [];
      this.readParams.page = 1;
      if (cat == "all") {
        delete this.readParams.where.and;
        this.read();
        return;
      }
      this.readParams.where.and = { cat_id: cat };
      this.read();
    },

    postDelete(id) {
      if (!confirm("确定删除?")) {
        return;
      }

      api("post/delete", { id }).then(r => {
        if (r.success) {
          this.read();
        }
      });
    },

    onFlip(it) {
      this.readParams.page = it;
      this.pending = true;
      this.read();
    }
  }
};
</script>

<style>
</style>


