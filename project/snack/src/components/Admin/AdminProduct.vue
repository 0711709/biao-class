<template>
  <div>
    <div class="head">
      <h2>商品管理</h2>
    </div>
    <div class="content">
      <div class="button">
        <el-button @click="show=true; errors={}" round size="small" type="success">
          <span>添加商品</span>
        </el-button>
      </div>
      <div v-if="show" class="form-product">
        <el-form size="small" label-width="4rem">
          <el-form-item label="品牌">
            <el-select
              v-model="form.brand_id"
              @change="debounceValidate('brand_id')"
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in brand" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <div class="error" v-for="(value, e) in errors.brand_id" :key="e">
              <div v-if="value">{{rules.brand_id[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              v-model="form.cat_id"
              @change="debounceValidate('cat_id')"
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in cat" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <div class="error" v-for="(value, e) in errors.cat_id" :key="e">
              <div v-if="value">{{rules.cat_id[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="标题" @keyup.native="debounceValidate('title')">
            <el-input v-model="form.title" placeholder="必填项"></el-input>
            <div class="error" v-for="(value, e) in errors.title" :key="e">
              <div v-if="value">{{rules.title[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="描述" @keyup.native="debounceValidate('desc')">
            <el-input v-model="form.desc" placeholder="必填项"></el-input>
            <div class="error" v-for="(value, e) in errors.desc" :key="e">
              <div v-if="value">{{rules.desc[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="价格" @keyup.native="debounceValidate('price')">
            <el-input v-model="form.price" placeholder="必填项"></el-input>
            <div class="error" v-for="(value, e) in errors.price" :key="e">
              <div v-if="value">{{rules.price[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="库存" @keyup.native="debounceValidate('total')">
            <el-input v-model="form.total" placeholder="必填项"></el-input>
            <div class="error" v-for="(value, e) in errors.total" :key="e">
              <div v-if="value">{{rules.total[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="运费" @keyup.native="debounceValidate('shipping_fee')">
            <el-input v-model="form.shipping_fee" placeholder="必填项"></el-input>
            <div class="error" v-for="(value, e) in errors.shipping_fee" :key="e">
              <div v-if="value">{{rules.shipping_fee[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="属性">
            <el-form :inline="true" size="small" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formProp.key" placeholder="属性"></el-input>
              </el-form-item>
              <el-form-item label="选项">
                <el-input v-model="formProp.value" placeholder="用 | 隔开"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addProp">确定</el-button>
              </el-form-item>
            </el-form>
            <div v-for="(value, key) in form.prop" :key="key">
              <span class="form-prop">{{key}} : {{value}}</span>
              <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteProp(key)"></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="editProp(key, value)"
              ></el-button>
            </div>
            <div class="error" v-for="(value, e) in errors.prop" :key="e">
              <div v-if="value">{{rules.prop[e].msg}}</div>
            </div>
          </el-form-item>
          <el-form-item label="主图">
            <Uploader :file="form.main_img" @change="mainFile"/>
          </el-form-item>
          <el-form-item label="详情图">
            <Uploader :file="form.detail" @change="detailFile"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createOrUpdate">提交</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-list">
        <el-table :data="list" size="small" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品价格:">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品运费:">
                  <span>{{ props.row.shipping_fee }}</span>
                </el-form-item>
                <el-form-item label="商品库存:">
                  <span>{{ props.row.total }}</span>
                </el-form-item>
                <el-form-item label="商品属性:">
                  <span>{{ props.row.prop }}</span>
                </el-form-item>
                <el-form-item label="商品分类:">
                  <span>{{ props.row.$cat.name }}</span>
                </el-form-item>
                <el-form-item label="商品品牌:">
                  <span>{{ props.row.$brand.name }}</span>
                </el-form-item>
                <el-form-item v-if="props.row.main_img" label="商品主图:">
                  <div class="table-img" v-for="(it, index) in props.row.main_img" :key="index">
                    <img v-bind:src="it.url" alt="图">
                  </div>
                </el-form-item>
                <el-form-item v-if="props.row.detail" label="商品详情:">
                  <div class="table-img" v-for="(it, index) in props.row.detail" :key="index">
                    <img v-bind:src="it.url" alt="图">
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID" prop="id"></el-table-column>
          <el-table-column label="商品名称" prop="title"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
          <el-table-column label="操作">
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
import Uploader from "../Self/Uploader";

export default {
  components: { Uploader },
  mixins: [admin],
  data() {
    return {
      model: "product",
      list: [],
      brand: [],
      cat: [],
      show: false,
      form: {},
      rules: {
        title: {
          required: {
            msg: "此项为必填项"
          }
        },
        desc: {
          required: {
            msg: "此项为必填项"
          }
        },
        price: {
          required: {
            msg: "此项为必填项"
          },
          min: {
            params: [0],
            msg: "不能小于0"
          }
        },
        shipping_fee: {
          required: {
            msg: "此项为必填项"
          },
          min: {
            params: [0],
            msg: "不能小于0"
          }
        },
        prop: {
          required: {
            msg: "此项为必填项"
          }
        },
        brand_id: {
          required: {
            msg: "此项为必填项"
          }
        },
        cat_id: {
          required: {
            msg: "此项为必填项"
          }
        },
        total: {
          required: {
            msg: "此项为必填项"
          },
          min: {
            params: [0],
            msg: "不能小于0"
          }
        }
      },
      errors: {},
      tiemr: null,
      asynValid: true, //没有异步请求 不判断
      pending: true,
      formCopy: {},
      params: {
        limit: 8,
        page: 1,
        with: ["belongs_to:cat", "belongs_to:brand"]
      },
      total: 0,
      formProp: {}
    };
  },

  mounted() {
    this.readOther("brand");
    this.readOther("cat");
  },

  methods: {
    readOther(model) {
      api(`${model}/read`).then(r => {
        if (r.success) {
          this[model] = r.data;
        }
      });
    },

    addProp() {
      if (!this.formProp.value || !this.formProp.key) {
        return;
      }

      this.form.prop = {};

      this.form.prop[this.formProp.key] = this.formProp.value;
      this.formProp = {};
    },

    editProp(key, value) {
      this.$set(this.formProp, "key", key);
      this.$set(this.formProp, "value", value);
    },

    deleteProp(key) {
      this.formProp = {};
      //删除后视图未更新 故再加上删除 formProp 利用 vue 特性强制刷新整个数据
      this.$delete(this.form.prop, key);
    },

    mainFile(f) {
      this.form.main_img = f;
    },

    detailFile(f) {
      this.form.detail = f;
    }
  }
};
</script>

<style scoped>
.form-product {
  width: 550px;
}

.form-prop {
  display: inline-block;
  margin: 0 1rem 0 0;
}

.table-img {
  display: inline-block;
  width: 4rem;
  height: 4rem;
  margin: 0 .5rem;
}
</style>
