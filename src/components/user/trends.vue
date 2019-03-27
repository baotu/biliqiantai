<template>
	<div class="trends">
		<div class="t-left">
			<div class="dt">
				<a><img src="images/app-qrcode.png" /></a>
				<div class="t-cont">
					<h3>asdfkj</h3>
					<p>时间</p>
					<div>
						<div>内容</div>
						<div><img src="images/app-qrcode.png" /></div>
					</div>
					<div>
						<a>转发</a>
						<a>评论</a>
						<a>点赞</a>
					</div>
				</div>
			</div>
		</div>
		<div class="t-right">
			<div class="u-if">
				<div class="inf">
					<div>uid:191045634</div>
					<div>生日：09-22</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	
	.t-left,.t-right {
		display: inline-block;
	}
	
	.t-left {
		width: 70%;
	}
	
	.t-right {
		width: 29%;
		float: right;
	}
	
	.dt {
		padding: 20px 100px 10px 20px;
		position: relative;
		height: 100%;
		background-color: #fff;
		margin-bottom: 30px;
	}
	
	.dt>a {
		position: absolute;
		top:20px;
		left: 20px;
	}
	
	.dt a img {
		border-radius: 20px;
		width: 40px;
		height: 40px;
	}
	
	.dt .t-cont {
		margin-left: 70px;
		height: 100%;
	}
	
	.t-cont h3 {
		margin-bottom: 15px;
		font-size: 18px;
	}
	
	.t-cont p {
		color:#999;
		margin-bottom: 15px;
	}
	
	.t-cont div {
		margin-bottom: 15px;
	}
	
	.t-cont>div:last-child a{
		display: inline-block;
		padding: 5px 50px 0px 0px;
	}
	.t-cont img {
		width: 215px;
		height: 215px;
		border-radius: 5px;
	}
	
	.u-if {
		background-color: #fff;
		height: 100%;
		padding: 18px 20px;
	}
	
	.u-if .inf {
		padding: 18px 18px;
	}
	
	.inf div {
		display: inline-block;
		padding-right: 70px;
	}
	
</style>
