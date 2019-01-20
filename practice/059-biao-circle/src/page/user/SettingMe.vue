<template>
  <div class="setting">
    <div class="header">
      <div class="title">基础信息设置</div>
      <div class="edit" @click="editOrCancel" v-bind:class="{editActive: editModel}">
        <span v-if="editModel">取消</span>编辑
      </div>
    </div>
    <fieldset :disabled="updatePending">
      <table>
        <tbody>
          <tr>
            <td>昵称</td>
            <td>
              <span v-if="!me.nickname && !editModel">--</span>
              <input
                v-if="editModel|| me.nickname"
                @focus="error.nickname=false"
                type="text"
                v-model="me.nickname"
                :readonly="!editModel"
              >
            </td>
            <td>
              <span v-if="error.nickname" class="error">昵称长度应小于20位</span>
            </td>
          </tr>
          <tr>
            <td>用户名</td>
            <td>
              <span v-if="!me.username && !editModel">--</span>
              <input
                v-if="editModel || me.username"
                @focus="error.username=false"
                type="text"
                v-model="me.username"
                :readonly="!editModel"
              >
            </td>
            <td>
              <span v-if="error.username" class="error">{{error.username}}</span>
            </td>
          </tr>
          <tr>
            <td>签名</td>
            <td>
              <span v-if="!me.info && !editModel">--</span>
              <input
                v-if="editModel|| me.info"
                @focus="error.info=false"
                type="text"
                v-model="me.info"
                :readonly="!editModel"
              >
            </td>
            <td>
              <span v-if="error.info" class="error">签名长度小于50位</span>
            </td>
          </tr>
          <tr v-if="editModel">
            <td></td>
            <td>
              <button @click="validateAndUpdate">保存更改</button>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </div>
</template>

<script>
import store from "../../lib/store";
import api from "../../lib/api";

export default {
  data() {
    return {
      me: {}, //当前用户数据
      saveMe: {}, //保存当前用户数据
      editModel: false, //是否为编辑模式
      updatePending: false, //是否正在更新
      error: {
        username: false,
        nickname: false,
        info: false
      }
    };
  },

  mounted() {
    this.me = store.get("user");
    this.saveMe = { ...this.me };
  },

  methods: {
    editOrCancel() {
      this.editModel = !this.editModel;
      this.error.username = false;
      this.me = store.get("user");
    },

    validateAndUpdate() {
      //验证用户名,昵称,签名的格式
      if (
        this.inValidateUsername() ||
        this.inValidateNickname() ||
        this.inValidateInfo()
      ) {
        return;
      }

      this.error.nickname = this.error.username = this.error.info = false;

      //用户名查重
      this.updatePending = true;
      let param = { where: { and: { username: this.me.username } } };
      api("user/exists", param).then(r => {
        let usernameChange = this.saveMe.username !== this.me.username;

        if (r.data && usernameChange) {
          this.updatePending = false;
          this.error.username = "用户名已存在";
          return;
        } else {
          this.updateUsername();
        }
      });
    },

    //更新用户名
    updateUsername() {
      api("user/update", this.me).then(r => {
        if (r.success) {
          this.me = r.data;
          store.set("user", r.data);
          this.editModel = false;
          this.updatePending = false;
          window.location.reload();
        }
      });
    },

    inValidateNickname() {
      return (this.error.nickname = this.me.nickname.length > 20);
    },

    inValidateUsername() {
      if (
        !this.me.username ||
        /[\W_]/.test(this.me.username) ||
        this.me.username.length < 4 ||
        this.me.username.length > 20
      ) {
        this.error.username = "用户名格式有误,长度应介于4到20之间";
        return true;
      }
    },

    inValidateInfo() {
      return (this.error.info = this.me.info.length > 50);
    }
  }
};
</script>

<style>
</style>
