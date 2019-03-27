<template>
	<div class="message">
		<HeaderNav />
		<div class="message_box">
			<div class="message_nav">
				<div>消息中心</div>
				<ul>
					<li>
						<router-link :to="{name:'sys'}">系统消息</router-link>
					</li>
					<li>
						<router-link :to="{name:'mym'}">收到的消息</router-link>
					</li>
					<li>
						<router-link :to="{name:'mym'}">回复我的</router-link>
					</li>
				</ul>
			</div>
			<div class="box_hader">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNav from "@/components/header/HeaderNav1";
	export default {
		components: {
			HeaderNav
		}
	}
</script>
<style scoped>
	.message {
		background: url(http://cdn.hwzhj.top/infocenterbg.a1a0d15.jpg) top/cover no-repeat fixed;
		height: 100%;
		color: #666;
		height: 100vh;
	}

	.message_box {
		box-shadow: 0 2px 4px 0 rgba(121, 146, 185, .54);
		border-radius: 8px;
		overflow: hidden;
		background: #FFFFFF;
		background: rgba(255, 255, 255, 0.5);
		margin: 0 auto;
		width: 75%;
		height: 100ex;
		margin-top: 30px;
	}

	.message_nav {
		width: 13%;
		height: 100%;
		float: left;
		background: rgba(255, 255, 255, 0.5);
	}

	.message_nav ul li {
		line-height: 50px;
		padding: 0 0 0 35px;
		font-size: 17px;
		font-weight: 600;
	}

	.box_hader {
		float: left;
		width: 87%;
		height: 100%;
	 	 overflow-y: scroll;
		SCROLLBAR-FACE-COLOR: #205e17;
		SCROLLBAR-SHADOW-COLOR: #86ff92;
		SCROLLBAR-SHADOW-COLOR: #86ff92;
		SCROLLBAR-3DLIGHT-COLOR: #205e17;
		SCROLLBAR-TRACK-COLOR: #205e17;
		SCROLLBAR-DARKSHADOW-COLOR: #205e17;
		SCROLLBAR-BASE-COLOR: #205e17;
		SCROLLBAR-ARROW-COLOR: #86ff92;
	}
	
	 .message_nav div {
		font-size: 20px;
		padding: 20px;
	}
</style>
