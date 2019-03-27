<template>
	<div class="fans">
		<div class="sp-title">
			<h3 style="font-size: 18px;margin: 10px 0px;">全部好友</h3>
		</div>
		<div class="kong" v-show="attention == []">
			<p>你还没有好友哦~~</p>
		</div>
		<div class="gz-list">
			<div v-for="(item,index) of attention.xyuser" :key="index">
				<a @click="getPic(item.userfriend)"><img v-lazy="item.xyuserinfo.userphoto" /></a>
				<div>
					<h3 style="font-size: 16px;margin: 10px 0px;color:#000;">{{item.xyuser.username}}</h3>
					<p>{{item.xyuserinfo.usershow}}</p>
				</div>
				<el-dropdown>
				  <span class="el-dropdown-link">
					已关注<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
					<el-dropdown-item>发消息</el-dropdown-item>
					<el-dropdown-item><span @click="quguan(item.userfriend)">取消关注</span></el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<el-pagination
		  background
		  @current-change="handleCurrentChange"
		  style="text-align: center;display:block;padding-top:30px;"
		  layout="prev, pager, next"
		  :page-size="10"
		  :total="attention.count">
		</el-pagination>
	</div>
</template>

<script>
	import store from "@/store.js";
	export default {
		store,
		data() {
			return {
				attention:{},
				userid:''
			};
		},mounted() {
			if(!this.$route.query.userid){
				this.userid = store.state.user.userid;
			}else{
				this.userid = this.$route.query.userid;
			}
				this.handleCurrentChange(1);
		},
		methods:{
			//关注
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.axios.get("xyfriend/findPageByUserFriends.do",{
					params:{
						userid:this.userid,
						page:val
					}
				}).then(res => {
					//console.log(res.data);
					this.attention = res.data;
				});
			},
			getPic(abId){
				 const { href } = this.$router.resolve({
				  name: "homepage",
				  query: { userid: abId }
				});
				  window.open(href, "_blank");
				/* this.axios.get('xyvideo/addclick.do',{params:{videoid:vdId}}).then(rs =>{
				  window.open(href, "_blank");
				}) */
			},
			quguan(id){
				this.axios.get("xyfriend/updateAddUpById.do",{
					params:{
						userfriend:id
					}
				}).then(res => {
					//console.log(res.data);
					if(res.data.xyuser == 1){
						this.$message({
							type: 'success',
							message: '已取消关注!',
							duration:1000
						});
						this.$router.go(0);
					}
				});
			}
			
		}
	}
</script>

<style scoped>
	.fans {
		background-color: #fff;
		min-height: 370px;
		padding: 30px;
	}
	
	.fans /deep/.el-tabs__item.is-left {
		padding: 0px 80px 0px 50px;
		text-align: left;
	}
	
	.fans /deep/.el-tabs__item:hover {
		color:rgb(0,161,214);
		background-color: rgb(244,245,247);
	}
	
	.fans /deep/.el-tabs__item:focus {
		color:#fff;
		background-color: #409EFF;
	}
	
	.fans /deep/.el-tabs__content {
		padding: 20px;
	}
	
	.sp-title {
		border-bottom: 1px solid #ccc;
	}
	
	.kong {
		height: 400px;
		margin-top:20px;
		background: url(../../../public/images/kong.png) no-repeat center center;
		position: relative;
	}
	
	.kong p {
		position: absolute;
		left: 420px;
		bottom: 70px;
		z-index: 0;
	}
	
	.gz-list>div {
		padding: 15px 0px;
		border-bottom:1px solid #ccc;
		color:#999;
	}
	
	.gz-list>div a,.gz-list>div img {
		vertical-align: top;
		display: inline-block;
		height: 60px;
		width: 60px;
		border-radius: 30px;
		margin-right: 30px;
	}
	
	.gz-list>div>div {
		display: inline-block;
	}
	
	.fans /deep/.el-dropdown {
		float: right;
		margin: 20px 10px;
		font-size: 12px;
		padding: 5px 7px;
		border-radius: 5px;
		background-color: rgb(229,233,239);
	}
</style>
