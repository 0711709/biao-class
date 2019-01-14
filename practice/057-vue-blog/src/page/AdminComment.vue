<template>
  <div id="comment">
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
        <tr>
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
#comment {
  width: 70%;
  display: inline-block;
  padding-left: 5%;
  border-left: 1px solid #ddd;
}
</style>


