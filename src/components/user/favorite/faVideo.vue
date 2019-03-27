<template>
	<div class="faVideo">
		<div class="sp-title">
			<h3 style="font-size: 18px;margin-top: 15px;">影视收藏夹</h3>
			<p style="margin: 15px 0px;color:#999">{{collVideo.count}}个影视</p>
		</div>
		<div class="kong" v-if="!collVideo.count">
			<p>你暂时还没有收藏影视内容哦~~</p>
		</div>
		<div class="video-list">
			<a @click="getPic(item.videoid)" class="pd-item" v-for="(item,index) of collVideo.xyuser" :key="index">
				<img v-lazy="item.xyvideo.picture" />
				<div></div>
				<h3 style="margin: 10px 0px;">{{item.xyvideo.videoname}}</h3>
				<p style="color:#999">收藏于:{{item.xyvideo.time}}</p>
			</a>
			<el-pagination
			  background
			  v-if = "collVideo.count"
			  @current-change="handleCurrentChange"
			  style="text-align: center;display:block;padding-top:30px;"
			  layout="prev, pager, next"
			  :page-size="20"
			  :total="collVideo.count">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import store from "@/store.js";
	export default {
		store,
		data() {
			return {
				collVideo:{},
				userid:''
			};
		},
		mounted() {
			if(!this.$route.query.userid){
				this.userid = store.state.user.userid;
			}else{
				this.userid = this.$route.query.userid;
			}
			this.handleCurrentChange(1);
		},
		methods:{
			//收藏的视频
			handleCurrentChange(val) {
				////console.log(`当前页: ${val}`);
				this.axios.get("xycollection/findPageCByUserid.do",{
					params:{
						userid:this.userid,
						page:val
					}
				}).then(res => {
					//console.log(res.data);
					this.collVideo = res.data;
				});
			},
			getPic(vdId){
				 const { href } = this.$router.resolve({
				  name: "play",
				  query: { vdId: vdId }
				});
				this.axios.get('xyvideo/addclick.do',{params:{videoid:vdId}}).then(rs =>{
				  window.open(href, "_blank");
				})
			}
		}
	}
</script>

<style scoped>
	
	.sp-title {
		border-bottom: 1px solid #ccc;
	}
	
	.kong {
		height: 400px;
		margin-top:20px;
		background: url(../../../../public/images/kong.png) no-repeat center center;
		position: relative;
	}
	
	.kong p {
		position: absolute;
		left: 420px;
		bottom: 70px;
		z-index: 0;
	}
	
	.video-list {
		padding: 20px 0px;
	}
	
	.pd-item {
		display: inline-block;
		height: 210px;
		width: 220px;
		margin: 0px 10px;
		border-radius: 5px;
		vertical-align: top;
		position: relative;
	}
	
	.pd-item img {
		height: 150px;
		width: 220px;
		border-radius: 5px;
	}
</style>
