<template>
	<div class="channel">
		<h3 style="display: inline-block;">我的相簿</h3>
		<router-link style="margin-left: 10px;display: inline-block;" v-show="!uif" :to="{name:'addAlbum'}">新建相簿</router-link>
		<div class="kong" v-show="userAlbum == ''">
			<span>空间主人还没有投过相簿哦~~</span>
		</div>
		<div class="pd" v-show="userAlbum != ''">
			<a @click="getPic(item.albumid)" class="pd-item" v-for="item of userAlbum.xyuser" :key="item.albumid">
				<img v-lazy="item.photo" alt />
				<div></div>
				<h3 style="margin: 10px 0px;">{{item.albumname}}</h3>
				<p style="color:#999">{{item.time}}</p>
			</a>
			<el-pagination
			  background
			  @current-change="handleCurrentChange"
			  style="text-align: center;display:block;padding-top:30px;"
			  layout="prev, pager, next"
			  :page-size="10"
			  :total="userAlbum.count">
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
				userAlbum:'',
				dialogFormVisible: false,
				uif:this.$route.query.userid
			};
		},
		mounted() {
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
			//console.log(store.state.user);
		},
		methods: {
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.axios.get('xyalbum/findPageByUserId.do',{
					params:{
						userid:this.uid,
						page:val
					}
				}).then(res => {
					//console.log(res.data);
					if(res.data.count){
						this.userAlbum = res.data;
					}
				});
			},
			getPic(albumId){
				const { href } = this.$router.resolve({
				  name: "photoDetail",
				  query: { albumId:albumId}
				});
				window.open(href, "_blank");
			}
		}
	}
</script>

<style scoped>
	.channel {
		background-color: #fff;
		height: 100%;
		min-height: 370px;
		padding: 30px;
	}
	
	.channel>h3 {
		padding: 10px 0px;
		font-size: 18px;
		
	}
	
	.pd {
		padding-top: 20px;
		height: 100%;
	}
	
	.pd .pd-item {
		display: inline-block;
		height: 210px;
		width: 220px;
		margin: 0px 10px;
		border-radius: 5px;
		vertical-align: top;
		position: relative;
	}
	
	.pd .pd-item img {
		height: 150px;
		width: 220px;
		border-radius: 5px;
	}
	
	.pd .pd-item>div {
		position: absolute;
		width: 90px;
		height: 150px;
		border-radius: 5px;
		background-color: rgba(0,0,0,.6);
		right: 0;
		color:#fff;
		display: inline-block;
		text-align: center;
		padding-top:40px ;
		box-sizing: border-box;
	}
	
	
	.xj {
		display: inline-block;
		height: 130px;
		width: 200px;
		margin: 0px 10px;
		border-radius: 5px;
		border:2px dashed #b8c0cc;
		text-align: center;
		padding-top: 35px;
		box-sizing: border-box;
		color:#b8c0cc;
	}
	
	.xj:hover {
		color:rgb(0,163,219);
		border:2px dashed rgb(0,163,219);
	}
	
	.xj>span:first-child {
		font-size: 36px;
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
</style>
