<template>
  <div id="main">
    <div class="container">
      <div class="section">
        <div class="box profile">
          <div class="thumb">
            <img src="../../../public/helloworld.jpg" alt="me">
          </div>
          <div class="me">
            <div>{{me.username}}</div>
            <div>表圈子第 {{me.id}} 位会员</div>
          </div>
        </div>
        <div class="box">
          <button @click="postOrCancel = !postOrCancel">
            <span v-if="!postOrCancel">创建新主题</span>
            <span v-else>取消创建</span>
          </button>
        </div>
        <div v-if="postOrCancel">
          <div class="box">
            <span>主题标题</span>
            <span class="msg" v-bind:class="{error: error.title}">120字数以内且不能为空</span>
          </div>
          <input
            class="box"
            type="text"
            placeholder="请输入主题标题,如果标题能够表达完整内容,则正文可以为空"
            v-model="current.title"
          >
          <div class="box">
            <span>正文</span>
            <span class="msg" v-bind:class="{error: error.content}">200字数以内</span>
          </div>
          <textarea rows="20" v-model="current.content"></textarea>
          <div class="box">
            <button @click="postCreate">发布主题</button>
          </div>
        </div>
        <div class="box thread">
          <div class="cat active">时间线</div>
        </div>
        <div class="box" v-for="(it,index) in list" :key="index">
          <div class="post">
            <div class="left">
              <img src="..\..\..\public\helloworld.jpg" alt="img">
            </div>
            <div class="right">
              <div class="title">{{it.title}}</div>
              <div class="info">{{me.username}} 发布于 {{it.create_at}}</div>
            </div>
            <div class="operate">
              <button @click="postEdit(it)">编辑</button>
              <button @click="postDelete(it.id)">删除</button>
            </div>
          </div>
        </div>
      </div>
      <div class="side">
        <div class="box">
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
</template>

<script>
import store from "../../lib/store";
import dateFormatter from "../../lib/dateFormatter.js";
import api from "../../lib/api.js";

export default {
  data() {
    return {
      postOrCancel: false,
      me: {},
      current: {},
      list: [],
      error: {
        title: false,
        content: false,
        create: false
      }
    };
  },

  mounted() {
    this.me = store.get("user");
    this.thread();
    // this.test();
  },

  methods: {
    postCreate() {
      if (!this.current.title || this.current.title.length > 120) {
        this.error.title = true;
        return;
      }

      if (this.current.content.length > 200) {
        this.error.content = true;
        return;
      }

      this.error.title = this.error.content = false;
      this.current.user_id = this.me.id;
      this.current.create_at = dateFormatter.format(new Date());
      let url = "post/create"
      if(this.current.id){url = "post/update"}
      api(url, this.current).then(r => {
        if (!r.success) {
          // return;
          // this.error.create = true; //暂不处理
        }
        this.current = {};
        this.postOrCancel = false;
        this.thread();
      });
    },

    // test() {
    //   api("post/read", {
    //     with: [
    //       {
    //         model: "user",
    //         relation: "belongs_to"
    //       }
    //     ]
    //   }).then(r => {
    //     console.log(r.data);
    //   });
    // },

    thread() {
      api("post/read", { where: { and: { user_id: this.me.id } } }).then(r => {
        this.list = r.data;
      });
    },

    postEdit(it) {
      this.current =it;
      this.postOrCancel = true;
    },

    postDelete(id) {
      api("post/delete", {id}).then(r => {
        if(r.success){
          this.thread();
        }
      })
    }
  }
};
</script>

<style>
</style>


