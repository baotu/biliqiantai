<template>
	<div class="photoComment">
		<div class="commentAll" style="margin-top: 20px;">
			<p style="color:rgb(0,131,231);border-bottom: 1px solid #ccc;padding: 5px 10px;font-weight: 800;">全部评论</p>
			<div class="comment-list">
				<div class="comment" v-if="user.userid">
					<div class="c-left" >
						<img :src="user.xyuserinfo.userphoto" />
					</div>
					<div class="c-right">
						<el-input 
						  type="textarea"
						  :autosize="{ minRows: 3, maxRows: 3}"
						  placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
						  v-model="textarea">
						</el-input>
						<el-button type="primary" style="line-height: 20px;" @click="addComment" >发表<br>评论</el-button>
					</div>
				</div>
				<div class="comment" v-show="!user.userid">
					<div class="c-left" >
						<img src="http://cdn.hwzhj.top/img/default.gif" />
					</div>
					<div class="c-right">
						<p class="p-text">请先
							<router-link :to="{name:'login'}">登录</router-link>
						再评论</p>
						<el-input 
						  type="textarea"
						  disabled
						  :autosize="{ minRows: 3, maxRows: 3}"
						  placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
						  v-model="textarea">
						</el-input>
						<el-button type="primary" disabled style="line-height: 20px;" >发表<br>评论</el-button>
					</div>
				</div>
				<div class="comment" v-for="(item,index) of pComment.xyuser" :key="index">
					<div class="c-left" >
						<img :src="item.xyuserinfo.userphoto" />
					</div>
					<div class="c-right" >
						<p>{{item.xyuser.username}}</p>
						<p class="p-text">{{item.content}}</p>
						<div>
							<span>{{item.time}}</span>
							<!-- <span></span>
							<span></span>
							<span>回复</span> -->
						</div>
						<span style="float: right;" v-if="item.xyuser.username == user.username " @click="deleteComment(item.commentid)" >删除</span>
					</div>
				</div>
				<el-pagination 
				  v-show="pComment.count"
				  background
				  @current-change="handleCurrentChange"
				  style="text-align: center;display:block;padding-top:30px;"
				  layout="prev, pager, next"
				  :page-size="5"
				  :total="pComment.count">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				textarea:'',
				pComment:{xyuser:{},xyuserinfo:{}}
			};
		},
		props:{
			user:Object,
			albumId:Number
		},
		computed:{
			ValbumId(){
				return this.albumId;
			}
		},
		watch:{
			ValbumId(newval,oldval){
				this.handleCurrentChange(1);
			}
		},
		mounted() {
			////console.log(this.albumId);
			this.handleCurrentChange(1);
		},
		methods:{
			//新增评论
			addComment(){
				////console.log(this.ValbumId);
				this.axios.post("xypgotocomment/insetByUserIdAndPhotoId.do",{
					photoid:this.ValbumId,
					content:this.textarea
				}).then(res => {
					if(res.data.xyuser){
						this.textarea='';
						this.handleCurrentChange(1);
					}
					//this.$router.go(0);
				});
			},
			//查询评论
			handleCurrentChange(val) {
				////console.log(`当前页: ${val}`);
				this.axios.get("xypgotocomment/findPageByPhotoId.do",{
					params:{
						photoid:this.ValbumId,
						page:val
					}
				}).then(res => {
					//console.log(res.data);
					this.pComment = res.data;
				});
			},
			//删除评论
			deleteComment(id){
				this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get('xypgotocomment/deleteByCommentId.do',{
						params:{
							commentid:id
						}
					}).then(res => {
						////console.log(res.data);
						if(res.data.xyuser == 1){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.handleCurrentChange(1);
						}else{
							this.$message({
								type: 'error',
								message: '删除失败!请重试'
							});
						}
					});
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>

<style scoped>
	.commentAll {
		height: 100%;
		width: 70%;
		box-sizing: border-box;
		padding: 15px 30px;
		padding-bottom: 50px;
		background-color: #fff;
		border-radius: 10px;
	}
	
	.comment span:nth-child(2),
	.comment span:nth-child(3) {
		background: url(../../../public/images/icons-comment.png) no-repeat -150px -20px;
		display: inline-block;
		padding-left: 20px;
		height: 10px;
		vertical-align: middle;
	}
	
	.comment span:nth-child(2) {
		background: url(../../../public/images/icons-comment.png) no-repeat -150px -22px;
	}
	
	.comment span:nth-child(3) {
		background: url(../../../public/images/icons-comment.png) no-repeat -150px -150px;
	}
	
	.comment span:nth-child(2):hover {
		background: url(../../../public/images/icons-comment.png) no-repeat -215px -22px;
	}
	
	.comment span:nth-child(3):hover {
		background: url(../../../public/images/icons-comment.png) no-repeat -214px -150px;
	}
	
	.comment {
		padding: 30px 0px;
		border-bottom: 1px solid #ccc;
	}
	
	.comment div {
		display: inline-block;
	}
	
	a {
		display: inline-block;
		color: blue;
	}
	
	.p-text {
		margin: 15px 0px;
	}
	
	.comment .c-left {
		width: 10%;
		vertical-align: top;
	}
	
	.comment .c-left img {
		width: 60px;
		height: 60px;
		border-radius: 30px;
	}
	
	.comment .c-right {
		width: 90%;
	}
	
	.commentAll /deep/.c-right .el-textarea {
		width: 85%;
		display: inline-block;
		margin-right: 20px;
		border-radius: 10px;
	}
	
	.commentAll /deep/.c-right .el-textarea__inner {
		font-size: 12px;
		border: 1px solid #fff;
		background-color: rgb(244, 245, 247);
		box-sizing: border-box;
	}
	
	.commentAll /deep/.c-right .el-textarea__inner:hover {
		border: 1px solid rgb(102, 177, 255);
		background-color: #fff;
	}
	span {
		padding: 5px 10px;
		color: #999;
	}
	
</style>
