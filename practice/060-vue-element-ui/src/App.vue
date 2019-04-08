<template>
  <div id="app">
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <el-row>
      <el-col :span="12">
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur autem, harum rem recusandae provident repellendus cupiditate soluta. Necessitatibus numquam suscipit et quia aut. Ut quod, cupiditate culpa a possimus quibusdam.</div>
      </el-col>
      <el-col :span="12">
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti mollitia iure vero eligendi quisquam ipsam, facere, ducimus, beatae repellendus et? Beatae, minus consectetur fuga exercitationem harum ea obcaecati soluta.</div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple">111</div>
      </el-col>
      <el-col :xs="12" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light">111</div>
      </el-col>
      <el-col :xs="12" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple">111</div>
      </el-col>
      <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light">111</div>
      </el-col>
    </el-row>
    <div>
      <el-button @click="show = !show">Click Me</el-button>

      <div style="display: flex; margin-top: 20px; height: 100px;">
        <transition name="el-fade-in-linear">
          <div v-show="show" class="transition-box">.el-fade-in-linear</div>
        </transition>
        <transition name="el-fade-in">
          <div v-show="show" class="transition-box">.el-fade-in</div>
        </transition>
      </div>
    </div>

    <div>
      <el-button @click="show2 = !show2">Click Me</el-button>

      <div style="display: flex; margin-top: 20px; height: 100px;">
        <transition name="el-zoom-in-center">
          <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
        </transition>

        <transition name="el-zoom-in-top">
          <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
        </transition>

        <transition name="el-zoom-in-bottom">
          <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
        </transition>
      </div>

      <template>
        <el-alert title="成功提示的文案" type="success"></el-alert>
        <el-alert title="消息提示的文案" type="info"></el-alert>
        <el-alert title="警告提示的文案" type="warning"></el-alert>
        <el-alert title="错误提示的文案" type="error"></el-alert>
      </template>
    </div>
  </div>
</template>
  </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      radio: 1,
      count: 1,
      show: true,
      show2: true
    };
  },

  methods: {}
};
</script>

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
