<template>
	<div class="create">
		<HeaderNav></HeaderNav>
		<div class="crt">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="padding-left: 42%;">
				<el-menu-item index="1">
					<router-link :to="{name:'addVideo'}">视频投稿</router-link>
				</el-menu-item>
				<el-menu-item index="2">
					<router-link :to="{name:'addAlbum'}">相簿投稿</router-link>
				</el-menu-item>
			</el-menu>
			<div style="height: 100%;">
				<router-view />
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import HeaderNav from "@/components/header/HeaderNav1";
	import Footer from "@/components/footer/index";
	
	export default {
		data() {
			return {
				activeIndex:'1'
			};
		},
		components:{
			HeaderNav,
			Footer
		}
	}
</script>

<style scoped>
	.crt {
		width: 80%;
		margin: 5px auto;
	}
</style>
