<template>
	<div class="faAlbum">
		<div class="sp-title">
			<h3 style="font-size: 18px;margin-top: 15px;">相簿收藏夹</h3>
			<p style="margin: 15px 0px;color:#999">{{collAlbum.count}}个相簿</p>
		</div>
		<div class="kong" v-if="!collAlbum.count">
			<p>你暂时还没有收藏相簿内容哦~~</p>
		</div>
		<div class="video-list">
			<a @click="getPic(item.albumid)" class="pd-item" v-for="(item,index) of collAlbum.xyuser" :key="index">
				<img v-lazy="item.xyalbum.photo" />
				<div></div>
				<h3 style="margin: 10px 0px;">{{item.xyalbum.albumname}}</h3>
				<p style="color:#999">收藏于:{{item.xyalbum.time}}</p>
			</a>
			<el-pagination
			  background
			  v-if = "collAlbum.count"
			  @current-change="handleCurrentChange"
			  style="text-align: center;display:block;padding-top:30px;"
			  layout="prev, pager, next"
			  :page-size="10"
			  :total="collAlbum.count">
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
				collAlbum:{},
				userid:''
			};
		},mounted() {
			if(!this.$route.query.userid){
				this.userid = store.state.user.userid;
			}else{
				this.userid = this.$route.query.userid;
			}
			this.handleCurrentChange(1);
		},methods:{
			handleCurrentChange(val) {
				////console.log(`当前页: ${val}`);
				this.axios.get("xyalbumcollection/findPageAlbumByUserId.do",{
					params:{
						userid:this.userid,
						page:val
					}
				}).then(res => {
					//console.log(res.data);
					this.collAlbum = res.data;
				});
			},
			getPic(abId){
				 const { href } = this.$router.resolve({
				  name: "photoDetail",
				  query: { albumId: abId }
				});
				  window.open(href, "_blank");
				/* this.axios.get('xyvideo/addclick.do',{params:{videoid:vdId}}).then(rs =>{
				  window.open(href, "_blank");
				}) */
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
