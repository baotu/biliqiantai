(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["insertVideo"],{"68e3":function(e,t,o){},b5d9:function(e,t,o){"use strict";var i=o("68e3"),a=o.n(i);a.a},ea36:function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"insertVideo"},[o("HeaderNav"),o("div",{staticClass:"int-cont"},[o("h3",{staticStyle:{"font-size":"24px",padding:"5px 10px","margin-bottom":"20px"}},[o("span",{directives:[{name:"show",rawName:"v-show",value:!e.videoId,expression:"!videoId"}]},[e._v("添加")]),o("span",{directives:[{name:"show",rawName:"v-show",value:e.videoId,expression:"videoId"}]},[e._v("修改")]),e._v("视频")]),o("el-form",{attrs:{"label-width":"80px",model:e.form}},[o("el-form-item",{attrs:{label:"上传视频"}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{name:"videofile",action:"http://111.230.247.223/SameBWeb/xyvideo/updateVideo.do","show-file-list":!1,"on-success":e.handleAvatarSuccess,accept:".mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb","on-progress":e.uploadPhotoProcess1}},[""!=e.form.videourl&&0==e.photoFlag?o("video",{staticClass:"avatar",staticStyle:{width:"200px"},attrs:{id:"videofile",src:e.form.videourl}}):e._e(),""==e.form.videourl&&0==e.photoFlag?o("div",{staticClass:"changehead"},[e._v("上传视频")]):e._e(),1==e.photoFlag?o("el-progress",{staticStyle:{"padding-left":"40px","margin-top":"15px",width:"160px"},attrs:{type:"circle",percentage:e.photoUploadPercent}}):e._e()],1)],1),o("el-form-item",{attrs:{label:"视频标题"}},[o("el-input",{staticStyle:{width:"40%"},attrs:{placeholder:"请输入标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),o("el-form-item",{attrs:{label:"视频名字"}},[o("el-input",{staticStyle:{width:"40%"},attrs:{placeholder:"请输入名字(搜索的关键字)"},model:{value:e.form.videoname,callback:function(t){e.$set(e.form,"videoname",t)},expression:"form.videoname"}})],1),o("el-form-item",{attrs:{label:"视频标签"}},[o("el-input",{staticStyle:{width:"40%"},attrs:{placeholder:"请输入名字(搜索的关键字)"},model:{value:e.form.label,callback:function(t){e.$set(e.form,"label",t)},expression:"form.label"}})],1),o("el-form-item",{attrs:{label:"视频封面"}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://111.230.247.223/SameBWeb/xyvideo/updateVideoPicture.do","show-file-list":!1,name:"videopicture","with-credentials":!0,"on-success":e.handleAvatarSuccess11,"before-upload":e.beforeAvatarUpload11}},[""==e.form.picture?o("div",{staticClass:"changehead"},[e._v("上传封面")]):e._e(),e.form.picture?o("img",{staticClass:"avatar",attrs:{src:e.form.picture}}):e._e()])],1),o("el-form-item",{attrs:{label:"视频类型"}},[o("el-select",{attrs:{placeholder:"请选择视频分类"},model:{value:e.form.typeid,callback:function(t){e.$set(e.form,"typeid",t)},expression:"form.typeid"}},e._l(e.types,function(e){return o("el-option",{key:e.typeid,attrs:{label:e.typename,value:e.typeid}})}),1)],1),o("el-form-item",{attrs:{label:"作品介绍"}},[o("el-input",{staticStyle:{width:"70%"},attrs:{type:"textarea",placeholder:"请输入视频简介"},model:{value:e.form.videonote,callback:function(t){e.$set(e.form,"videonote",t)},expression:"form.videonote"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交发布")])],1)],1),o("img",{staticClass:"im",attrs:{src:"https://s3.hdslb.com/bfs/static/studio-upload-v3/static/img/2233_upload.637ac33.png",alt:""}})],1),o("Footer")],1)},a=[],r=o("e814"),s=o.n(r),d=o("387d"),l=o("9fe9"),n=o("c0d6"),m={store:n["a"],components:{HeaderNav:d["a"],Footer:l["a"]},data:function(){return{types:"",photoFlag:!1,photoUploadPercent:"0%",videoId:"",form:{videourl:"",timelong:"",title:"",typeid:"",videoname:"",picture:"",videonote:"",label:""}}},mounted:function(){var e=this;this.getType(),this.$route.query.vdId&&(this.videoId=this.$route.query.vdId,this.axios.get("xyvideo/findById.do",{params:{videoid:this.$route.query.vdId}}).then(function(t){e.form.videoname=t.data.xyuser.videoname,e.form.videourl=t.data.xyuser.videourl,e.form.typeid=t.data.xyuser.typeid,e.form.picture=t.data.xyuser.picture,e.form.timelong=t.data.xyuser.timelong,e.form.videonote=t.data.xyuser.videonote,e.form.title=t.data.xyuser.title,e.form.label=t.data.xyuser.label}))},methods:{beforeUploadVideo:function(e){var t=e.size/1024/1024<2e3;if(!t)return this.$message.error("上传视频大小不能超过2000MB哦!"),!1},handleAvatarSuccess:function(e){this.form.videourl=e.xyuser,this.form.timelong=e.timelong,this.photoFlag=!1,this.photoUploadPercent=0},uploadPhotoProcess1:function(e,t){this.photoFlag=!0,this.photoUploadPercent=s()(t.percentage)},getType:function(){var e=this;this.axios.get("xyvideotype/findAll.do").then(function(t){e.types=t.data.xyvideotype})},handleAvatarSuccess11:function(e,t){this.form.picture=e.xyuser},beforeAvatarUpload11:function(e){var t="image/jpeg"===e.type,o="image/png"===e.type,i=e.size/1024/1024<2;return this.file=e,t&&o||this.$message.error("上传头像图片只能是 JPG 和 PNG 格式!"),i||this.$message.error("上传头像图片大小不能超过 2MB!"),(t||o)&&i},onSubmit:function(){var e=this;this.$route.query.vdId?this.axios({method:"post",url:"xyvideo/updateVideoByVideoId.do",data:{videoid:this.$route.query.vdId,videoname:this.form.videoname,videourl:this.form.videourl,typeid:this.form.typeid,picture:this.form.picture,timelong:this.form.timelong,videonote:this.form.videonote,title:this.form.title,label:this.form.label},withCredentials:!0}).then(function(t){1==t.data.xyuser?(e.$message({message:"修改成功！请耐心等待审核",type:"success",duration:1e3}),e.$router.push({name:"addVideo"})):(e.$message({message:"上传失败！请重试",type:"error",duration:1e3}),e.$router.push({name:"insertVideo"}))}):this.axios({method:"post",url:"xyvideo/insertData.do",data:{videoname:this.form.videoname,videourl:this.form.videourl,typeid:this.form.typeid,picture:this.form.picture,timelong:this.form.timelong,videonote:this.form.videonote,title:this.form.title,label:this.form.label},withCredentials:!0}).then(function(t){1==t.data.xyuser?(e.$message({message:"上传成功！请耐心等待审核",type:"success",duration:1e3}),e.$router.push({name:"addVideo"})):(e.$message({message:"上传失败！请重试",type:"error",duration:1e3}),e.$router.push({name:"insertVideo"}))})}}},u=m,p=(o("b5d9"),o("2877")),c=Object(p["a"])(u,i,a,!1,null,"45c0c0c8",null);t["default"]=c.exports}}]);
//# sourceMappingURL=insertVideo.edc190f2.js.map