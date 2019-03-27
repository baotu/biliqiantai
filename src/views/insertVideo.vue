<template>
	<div class="insertVideo">
		<HeaderNav></HeaderNav>
		<div class="int-cont">
			<h3 style="font-size: 24px;padding: 5px 10px;margin-bottom: 20px;"><span v-show="!videoId">添加</span><span v-show="videoId">修改</span>视频</h3>
			<el-form label-width="80px" :model="form">
				<el-form-item label="上传视频">
					<el-upload class="avatar-uploader" name="videofile" action="http://111.230.247.223/SameBWeb/xyvideo/updateVideo.do"
					 :show-file-list="false" :on-success="handleAvatarSuccess" accept=".mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb"
					 :on-progress="uploadPhotoProcess1">
						<video id="videofile" v-if=" form.videourl != '' && photoFlag == false" style="width: 200px;" :src="form.videourl"
						 class="avatar"></video>
						<div class="changehead" v-if=" form.videourl == '' && photoFlag == false">上传视频</div>
						<el-progress v-if="photoFlag == true" type="circle" :percentage="photoUploadPercent" style="padding-left: 40px; margin-top:15px;width: 160px;"></el-progress>
					</el-upload>
				</el-form-item>
				<el-form-item label="视频标题">
					<el-input v-model="form.title" style="width:40%" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="视频名字">
					<el-input v-model="form.videoname" style="width:40%" placeholder="请输入名字(搜索的关键字)"></el-input>
				</el-form-item>
				<el-form-item label="视频标签">
					<el-input v-model="form.label" style="width:40%" placeholder="请输入名字(搜索的关键字)"></el-input>
				</el-form-item>
				<el-form-item label="视频封面">
					<el-upload class="avatar-uploader" action="http://111.230.247.223/SameBWeb/xyvideo/updateVideoPicture.do"
					 :show-file-list="false" name="videopicture" :with-credentials="true" :on-success="handleAvatarSuccess11"
					 :before-upload="beforeAvatarUpload11">
						<div class="changehead" v-if="form.picture == ''">上传封面</div>
						<img v-if="form.picture" :src="form.picture" class="avatar">
					</el-upload>

				</el-form-item>
				<el-form-item label="视频类型">
					<el-select v-model="form.typeid" placeholder="请选择视频分类">
						<el-option v-for="item in types" :key="item.typeid" :label="item.typename" :value="item.typeid">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="作品介绍">
					<el-input type="textarea" v-model="form.videonote" style="width:70%" placeholder="请输入视频简介"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">提交发布</el-button>
				</el-form-item>
			</el-form>
			<img class="im" src="https://s3.hdslb.com/bfs/static/studio-upload-v3/static/img/2233_upload.637ac33.png" alt="">
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import HeaderNav from "@/components/header/HeaderNav1";
	import Footer from "@/components/footer/index";
	import store from "@/store.js";
	//import qs from "qs"
	export default {
		store,
		components: {
			HeaderNav,
			Footer
		},
		data() {
			return {
				types: '',
				photoFlag: false,
				photoUploadPercent: '0%',
				videoId:'',
				form: {
					videourl: '',
					timelong: '',
					title: '',
					typeid: '',
					videoname: '',
					picture: '',
					videonote: '',
					label: ''
				}
			};
		},
		mounted() {
			this.getType();
			//console.log(this.$route.query.vdId);
			if (this.$route.query.vdId) {
				this.videoId = this.$route.query.vdId;
				this.axios
					.get("xyvideo/findById.do", {
						params: {
							videoid: this.$route.query.vdId
						}
					})
					.then(rs => {
						// console.log(rs.data.xyuser);
						this.form.videoname = rs.data.xyuser.videoname;
						this.form.videourl = rs.data.xyuser.videourl;
						this.form.typeid = rs.data.xyuser.typeid;
						this.form.picture = rs.data.xyuser.picture;
						this.form.timelong = rs.data.xyuser.timelong;
						this.form.videonote = rs.data.xyuser.videonote;
						this.form.title = rs.data.xyuser.title;
						this.form.label = rs.data.xyuser.label;
					});
			}
		},
		methods: {
			//视频
			beforeUploadVideo(file) { //视频上传之前判断他的大小
				const isLt10M = file.size / 1024 / 1024 < 2000;
				if (!isLt10M) {
					this.$message.error('上传视频大小不能超过2000MB哦!');
					return false;
				}
			},
			handleAvatarSuccess(res) { //,file
				this.form.videourl = res.xyuser;
				this.form.timelong = res.timelong;
				this.photoFlag = false;
				this.photoUploadPercent = 0;
			},
			uploadPhotoProcess1(event, file) { //,fileList
				this.photoFlag = true;
				this.photoUploadPercent = parseInt(file.percentage);
			},
			getType() {
				this.axios.get('xyvideotype/findAll.do').then(res => {
					//console.log(res.data);
					this.types = res.data.xyvideotype;
				});
			},
			//封面
			handleAvatarSuccess11(res, file) {
				this.form.picture = res.xyuser;
			},
			beforeAvatarUpload11(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.file = file;
				// console.log(this.file);
				if (!isJPG || !isPNG) {
					this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return (isJPG||isPNG) && isLt2M;
			},
			onSubmit() {
				//var c = qs.stringify(data)
				if(this.$route.query.vdId){
					this.axios({
						method: 'post',
						url: 'xyvideo/updateVideoByVideoId.do',
						data: {
							videoid:this.$route.query.vdId,
							videoname: this.form.videoname,
							videourl: this.form.videourl,
							typeid: this.form.typeid,
							picture: this.form.picture,
							timelong: this.form.timelong,
							videonote: this.form.videonote,
							title: this.form.title,
							label: this.form.label
						},
						withCredentials: true,
					}).then((res) => {
						//console.log(res.data.xyuser);
						if (res.data.xyuser == 1) {
							this.$message({
								message: "修改成功！请耐心等待审核",
								type: "success",
								duration: 1000
							});
							this.$router.push({
								name: 'addVideo'
							});
						} else {
							this.$message({
								message: "上传失败！请重试",
								type: "error",
								duration: 1000
							});
							this.$router.push({
								name: 'insertVideo'
							});
						}
					});
				} else {
					this.axios({
						method: 'post',
						url: 'xyvideo/insertData.do',
						data: {
							videoname: this.form.videoname,
							videourl: this.form.videourl,
							typeid: this.form.typeid,
							picture: this.form.picture,
							timelong: this.form.timelong,
							videonote: this.form.videonote,
							title: this.form.title,
							label: this.form.label
						},
						withCredentials: true,
					}).then((res) => {
						//console.log(res.data.xyuser);
						if (res.data.xyuser == 1) {
							this.$message({
								message: "上传成功！请耐心等待审核",
								type: "success",
								duration: 1000
							});
							this.$router.push({
								name: 'addVideo'
							});
						} else {
							this.$message({
								message: "上传失败！请重试",
								type: "error",
								duration: 1000
							});
							this.$router.push({
								name: 'insertVideo'
							});
						}
					});
				}
				

			}

		}
	}
</script>

<style scoped>
	.changehead,
	.avatar {
		border-radius: 5px;
		width: 220px;
		height: 150px;
	}

	.changehead {
		border: 2px dashed #ccc;
	}


	.insertVideo {
		background-color: rgb(244, 245, 247);
		height: 100%;
	}

	.int-cont {
		height: 100%;
		width: 80%;
		margin: 20px auto;
		background-color: #fff;
		border-radius: 20px;
		padding: 20px 150px;
		box-sizing: border-box;
		position: relative;
	}

	.int-cont .im {
		position: absolute;
		width: 300px;
		right: 250px;
		top: 80px;
	}
</style>
