<template>
	<div class="insertAlbum">
		<HeaderNav></HeaderNav>
		<div class="int-cont">
			<h3 style="font-size: 24px;padding: 5px 10px;margin-bottom: 20px;"><span v-show="!albumId">新建</span><span v-show="albumId">修改</span>相簿</h3>
			<el-form label-width="80px" :model="form">
				<el-form-item label="上传图片">
					<el-upload v-model="form.files" name="filename" class="upload-demo" drag action="http://111.230.247.223/SameBWeb/xyalbum/fileuploads.do"
					 multiple :show-file-list="true" :on-success="handleAvatarSuccess">
						<!-- :auto-upload="false"  手动上传-->
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><span v-show="albumId">(追加图片)</span></div>
						<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
					<div style="width: 60%;" class="ii">
						<img class="ig" v-for="(item,index) of form.files" @click="deletePhoto(photoIds[index])" :key="photoIds[index]"
						 style="width: 220px;height: 150px;margin: 10px;" :src="item">
					</div>
				</el-form-item>
				<el-form-item label="作品标题">
					<el-input v-model="form.title" style="width:30%" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">提交发布</el-button>
				</el-form-item>
			</el-form>
			<img class="im" src="https://s1.hdslb.com/bfs/static/jinkela/studio/creativecenter-v3/assets/album-draw.e18457f.png"
			 alt="">
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import HeaderNav from "@/components/header/HeaderNav1";
	import Footer from "@/components/footer/index";
	import store from "@/store.js";
	export default {
		components: {
			HeaderNav,
			Footer
		},
		store,
		data() {
			return {
				photoUploadPercent: '0%',
				photoFlag: false,
				photoIds: [],
				albumId: '',
				form: {
					files: [],
					title: ''
				}
			};
		},
		mounted() {
			if (this.$route.query.albumId) {
				this.albumId = this.$route.query.albumId;
				this.getPhoto();
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				//文件成功之后赋值
				this.form.files.push(res.xyuser);
				//console.log(this.form.files);
				this.photoFlag = false;
			},
			getPhoto(){
				this.axios.get('xyphoto/findByAlbumId.do', {
					params: {
						albumid: this.$route.query.albumId
					}
				}).then(res => {
					//console.log(res.data.xyuser);
					for (let i = 0; i < res.data.xyuser.length; i++) {
						this.form.files.push(res.data.xyuser[i].url);
						this.photoIds.push(res.data.xyuser[i].photoid);
					}
					this.form.title = res.data.xyuser[0].xyalbum.albumname;
				});
			},
			deletePhoto(id) {
				//console.log(id);
				this.$confirm('是否要将这张相片从本相簿删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("xyphoto/deleteById.do", {
						params: {
							photoid: id
						}
					}).then(res => {
						$('.ii').html('');
						this.getPhoto();
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			onSubmit() {
				//console.log(store.state.user);
				let arrs = this.form.files.join(',');
				
				//修改
				if (this.$route.query.albumId) {
					//新增相片
					this.axios.get("xyphoto/insertByAlbumid.do",{
						params:{
							albumid:this.albumId,
							url:arrs
						}
					}).then(res => {
						//更改相册名
						this.axios.get("xyalbum/updateById.do",{
							params:{
								albumid:this.albumId,
								albumname:this.form.title
							}
						}).then(rs => {
							if (rs.data.xyuser == 1) {
								this.$message({
									message: "修改成功！",
									type: "success",
									duration: 1000
								});
								this.$router.push({
									name: 'channel'
								});
							} else {
								this.$message({
									message: "修改失败！请重试",
									type: "error",
									duration: 1000
								});
								this.$router.push({
									name: 'insertAlbum'
								});
							}
						});
					});
					
					
					
				}else{
					//新增
					this.axios.get("xyalbum/insertById.do", {
						params: {
							albumname: this.form.title,
							files: arrs
						}
					}).then(res => {
						//console.log(res.data);
						if (res.data.xyuser == 1) {
							this.$message({
								message: "创建成功！",
								type: "success",
								duration: 1000
							});
							this.$router.push({
								name: 'channel'
							});
						} else {
							this.$message({
								message: "创建失败！请重试",
								type: "error",
								duration: 1000
							});
							this.$router.push({
								name: 'insertAlbum'
							});
						}
					});
				}
			}
		}
	}
</script>

<style scoped>
	.insertAlbum {
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
		right: 250px;
		top: 30px;
	}

	.ig:hover {
		border: 1px solid rgb(251, 114, 153);
	}
</style>
