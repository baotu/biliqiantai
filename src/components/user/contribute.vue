<template>
	<div class="contribute">
		<div class="sp-title">
			<h3 style="font-size: 18px">我的视频</h3>
			<div class="sp-sort">
				<a>最新发布</a>
				<a>最多播放</a>
				<a>最多收藏</a>
			</div>
			<router-link style="margin-left: 10px;display: inline-block;" v-show="!uif" :to="{name:'addVideo'}">添加视频</router-link>
		</div>
		<div class="kong" v-show="userVideo == ''">
			<span>空间主人还没有投过视频哦~~</span>
		</div>
		<div class="sp-list"  v-show=" userVideo != ''">
			<div v-for="item of userVideo.xyuser" :key="item.videoid">
				<img v-lazy="item.picture" @click="govideo(item.videoid)"/>
				<div class="bj"  v-show="!uif" >
					<a href="#" @click="govideo(item.videoid)">观看</a> |
					<a href="#" @click="editVideo(item.videoid)">编辑</a>
				</div>
				<p style="overflow: hidden;text-overflow:ellipsis;word-break:keep-all;white-space:nowrap;">{{item.title}}</p>
				<span><img src="../../../public/images/yanjing.svg" /> {{item.click}}</span>
				<span>3</span>
			</div>
			<el-pagination
			  background
			  @current-change="handleCurrentChange"
			  style="text-align:center;display:block;margin:0px auto;padding-top:30px;"
			  layout="prev, pager, next"
			  :page-size="10"
			  :total="userVideo.count">
			</el-pagination>
		</div>
		
	</div>
</template>

<script>
	import store from "@/store.js"
	export default {
		store,
		data() {
			return {
				uid:'',
				userVideo:'',
				uif:this.$route.query.userid
			};
		},
		mounted() {
			//console.log(this.uif);
			if(this.$route.query.userid == store.state.user.userid){
				this.uif = '';
			}
			if(this.uif){
				this.uid = this.uif;
				this.handleCurrentChange(1);
			}else{
				this.uid = store.state.user.userid;
				this.handleCurrentChange(1);
			}
			
		},
		methods:{
			govideo(vdId) {
			  const { href } = this.$router.resolve({
			    name: "play",
			    query: { vdId: vdId }
			  });
			  this.axios.get('xyvideo/addclick.do',{params:{videoid:vdId}}).then(rs =>{
			    window.open(href, "_blank");
			  })
			},
			editVideo(vdId) {
			  const { href } = this.$router.resolve({
			    name: "insertVideo",
			    query: { vdId: vdId }
			  });
			  window.open(href, "_blank");
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.axios.get('xyvideo/findPageByUserId.do',{
					params:{
						userid:this.uid,
						page:val
					}
				}).then(res => {
					//console.log(res.data);
					if(res.data.count){
						this.userVideo = res.data;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.contribute {
		background-color: #fff;
		padding: 30px;
		min-height: 370px;
	}
	
	.contribute /deep/.el-tabs__item {
	}
	
	.contribute /deep/.el-tabs__item:hover {
		color:rgb(0,161,214);
		background-color: rgb(244,245,247);
	}
	
	.contribute /deep/.el-tabs__item:focus {
		color:#fff;
		background-color: #409EFF;
	}

	.contribute /deep/.el-tabs__content {
		padding: 30px;
	}
	
	.sp-title h3 {
		display: inline-block;
	}
	
	.sp-sort {
		float: right;
	}
	
	.sp-sort a {
		display: inline-block;
		padding: 5px 10px;
		font-size: 14px;
	}
	
	.kong {
		height: 400px;
		margin-top:20px;
		background: url(../../../public/images/kong.png) no-repeat center center;
		position: relative;
	}
	
	.kong span {
		position: absolute;
		left: 50%;
		margin-left: -80px;
		bottom: 70px;
	}
	
	.sp-list {
		padding:20px 0px;
	}
	
	.sp-list>div {
		display: inline-block;
		width: 220px;
		margin: 0px 10px;
		position: relative;
	}
	
	.sp-list>div:hover .bj {
		display: block;
		background-color: rgba(0,0,0,.4);
	}
	
	.sp-list div>img {
		width: 220px;
		height: 160px;
		border-radius: 5px;
		margin-bottom: 10px;
	}
	
	.sp-list .bj {
		position: absolute;
		width: 220px;
		height: 160px;
		border-radius: 5px;
		top: 0;
		display: none;
		color: #ccc;
		font-size: 16px;
	}
	
	.bj a {
		display: inline-block;
		line-height: 160px;
		width: 100px;
		text-align: center;
		color: #ccc;
	}
	
	.sp-list div span {
		display: inline-block;
		margin-top: 10px;
		margin-right: 20px;
		height: 20px;
	}
	
	.sp-list div span:last-child {
		padding-left: 20px;
		background: url(../../../public/images/icons-comment.png) -150px -25px;
	}
	
	.xbclass {
		margin: 20px 0px 10px 0px;
		padding: 10px 20px;
		background-color: rgb(237,242,250);
	}
	
	.pd-item {
		display: inline-block;
		height: 180px;
		width: 200px;
		margin: 0px 10px;
		border-radius: 5px;
		vertical-align: top;
		position: relative;
		border:1px solid red;
	}
	
	.pd-item img {
		height: 130px;
		width: 200px;
		border-radius: 5px;
	}
	
	.pd-item>div {
		position: absolute;
		width: 80px;
		height: 130px;
		border-radius: 5px;
		background-color: rgba(0,0,0,.6);
		right: 0;
		color:#fff;
		display: inline-block;
		text-align: center;
		padding-top:40px ;
		box-sizing: border-box;
	}
	
	.tj {
		padding: 0px;
		padding-bottom: 50px;
		vertical-align: top;
	}
	
	
	.contribute /deep/ .el-dialog {
		width: 40%;
	}
	
	.xj {
		display: inline-block;
		height: 150px;
		width: 220px;
		margin: 0px 10px;
		border-radius: 5px;
		border: 2px dashed #b8c0cc;
		text-align: center;
		padding-top: 35px;
		box-sizing: border-box;
		color: #b8c0cc;
	}
	
	.xj:hover {
		color: rgb(0, 163, 219);
		border: 2px dashed rgb(0, 163, 219);
	}
	
	.xj>p:first-child {
		font-size: 42px;
	}
	
</style>
