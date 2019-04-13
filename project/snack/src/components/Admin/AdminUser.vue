<template>
  <div>
    <div class="head">
      <h2>用户管理</h2>
    </div>
    <div class="content">
      <div class="button">
        <el-button @click="show=true; errors={}" round size="small" type="success">
          <span>创建用户</span>
        </el-button>
      </div>
      <div v-if="show" class="form">
        <el-form size="small" label-width="3rem">
          <el-form-item label="昵称">
            <el-input
              v-model="form.username"
              placeholder="必填项"
              @keyup.native="debounceValidate('username')"
            ></el-input>
            <div class="error" v-for="(value, e) in errors.username" :key="e">
              <div v-if="value">{{rules.username[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="手机" @keyup.native="debounceValidate('phone')">
            <el-input v-model="form.phone" placeholder="选填项"></el-input>
            <div class="error" v-for="(value, e) in errors.phone" :key="e">
              <div v-if="value">{{rules.phone[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="邮箱" @keyup.native="debounceValidate('mail')">
            <el-input v-model="form.mail" placeholder="选填项"></el-input>
            <div class="error" v-for="(value, e) in errors.mail" :key="e">
              <div v-if="value">{{rules.mail[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="密码" @keyup.native="debounceValidate('password')">
            <el-input v-model="form.password" placeholder="必填项" show-password></el-input>
            <div class="error" v-for="(value, e) in errors.password" :key="e">
              <div v-if="value">{{rules.password[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createOrUpdate" :disabled="pending">提交</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-list">
        <el-table :data="list" size="small" :row-class-name="tableRowClassName" style="width: 100%">
          <el-table-column width="80" prop="id" label="ID"></el-table-column>
          <el-table-column width="160" prop="username" label="用户名"></el-table-column>
          <el-table-column width="160" prop="phone" label="手机号"></el-table-column>
          <el-table-column width="160" prop="mail" label="邮箱"></el-table-column>
          <el-table-column width="160" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination text-center">
          <el-pagination
            layout="prev, pager, next"
            :size="params.limit"
            :current-page="params.page"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import admin from "../../mixin/admin";

export default {
  mixins: [admin],
  data() {
    return {
      model: "user",
      list: [],
      show: false,
      form: {},
      rules: {
        username: {
          required: {
            msg: "此项为必填项"
          },
          unique: {
            params: ["user", "exists", "username"],
            msg: "昵称已存在"
          },
          lengthBetween: {
            params: [4, 12],
            msg: "昵称长度应在4至12位之间"
          }
        },
        phone: {
          unique: {
            params: ["user", "exists", "phone"],
            msg: "手机号已注册"
          },
          phone: {
            msg: "手机格式不正确"
          }
        },
        mail: {
          unique: {
            params: ["user", "exists", "mail"],
            msg: "邮箱已注册"
          },
          mail: {
            msg: "邮箱格式不正确"
          }
        },
        password: {
          required: {
            msg: "此项为必填项"
          },
          lengthBetween: {
            params: [6, 32],
            msg: "密码长度在6到32位之间"
          }
        }
      },
      errors: {},
      tiemr: null,
      asynValid: false,
      pending: true,
      formCopy: {},
      params: {
        limit: 8,
        page: 1
      },
      total: 10
    };
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.pagination {
  margin-top: 0.5rem;
}
</style>

