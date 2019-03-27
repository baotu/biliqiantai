<template>
	<div class="homepage clearfix">
		<div class="left_one">

			<!-- 添加视频 -->
			<div style="font-size: 20px; margin: 20px; ">我的视频 <router-link class= "gd"
				 :to="{name:'contribute',query:{userid:userid}}">更多</router-link>
			</div>
			<div>
				<div style="background:url(/images/kong.png) center no-repeat; height:300px;" v-if="vido.length==0"></div>
				<div class="sp-list" v-show="true" v-for="(vid,index) in vido" :key="index">
					<div>
						<a href="javascript:void(0)" @click="govideo(vid.videoid)">
							<img v-lazy="vid.picture" />
							<p>{{vid.videoname}}</p>
						</a>
						<span><img src="/images/yanjing.svg" />{{vid.click}}</span>
						<span>{{vid.commendcount}}</span>
					</div>
				</div>
				<hr width="95%">
			</div>
			<!-- 我的相簿 -->
			<div style="font-size: 20px; margin: 20px; ">我的相簿 <router-link class= "gd"
				 :to="{name:'channel',query:{userid:userid}}">更多</router-link>
			</div>

			<div>
				<div style="background:url(/images/kong.png) center no-repeat; height:300px;" v-if="obj.length==0"></div>
				<div class="sp-list" v-show="true" v-for="(valuexc,index) in obj " :key="index">
					<div>
						<router-link :to="{name:'detail',query:{albumId:valuexc.albumid,albumName:valuexc.albumname}}">
							<img v-lazy="valuexc.photo" />
							<p>{{valuexc.albumname}}</p>
							<p style="color: #999;">{{valuexc.time}}</p>
						</router-link>
					</div>
				</div>
				<hr width="95%">
			</div>
			

			<div style="font-size: 20px; margin: 20px; ">最近收藏的视频 <router-link class= "gd"
				 :to="{name:'faVideo',query:{userid:userid}}">更多</router-link>
			</div>

			<div style="float: left;width: 100%;">


				<div style="background:url(/images/kong.png) center no-repeat; height:300px;" v-if="collection_vido.length==0"></div>
				<div class="sp-list" v-show="true" v-for="(vid,index) in collection_vido" :key="index">
					<div>
						<a href="javascript:void(0)" @click="govideo(vid.videoid)">
							<img v-lazy="vid.xyvideo.picture" />
							<p>{{vid.xyvideo.videoname}}</p>
						</a>
						<span><img src="/images/yanjing.svg" />{{vid.xyvideo.click}}</span>
						<span>{{vid.xyvideo.commendcount}}</span>
					</div>
				</div>
				<hr width="95%" />
			</div>

			
			<!-- 我的相簿 -->
			<div style="font-size: 20px; margin: 20px; ">收藏的相册 <router-link class= "gd"
				 :to="{name:'faAlbum',query:{userid:userid}}">更多</router-link>
			</div>
			<div>
				<div style="background:url(/images/kong.png) center no-repeat; height:300px;" v-if="photo.length==0"></div>
				<div class="sp-list" v-show="true" v-for="(valuexc,index) in photo " :key="index">
					<div>
						<router-link :to="{name:'detail',query:{albumId:valuexc.albumid,albumName:valuexc.xyalbum.albumname}}">
							<img v-lazy="valuexc.xyalbum.photo" />
							<p>{{valuexc.xyalbum.albumname}}</p>
							<p style="color: #999;">{{valuexc.xyalbum.time}}</p>
						</router-link>
					</div>
				</div>
				<hr width="95%" />
			</div>
			
		</div>
		<div class="authentication">
			<img src="../../../public/images/rz.png" alt="">
		</div>

		<!-- <div class="writing_center">
			rigth2
			<br> 创作中心
		</div> -->
		<div class="announcement">
			<a style="font-size: 18px; margin: 20px; font-weight: 600;">新闻</a>
			<div class="content">
				<div id="roo">
					<ul class="ulr">
						<li class="lir" v-for=" (news,index) in news" :key="index">
							<a href="#" class="newstitle">{{news.title}}</a>
							<span>{{news.clickcount}}人浏览</span> <br />
							<span>来源:{{news.source}}</span>
							<span class="time" style="">发布时间:{{news.time}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- <div class="message">
			rigth4
			<br> 撒的撒
		</div> -->
	</div>
</template>

<script>
	import store from "@/store.js";
	export default {
		store,
		data() {
			return {
				userid: 0,
				obj: [],
				news: [],
				vido: [],
				collection_vido: [],
				photo: []
			};
		},
		mounted() {

			//获取新闻
			this.axios.get('xynews/findAll.do').then(rs => {
				this.news = rs.data.xyuser;
			});
			//获取用户id
			if(this.$route.query.userid){
				this.userid = this.$route.query.userid;
			}else{
				this.userid = store.state.user.userid;
			}
				//根据用户id查询相册
				this.axios('xyalbum/findByUserId.do', {
					params: {
						userid: this.userid
					}
				}).then(rs => {
					this.obj = rs.data.xyuser.slice(0, 8);
				});
				//获取视频
				this.axios.get('xyvideo/findByUserId.do', {
					params: {
						userid: this.userid

					}
				}).then(rs => {
					this.vido = rs.data.xyuser.slice(0, 8);
				});

				//根据用户id查询用户已收藏的视频
				this.axios.get('xycollection/findCByUserid.do', {
					params: {
						userid: this.userid
					}
				}).then(rs => {
					this.collection_vido = rs.data.xyuser.slice(0, 8);
				});

				//根据用户id查询用户已收藏的相册
				this.axios.get('xyalbumcollection/findAlbumByUserId.do', {
					params: {
						userid: this.userid
					}
				}).then(rs => {
					this.photo = rs.data.xyuser.slice(0, 8);
					// //console.log(this.photo);
				});




		},
		methods: {
			/* 	getPhotoDetail(id) {
					const {
						href
					} = this.$router.resolve({
						name: "albumdetails",
						query: {
							id: id
						}
					});
					window.open(href, "_parent");
				}, */
			govideo(vdId) {
				this.axios.get('xyvideo/addclick.do', {
					params: {
						videoid: vdId
					}
				}).then(rs => {});
				const {
					href
				} = this.$router.resolve({
					name: "play",
					query: {
						vdId: vdId
					}
				});
				window.open(href, "_blank");
			}
		}
	}
</script>
<style scoped>
	.sp-list {
		margin: 20px 20px;
	}

	.sp-list div {
		float: left;
		display: inline-block;
		margin: 0px 20px 15px 0;
	}

	.sp-list a>img {
		width: 180px;
		height: 113px;
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.sp-list div span {
		display: inline-block;
		margin-top: 10px;
		margin-right: 20px;
		height: 20px;
	}

	.sp-list div span:last-child {
		padding-left: 20px;
		background: url(../../../public/images/icons-comment.png) -150px -25px;
	}

	.homepage {
		width: 100%;
	}

	/* 左 */

	.left_one {
		background-color: rgb(255, 255, 255);
		width: 70%;
		float: left;
	}

	/* 点此申请 bilibili 认证 */

	.authentication {
		background-color: rgb(255, 255, 255);
		width: 29%;
		height: 70px;
		float: right;
	}

	/* 创作中心 */

	.writing_center {
		background-color: rgb(255, 255, 255);
		width: 29%;
		height: 70px;
		float: right;
		clear: right;
		margin: 12px 0;
	}

	/* 公告  */

	.announcement {
		background-color: rgb(255, 255, 255);
		width: 29%;
		height: 260px;
		float: right;
		clear: right;
		margin: 12px 0;
	}

	/* 信息 */

	.message {
		background-color: rgb(255, 255, 255);
		width: 29%;
		height: 50px;
		float: right;
		clear: right;
	}

	/*订阅番剧*/

	.subscribe {
		margin: 16px 12px;
		width: 415px;
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
		line-height: 18px;
		font-size: 13px;
		max-height: 60px;
		overflow: hidden;
	}

	/* 最近投币视频 */

	.subscribe_insert {
		width: 180px;
		height: 180px;
		float: left;
		margin: 5px 20px;
	}

	.subscribe_insert img {
		border-radius: 5px;
		width: 160px;
		height: 100px;
		margin: 10px 10px;
	}

	.collection {
		float: left;
		width: 100%;
	}

	.collection_s {
		width: 170px;
		height: 170px;
		border: 3px solid #CCF5EA;
		margin: 17px 22px;
		float: left;
	}

	.collection_s img:nth-child(1) {
		width: 156px;
		height: 74px;
		margin: 5px 8px;
	}

	.collection_s img:nth-child(2) {
		width: 74px;
		height: 74px;
		margin: 2px 6px;
	}

	.collection_s img:nth-child(3) {
		width: 75px;
		height: 74px;
		margin: 2px 4px;
	}

	.content {
		width: 90%;
		height: 70%;
		left: 200px;
		top: 100px;
		padding: 4% 4%;
		overflow: hidden
	}

	@keyframes scroll {
		0% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
		}

		20% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
		}

		25% {
			-webkit-transform: translateY(-150px);
			transform: translateY(-150px);
		}

		45% {
			-webkit-transform: translateY(-300px);
			transform: translateY(-300px);
		}

		50% {
			-webkit-transform: translateY(-450px);
			transform: translateY(-450px);
		}

		70% {
			-webkit-transform: translateY(-600px);
			transform: translateY(-600px);
		}

		75% {
			-webkit-transform: translateY(-750px);
			transform: translateY(-750px);
		}

		95% {
			-webkit-transform: translateY(-900px);
			transform: translateY(-900px);
		}

		100% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
		}
	}

	#roo {
		width: 95%;
		height: 95%;
		overflow: hidden;
	}

	.ulr {
		height: 100%;
		width: 100%;
		-webkit-animation: scroll 14s infinite;
	}

	.lir {
		border-radius: 8px;
		background-color: #F9FCFE;
		line-height: 25px;
		height: 80px;
		margin: 10px 0;
	}

	.time {
		margin-right: 2px;
		padding: 0 15px;
	}

	.newstitle {
		font-size: 16px;
		font-weight: 600;
	}
	
	.gd {
		font-size: 12px;
		float: right;
		display: inline-block;
		padding: 3px 6px;
		border:1px solid #ccc;
		border-radius: 5px;
	}
</style>
