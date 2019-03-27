<template>
	<div class="favorite">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="padding-left: 40%;">
			<el-menu-item index="1">
				<router-link :to="{name:'faVideo',query:{userid:userid}}">视频收藏夹</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link :to="{name:'faAlbum',query:{userid:userid}}">相簿收藏夹</router-link>
			</el-menu-item>
		</el-menu>
		<router-view  />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				userid:this.$route.query.userid
			};
		}
	}
</script>

<style scoped>
	.favorite {
		background-color: #fff;
		padding: 30px;
		padding-top: 0px;
		min-height: 450px;
	}
	
	.el-menu-demo>.el-menu-item {
		padding: 5px 20px;
	}
	
	
	/* .pd-item>div {
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
	} */
</style>
