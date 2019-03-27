<template>

	<div class="subscribe_home">

		<el-tabs :tab-position="top" style="height: 100%;">
			<el-tab-pane label="番剧">
				<div class="subscribe">
					<img src="images/cont/banner-list__img4.jpg">
					<div class="subscribe_s">

						<a href="#">樱花庄的宠物女孩</a>
						<p>神秘瑰丽的妖灵世界，奇奥无穷的时空妖灵之书，聂离追寻着世界的真相。美丽温柔的叶紫芸、倔强高傲的肖凝儿...</p>
					</div>

				</div>
				<div class="subscribe">
					<img src="images/cont/banner-list__img4.jpg">
					<div class="subscribe_s">

						<a href="#">樱花庄的宠物女孩</a>
						<p>神秘瑰丽的妖灵世界，奇奥无穷的时空妖灵之书，聂离追寻着世界的真相。美丽温柔的叶紫芸、倔强高傲的肖凝儿...</p>
					</div>

				</div>
				<div class="subscribe">
					<img src="images/cont/banner-list__img4.jpg">
					<div class="subscribe_s">

						<a href="#">樱花庄的宠物女孩</a>
						<p>神秘瑰丽的妖灵世界，奇奥无穷的时空妖灵之书，聂离追寻着世界的真相。美丽温柔的叶紫芸、倔强高傲的肖凝儿...</p>
					</div>
				</div>
				<div class="subscribe">
					<img src="images/cont/banner-list__img4.jpg">
					<div class="subscribe_s">

						<a href="#">樱花庄的宠物女孩</a>
						<p>神秘瑰丽的妖灵世界，奇奥无穷的时空妖灵之书，聂离追寻着世界的真相。美丽温柔的叶紫芸、倔强高傲的肖凝儿...</p>
					</div>

				</div>

			</el-tab-pane>
			<el-tab-pane label="标签">
				<div style="width: 100%;">
					<div class="label_tags">
						暴走大事件
					</div>
					<div class="label_tags">
						暴走大事件
					</div>
					<div class="label_tags">
						暴走大事件
					</div>
					<div class="label_tags">
						暴走大事件
					</div>
					<div class="label_tags">
						暴走大事件
					</div>

				</div>
			</el-tab-pane>
		</el-tabs>


	</div>
</template>

<script>
	export default {

	};
</script>

<style scoped>
	.subscribe_home {
		width: 100%;
		background-color: rgb(255, 255, 255);
	}

	/*订阅番剧*/
	.subscribe {
		width: 33%;
		margin: 10px 0;
		height: 144px;
		float: left;
	}

	.subscribe img {
		border-radius: 6px;
		width: 110px;
		height: 144px;
	}


	.subscribe_s {
		width: 290px;
		float: right;
	}

	.subscribe_s a {
		color: rgb(111, 111, 111);
		font-size: 20px;
	}

	.subscribe_s a:hover {
		color: rgb(128, 128, 245);
		font-size: 20px;
	}

	.subscribe_s p {
		margin-top: 20px;
		margin-right: 10px;
		line-height: 18px;
		font-size: 13px;
		max-height: 60px;
		overflow: hidden;
	}


	.label_tags {
		border: 1px solid darkcyan;
		width: 18%;
		height: 40px;
		float: left;
		margin: 17px 22px;
	}

	.subscribe_home /deep/.el-tabs__content {
		padding: 10px;
	}

	.subscribe_home /deep/.el-tabs__nav {
		padding: 0px 10px;
	}

	.subscribe_home /deep/.el-tabs__active-bar {
		width: 40px !important;
	}
</style>
