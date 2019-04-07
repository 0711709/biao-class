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
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      radio: 1
    };
  }
};
</script>

<style>
</style>
