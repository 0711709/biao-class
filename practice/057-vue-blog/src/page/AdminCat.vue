<template>
  <div id="cat">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>标题</th>
          <th>内容</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(it,index) in list" :key="index">
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button>更新</button>
            <button>删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    }
};
</script>

<style>
#cat {
  width: 70%;
  display: inline-block;
  padding-left: 5%;
  border-left: 1px solid #ddd;
}
</style>

