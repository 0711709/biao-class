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
                type="text"
                v-model="me.nickname"
                :readonly="!editModel"
              >
            </td>
          </tr>
          <tr>
            <td>用户名</td>
            <td>
              <span v-if="!me.username && !editModel">--</span>
              <input
                v-if="editModel || me.username"
                @focus="error=false"
                type="text"
                v-model="me.username"
                :readonly="!editModel"
              >
            </td>
            <td>
              <span v-if="error" class="error">{{error}}</span>
            </td>
          </tr>
          <tr>
            <td>签名</td>
            <td>
              <span v-if="!me.info && !editModel">--</span>
              <input
                v-if="editModel|| me.info"
                type="text"
                v-model="me.info"
                :readonly="!editModel"
              >
            </td>
          </tr>
          <tr v-if="editModel">
            <td></td>
            <td>
              <button @click="update">保存更改</button>
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
      editModel: false, //是否为编辑模式
      updatePending: false, //是否正在更新
      error: false
    };
  },

  mounted() {
    this.me = store.get("user");
    // api("user/find", { id: store.get("user").id, except: ["password"] }).then(
    //   r => {
    //     this.me = r.data;
    //     console.log(r);
    //   }
    // );
  },

  methods: {
    editOrCancel() {
      this.editModel = !this.editModel;
      this.me = store.get("user");
    },

    update() {
      //验证用户名格式
      let inValidateUsername =
        !this.me.username || !/[a-zA-Z0-9]{4,20}/.test(this.me.username);
      if (inValidateUsername) {
        this.error = "用户名格式有误,长度应介于4到20之间";
        return;
      }
      this.error = false;

      this.updatePending = true;
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

    invalidate() {}
  }
};
</script>

<style>
</style>
