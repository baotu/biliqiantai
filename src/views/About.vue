<template>
  <div class="about">
    <h1>这是about页面</h1>
    <div id="danmup"></div>
    <!-- <el-upload
      class="upload-demo"
      action="http://111.230.247.223/SameBWeb/xyuserinfo/updateHead.do"
      :with-credentials="true"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      name="userphoto"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>-->
    <!-- <form enctype="multipart/form-data" action="http://111.230.247.223/SameBWeb/xyuserinfo/updateHead.do" method="post">
      <input type="file" name="userphoto">
      <input type="submit" value="Dinaow">
    </form>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    postpl() {
      this.axios
        .post("xyvideocomment/findByVideoId.do", { videoid: 1 })
        .then(rs => {
          console.log(rs);
        });
    },
    gets() {
      this.axios.get("http://localhost").then(rs => {
        console.log(rs);
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  mounted() {
    setTimeout(() => {
      $("#danmup").DanmuPlayer({
        src:
          "http://cdn.hwzhj.top/video/mp4/%E3%80%90%E5%89%A7%E5%9C%BA%E7%89%88%E3%80%91%E5%93%86%E5%95%A6A%E6%A2%A62019%20%E5%A4%A7%E9%9B%84%E7%9A%84%E6%8E%A2%E6%9C%88%E8%AE%B0%20%E7%89%B9%E5%88%AB%E7%94%BB%E9%9D%A2%E3%80%90kazamaever%E5%AD%97%E5%B9%95%E3%80%91%20-%201.SPPV%28Av45708032,P1%29.mp4",
        height: "500px", //区域的高度
        width: "500px" //区域的宽度
      });
      this.axios({
        method: "get",
        url: "http://111.230.247.223/SameBWeb/xydanmu/findByVideoid.do",
        params: {
          videoid: 42
        },
        withCredentials: true
      }).then(rs => {
        console.log(rs.data.xyuser);
        $("#danmup .danmu-div").danmu("addDanmu", rs.data.xyuser);
      });
    }, 1000);
  }
};
</script>

