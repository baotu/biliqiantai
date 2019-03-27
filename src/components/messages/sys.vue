<template>
	<div class="">
		<div class="box_hader">
			<span style="display: block; padding: 14px; font-size: 13px;">系統消息</span>
		</div>

		<div class="messages" v-for="(meas,index) in mea" :key="index">
			<div>
				<span>{{meas.title}}</span>
				<span>{{meas.time}}</span>
			</div>
			<div>
				{{meas.text}}
			</div>
		</div>





	</div>

</template>

<script>
	export default {
		/*http://111.230.247.223/SameBWeb/xysysteminfo/findAll.do*/
		data() {
			return {
				mea: []
			};
		},
		mounted() {
			this.axios('xysysteminfo/findAll.do').then(rs => {
				//console.log(rs.data.xyuser);
				this.mea = rs.data.xyuser;

			});
		}



	}
</script>
<style scoped>
	.box_hader {
		box-shadow: 0 2px 4px 0 rgba(121, 146, 185, .54);
		border-radius: 4px;
		height: 42px;
		background: #FFFFFF;
		float: left;
		margin-left: 10px;
		width: 98%;
		margin-top: 5px;
	}

	.messages {
		margin-top: 10px;
		box-shadow: 0 2px 4px 0 rgba(121, 146, 185, .54);
		border-radius: 4px;
		background: #FFFFFF;
		float: left;
		width: 98%;
		height: 100%;
		margin-left: 10px;
		z-index: 10;
	}

	.messages div:nth-child(1) {
		width: 97%;
		margin: 0 auto;
		margin-top: 20px;
	}

	.messages div:nth-child(2) {
		width: 90%;
		margin-left: 20px;
		margin-top: 5px;
		margin-bottom: 20px;
		line-height: 20px;
	}

	.messages div:nth-child(1) span:nth-child(1) {
		color: #333;
		font-weight: 700;
	}

	.messages div:nth-child(1) span:nth-child(2) {
		font-weight: 700;
		margin: 0 20px;
		color: #999;
		font-size: 12px;
		line-height: 22px;
	}
</style>
