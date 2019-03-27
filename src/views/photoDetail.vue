<template>
	<div class="photoDetail">
		<HeaderNav />
		<div style="margin: 50px auto;width: 80%;">
			<div class="photo" v-show="albumLength == 1">
				<div class="clearfix" style="margin-bottom: 10px;">
					<p style="float: right;">
						<el-dropdown>
							<span class="el-dropdown-link" style="font-size: 12px;color:#ccc;">
								编辑<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<router-link :to="{name:'insertAlbum',query:{albumId:albumId}}">编辑相簿</router-link>
								</el-dropdown-item>
								<el-dropdown-item><span @click="deleteAlbum">删除</span></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</p><br />
				</div>
				<div class="p-title">
					<div>
						<span>{{userAlbum[0].xyalbum.albumname}}</span>
						<span>{{userAlbum[0].time}}</span>
					</div>
					<div style="float: right;">
						<span>浏览：16 </span>
						<span>收藏：0</span>
					</div>
				</div>
				<div class="p-content">
					<div class="p-text">{{albumName}}</div>
					<div class="p-img" v-for="(item,index) of userAlbum" :key="index">
						<img :src="item.url" />
					</div>
				</div>
			</div>
			<div class="photo" v-show="albumLength == 0">
				<div style="text-align: center;height: 500px;padding: 100px;box-sizing: border-box;">
					<img src="../../public/images/kong.png" alt="">
					<p style="color:#ccc;padding-bottom: 20px;">当前相簿还没有相片……</p>
					<router-link :to="{name:'insertAlbum',query:{albumId:albumId,albumName:albumName}}">点此去添加相片</router-link>
				</div>
			</div>
			
			<photoComment :user="user" :albumId="albumId"></photoComment>
			
			<div class="u-fix" v-if="albumLength == 1">
				<div class="u-info">
					<router-link :to="{name:'homepage',query:{userid:userAlbum[0].xyuser.userid}}">
						<img :src="userAlbum[0].xyuserinfo.userphoto"/>
					</router-link>
					<div style="width: 120px;margin: 0 auto;text-align: center;padding-bottom: 20px;">
						<p class="p-text">{{userAlbum[0].xyuser.username}}</p>
						<router-link :to="{name:'contribute',query:{userid:userAlbum[0].xyuser.userid}}"><span>视频</span></router-link>|
						<router-link :to="{name:'channel',query:{userid:userAlbum[0].xyuser.userid}}"><span>相簿</span></router-link>
					</div>
					<div style="width: 180px;margin: 0 auto;text-align: center;">
						<span @click="guanzhu" class="atten" >关注</span>
						<span class="send">发消息</span>
					</div>
				</div>
				<div class="u-like">
					<div>
						<div @click="like" class="qzc"></div>
						<span>求支持(/▽\)</span>
					</div>
					<div>
						<div @click="collect" class="coll"></div>
						<a style="display: block;text-align: center;">收藏</a>
					</div>
				</div>
			</div>


		</div>

		<Footer />
	</div>
</template>

<script>
	import HeaderNav from "@/components/header/HeaderNav1";
	import Footer from "@/components/footer/index";
	import photoComment from "@/components/photoComment/photoComment";
	import store from "@/store.js";
	export default {
		store,
		data() {
			return {
				albumName: '',
				albumId:0,
				albumLength:1,
				userAlbum: [{
					time: '',
					xyalbum:{},
					xyuser:{},
					xyuserinfo:{userphoto:''}
				}],
				user: {
					xyuserinfo: {}
				}
			};
		},
		components: {
			HeaderNav,
			Footer,
			photoComment
		},
		mounted() {
			this.user = store.state.user;
			//console.log(this.user);
			this.getPhoto1();
			
		},
		methods: {
			//获取图片
			getPhoto1() {
				this.albumId = this.$route.query.albumId*1;
				this.axios.get('xyphoto/findByAlbumId.do', {
					params: {
						albumid: this.albumId
					}
				}).then(res => {
					console.log(res.data.xyuser);
					if (res.data.xyuser.length) {
						this.userAlbum = [...res.data.xyuser];
					}else{
						this.albumLength = res.data.xyuser.length;
					}
					//判断是否已关注当前用户
					this.axios.get('xyfriend/findByFriend.do', {
						params: {
							userfriend:this.userAlbum[0].xyuser.userid
						}
					}).then(res1 => {
						//console.log(res1.data.xyuser);
						if(res1.data.xyuser == 1){
							$('.atten').attr('class','att');
							$('.att').html("已关注");
						}
					});
				});
				if(this.user.userid){
					//判断是否已点赞
					this.axios.get('xyalnumclick/findCouByUseridAndVideoId.do', {
						params: {
							albumid: this.albumId
						}
					}).then(res => {
						//console.log(res.data.xyuser);
						if(res.data.xyuser == 1){
							$('.qzc').attr('class','yzc');
						}
					});
					//判断是否已收藏
					this.axios.get('xyalbumcollection/findCouByUseridAndVideoId.do', {
						params: {
							albumid: this.albumId
						}
					}).then(res => {
						//console.log(res.data.xyuser);
						if(res.data.xyuser == 1){
							$('.coll').attr('class','ycoll');
						} 
					});
					
				}
				
			},
			//删除相簿
			deleteAlbum() {
				this.$confirm('此操作将永久删除该相簿, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get('xyalbum/deleteByAlbumid.do',{
						params:{
							albumid:this.albumId
						}
					}).then(res => {
						//console.log(res.data);
						if(res.data.xyuser == 1){
							this.$message({
								type: 'success',
								message: '删除成功!',
								duration:1000
							});
							this.$router.push({name:'channel'});
						}else{
							this.$message({
								type: 'error',
								message: '删除失败!请重试',
								duration:1000
							});
						}
					});
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//点赞
			like(){
				if(this.user.userid){
					this.axios.get("xyalnumclick/updateAddUpById.do",{
						params:{
							albumid:this.albumId
						}
					}).then(res => {
						//console.log(res.data.xyuser);
						if(res.data.xyuser == 0){
							$('.qzc').attr('class','yzc');
							this.$message({
								type: 'success',
								message: '蟹蟹(*^▽^*)!',
								duration:1000
							});
						}else{
							$('.yzc').attr('class','qzc');
							this.$message({
								type: 'success',
								message: '已取消点赞o(╥﹏╥)o!',
								duration:1000
							});
						}
						
					});
				}else{
					this.$message({
						type: 'success',
						message: '请先登录！',
						duration:1000
					});
				}
				
			},
			//收藏
			collect(){
				if(this.user.userid){
					this.axios.get("xyalbumcollection/updateAddUpById.do",{
						params:{
							albumid:this.albumId
						}
					}).then(res => {
						if(res.data.xyuser == 0){
							$('.coll').attr('class','ycoll');
							this.$message({
								type: 'success',
								message: '蟹蟹(*^▽^*)!',
								duration:1000
							});
						}else{
							$('.ycoll').attr('class','coll');
							this.$message({
								type: 'success',
								message: '已取消收藏o(╥﹏╥)o!',
								duration:1000
							});
						}
						
					});
				}else{
					this.$message({
						type: 'success',
						message: '请先登录！',
						duration:1000
					});
				}
			},
			//关注
			guanzhu(){
				if(!this.user.userid){
					this.$message({
						type: 'success',
						message: '请先登录!',
						duration:1000
					});
				}else if(this.user.userid == this.userAlbum[0].xyuser.userid){
					this.$message({
						type: 'success',
						message: '不能关注自己o(╥﹏╥)o!',
						duration:1000
					});
				}else{
					this.axios.get("xyfriend/updateAddUpById.do",{
						params:{
							userfriend:this.userAlbum[0].xyuser.userid
						}
					}).then(res => {
						//console.log(res.data.xyuser);
						if(res.data.xyuser == 0){
							$('.atten').attr('class','att');
							$('.att').html("已关注");
						}else{
							$('.att').attr('class','atten');
							$('.atten').html("关注");
						}
					});
				}
			}
		},
		beforeRouteEnter(to, from, next) {
				
			if (!to.query.albumId) {
				next({
					name: 'indexBody'
				});
			}
			next();
		}
	}
</script>

<style scoped>
	.photoDetail {
		background-color: rgb(244, 245, 247);
		height: 100%;
	}

	.photo {
		height: 100%;
		width: 70%;
		box-sizing: border-box;
		padding: 15px 30px;
		padding-bottom: 50px;
		background-color: #fff;
		border-radius: 10px;
	}

	.p-title {
		padding-bottom: 20px;
		border-bottom: 1px solid #ccc;
	}

	.p-title div {
		display: inline-block;
	}

	.photoDetail span {
		padding: 5px 10px;
		color: #999;
	}
	
	
	.p-content {
		height: 100%;
	}
	
	.p-text {
		margin: 15px 0px;
	}
	
	.p-img img {
		width: 100%;
		margin-bottom: 5px;
	}
	
	.u-fix {
		position: fixed;
		top: 130px;
		right: 210px;
		height: 400px;
		width: 300px;
	}

	.u-info {
		height: 200px;
		border-radius: 20px;
		background-color: #fff;
		margin-bottom: 10px;
		padding: 30px 20px 20px 20px;
		box-sizing: border-box;
	}

	.u-info a {
		display: inline-block;
	}

	/* 用户信息 */
	.u-info img {
		position: absolute;
		top: -40px;
		left: 50%;
		margin-left: -40px;
		width: 80px;
		height: 80px;
		border-radius: 40px;
	}
	
	
	.u-info div:last-child span {
		padding: 5px 20px;
		margin-right: 10px;
		border:1px solid rgb(251,114,153);
		border-radius: 5px;
		color:rgb(251,114,153);
	}
	
	.u-info div:last-child span.atten {
		background-color:rgb(251,114,153);
		color:#fff;
	}
	
	.u-info>div:last-child span.send:hover {
		background-color: rgb(251, 114, 153);
		color: #fff !important;
	}
	
	
	
	/* 点赞关注 */
	.u-like {
		height: 100px;
		border-radius: 20px;
		background-color: #fff;
		padding: 20px 40px;
		box-sizing: border-box;
	}

	.u-like>div {
		display: inline-block;
		width: 50%;
		height: 100%;
	}

	.u-like>div:first-child {
		width: 49%;
		border-right: 1px solid #ccc;
	}


	.u-like>div>div {
		height: 40px;
		background: url(https://s1.hdslb.com/bfs/static/blive/blfe-album-detail/static/assets/svg-sprite.e15d8c310a8b0ec9fc61ec24d605fed4.svg) no-repeat;
		margin-bottom: 10px;
		text-align: center;
	}
	.u-like>div>div.qzc {
		background-position: 20px -1480px;
	}
	.u-like>div>div.coll {
		background-position: 35px -40px;
	}
	
	.u-like>div>div.yzc {
		background-position: 20px -1600px;
	}
	.u-like>div>div.ycoll {
		background-position: 35px -480px;
	}
	
	
	.u-like>div>div:hover.qzc{
		background-position: 20px -1640px;
	}
	.u-like>div>div:hover.coll{
		background-position: 35px -520px;
	}
	
</style>
