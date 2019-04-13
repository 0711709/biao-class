<template>
  <div>
    <div class="head">
      <h2>分类管理</h2>
    </div>
    <div class="content">
      <div class="button">
        <el-button @click="show=true; errors={}" round size="small" type="success">
          <span>添加分类</span>
        </el-button>
      </div>
      <div v-if="show" class="form">
        <el-form size="small" label-width="4rem">
          <el-form-item label="分类名" @keyup.native="debounceValidate('name')">
            <el-input v-model="form.name" placeholder="必填项"></el-input>
            <div class="error" v-for="(value, e) in errors.name" :key="e">
              <div v-if="value">{{rules.name[e].msg}}</div>
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
          <el-table-column width="160" prop="name" label="分类名"></el-table-column>
          <el-table-column width="160" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination text-center">
          <el-pagination
            layout="prev, pager, next, total"
            :page-size="params.limit"
            :total="total"
            :current-page="params.page"
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
      model: "cat",
      list: [],
      show: false,
      form: {},
      rules: {
        name: {
          required: {
            msg: "此项为必填项"
          },
          unique: {
            params: ["cat", "exists", "name"],
            msg: "分类已存在"
          }
        }
      },
      errors: {},
      tiemr: null,
      asynValid: false,
      pending: true,
      formCopy: {},
      params: {
        limit: 5,
        page: 1
      },
      total: 0
    };
  }
};
</script>

<style>

</style>