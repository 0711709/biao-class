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
            <th class="text-left" @click="changeOrCancel">
              <button>
                <span v-if="changePasswordVisible">取消</span>
                <span>修改</span>
                <span v-if="!changePasswordVisible">密码</span>
              </button>
            </th>
            <th>
              <span class="success" v-if="changePasswordSuccess">{{changePasswordSuccess}}</span>
              <span class="fail" v-if="changePasswordFail">{{changePasswordFail}}</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="changePasswordVisible">
          <tr>
            <td>旧密码</td>
            <td>
              <input
                type="password"
                v-model="password.old"
                @focus="errorPassword.old1=errorPassword.old2=changePasswordFail=false"
              >
            </td>
            <td>
              <span class="error" v-if="errorPassword.old1">请输入旧密码</span>
              <span class="error" v-if="errorPassword.old2">旧密码有误</span>
            </td>
          </tr>
          <tr>
            <td>新密码</td>
            <td>
              <input type="password" v-model="password.new" @focus="errorPassword.new=changePasswordFail=false">
            </td>
            <td>
              <span class="error" v-if="errorPassword.new">密码长度需大于6位</span>
            </td>
          </tr>
          <tr>
            <td>重复密码</td>
            <td>
              <input type="password" v-model="password.repeat" @focus="errorPassword.repeat=changePasswordFail=false">
            </td>
            <td>
              <span class="error" v-if="errorPassword.repeat">两次密码输入不一致</span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button @click="validateAndChangePassword">提交更改</button>
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
      changePasswordVisible: false, //设置表单是否可见
      password: {}, //
      user: store.get("user"), //当前用户信息
      errorPassword: {
        //错误信息
        old1: false,
        old2: false,
        new: false,
        repeat: false
      },
      changePasswordPending: false, // 禁用表单防止重复提交
      changePasswordSuccess: false, //成功提示
      changePasswordFail: false, //失败提示
    };
  },

  methods: {
    //修改或取消修改
    changeOrCancel() {
      this.changePasswordVisible = !this.changePasswordVisible;
      this.password = {};
    },

    //验证及修改密码
    validateAndChangePassword() {
      let user = this.user;
      let passwordOld = this.password.old;

      //验证是否输入旧密码 新密码格式是否有误 两次密码是否输入一致
      if (
        this.inValidateOld1() ||
        this.inValidateNew() ||
        this.inValidateRepeat()
      ) {
        return;
      }

      //在验证旧密码是否输入正确
      let param = {
        id: user.id,
        only: ["password"]
      };

      api("user/find", param).then(r => {
        if (passwordOld !== r.data.password) {
          this.errorPassword.old2 = "旧密码有误";
          return;
        } else {
          this.changePassword();
        }
      });
    },

    //更新密码
    changePassword() {
      this.errorPassword.old = false;

      this.changePasswordPending = true;

      api("user/update", {
        id: this.user.id,
        password: this.password.new
      }).then(r => {
        if (r.success) {
          this.changePasswordPending = false;
          this.changePasswordVisible = false;
          this.password = {};
          this.changePasswordSuccess = "密码修改成功";
          setTimeout(() => {
            this.changePasswordSuccess = false;
          }, 2000);
        } else {
          this.changePasswordPending = false;
          this.password = {};
          this.changePasswordFail = "密码修改失败";  
        }
      });
    },

    //数据验证
    inValidateOld1() {
      return (this.errorPassword.old1 = !this.password.old);
    },

    inValidateNew() {
      return (this.errorPassword.new =
        !this.password.new || this.password.new.length < 6);
    },

    inValidateRepeat() {
      return (this.errorPassword.repeat =
        !this.password.repeat || this.password.repeat !== this.password.new);
    }
  }
};
</script>

<style>
</style>