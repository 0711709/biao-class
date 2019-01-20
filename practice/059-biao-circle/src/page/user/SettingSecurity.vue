<template>
  <div class="setting">
    <div class="header">
      <div class="title">安全信息设置</div>
    </div>
    <fieldset :disabled="changePasswordPending">
      <table>
        <thead>
          <tr>
            <th>密码设置</th>
            <th class="text-left" @click="changePasswordVisible = !changePasswordVisible">
              <button>
                <span v-if="changePasswordVisible">取消</span>
                <span>修改</span>
                <span v-if="!changePasswordVisible">密码</span>
              </button>
            </th>
            <th>
              <span class="success" v-if="changePasswordSuccess">{{changePasswordSuccess}}</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="changePasswordVisible">
          <tr>
            <td>旧密码</td>
            <td>
              <input type="password" v-model="password.old">
            </td>
            <td>
              <span class="error" v-if="errorPassword.old">{{errorPassword.old}}</span>
            </td>
          </tr>
          <tr>
            <td>新密码</td>
            <td>
              <input type="password" v-model="password.new">
            </td>
            <td>
              <span class="error" v-if="errorPassword.new">{{errorPassword.new}}</span>
            </td>
          </tr>
          <tr>
            <td>重复密码</td>
            <td>
              <input type="password" v-model="password.repeat">
            </td>
            <td>
              <span class="error" v-if="errorPassword.repeat">{{errorPassword.repeat}}</span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button @click="changePassword">提交更改</button>
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
      changePasswordVisible: false,
      password: {},
      user: store.get("user"),
      errorPassword: {
        old: false,
        new: false,
        repeat: false
      },
      changePasswordPending: false,
      changePasswordSuccess: false
    };
  },

  methods: {
    changePassword() {
      let user = this.user;
      let passwordOld = this.password.old;
      let passwordNew = this.password.new;
      let passwordRepeat = this.password.repeat;

      let inValidateNew = !passwordNew || passwordNew.length < 6;
      let inValidateRepeat = !passwordRepeat || passwordRepeat !== passwordNew;

      //先验证是否输入旧密码
      if (!passwordOld) {
        this.errorPassword.old = "请输入旧密码";
        return;
      } else {
        this.errorPassword.old = false;
      }

      //在验证新密码是否大于6位
      if (inValidateNew) {
        this.errorPassword.new = "密码长度需大于6位";
        return;
      } else {
        this.errorPassword.new = false;
      }

      //在验证两次密码是否输入一致
      if (inValidateRepeat) {
        this.errorPassword.repeat = "两次密码输入不一致";
        return;
      } else {
        this.errorPassword.repeat = false;
      }

      //在验证旧密码是否输入正确
      api("user/read").then(r => {
        console.log(r.data);
      });

      let param = {
        id: user.id,
        only: ["password"]
      };

      api("user/find", param).then(r => {
        if (passwordOld !== r.data.password) {
          this.errorPassword.old = "旧密码有误";
          return;
        }
      });

      //验证成功之后更新密码
      this.errorPassword.old = false;

      this.changePasswordPending = true;
      api("user/update", { id: user.id, password: passwordNew }).then(r => {
        this.changePasswordPending = false;
        this.changePasswordVisible = false;
        this.password = {};
        this.changePasswordSuccess = "密码修改成功";
        setTimeout(() => {
          this.changePasswordSuccess = false;
        }, 2000);
      });
    }
  }
};
</script>

<style>
</style>