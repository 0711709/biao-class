<template>
  <div>
    <el-upload
      action="https://mock.biaoyansu.com/api/1/_file/create"
      :headers="headers"
      list-type="picture-card"
      :file-list="file || []"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleUploaderSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../lib/api";

export default {
  props: ["file"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      headers: {}
    };
  },

  mounted() {
    this.setHeader();
    this.fileList = this.file;
  },

  methods: {
    //图片上传成功后
    handleUploaderSuccess(response) {
      let id = response.data.id;
      let url = "https://" + response.data._base_url + "/" + response.data._key;
      let name = response.data._original_name;
      this.fileList.push({ id, name, url });
      console.log(this.fileList)
      this.$emit("change", this.fileList);
      //   console.log(this.fileList);
    },

    //移除上传图片
    handleRemove(file) {
      console.log(file);
      let id = file.id;
      api("_file/delete", { id }).then(r => {
        if (r.success) {
          this.fileList.forEach((e, index) => {
            if (e.id === id) {
              this.fileList.splice(index, 1);
            }
          });
          this.$emit("change", this.fileList);
        }
      });
    },

    //预览上传图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //设置 header
    setHeader() {
      const APP_KEY =
        "3625bc2df9f51babd0d651bef817667d6ab61c9bfdfac059045baa308aabcd81";

      function sign(app_key, timestamp) {
        return btoa(app_key + timestamp);
      }

      let timestamp = new Date().getTime();
      let signature = sign(APP_KEY, timestamp);

      this.headers = {
        "BIAO-MOCK-APP-KEY": APP_KEY,
        "BIAO-MOCK-TIMESTAMP": timestamp,
        "BIAO-MOCK-SIGNATURE": signature
      };
    }
  }
};
</script>

<style scoped>
</style>


