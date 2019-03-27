<template>
	<div class="detail">
		<h3>
			<router-link :to="{name:'channel'}" style="display: inline-block;">我的相簿</router-link> > {{albumName}}
		</h3>
		<p style="color: #ccc;">{{userPhoto.count}}张相片 | {{userPhoto.xyuser[0].time}}更新</p>
		<div style="height: 50px;">
			<el-dropdown style="padding: 7px 12px;">
				<span class="el-dropdown-link">
					下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>编辑相簿</el-dropdown-item>
					<el-dropdown-item>删除相簿</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dialog title="编辑相簿" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item>
						<el-input v-model="form.name" placeholder="填写频道标题"></el-input>
					</el-form-item>

					<el-form-item>
						<el-input v-model="form.input" type="textarea" :row=3 placeholder="填写频道简介(选填)"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</div>
			</el-dialog>
		</div>

		<div class="pd">

			<div class="pd-item" v-for="item of userPhoto.xyuser" :key="item">
				<a @click="getPic(albumId,albumName)">
					<img v-lazy="item.url" />
					<h3 style="margin: 10px 0px;">{{item.photoname}}</h3>
					<p style="color:#999">{{item.time}}</p>
				</a>
			</div>
		</div>
		<el-pagination
		  background
		  @current-change="handleCurrentChange1"
		  style="text-align: center;"
		  layout="prev, pager, next"
		  :page-size="5"
		  :total="userPhoto.count">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				albumName:'',
				albumId:'',
				userPhoto:'',
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			};
		},mounted() {
				this.albumName = this.$route.query.albumName;
				this.handleCurrentChange1(1);
		},
		methods: {
			handleCurrentChange1(val) {
				// console.log(`当前页: ${val}`);
				this.albumId = this.$route.query.albumId;
				this.axios.get('xyphoto/findPageByAlbumId.do',{
					params:{
						albumid:this.albumId,
						page:val
					}
				}).then(res => {
					this.userPhoto = res.data;
					// console.log(this.userPhoto);
				});
			},
			getPic(albumId,albumName){
				const { href } = this.$router.resolve({
				  name: "photoDetail",
				  query: { albumId:albumId, albumName:albumName}
				});
				window.open(href, "_blank");
			}
			
			
		}
	}
</script>

<style scoped>
	.detail /deep/.el-dropdown {
		vertical-align: top;
		float: right;
	}

	.detail /deep/.el-dropdown+.el-dropdown {
		margin-left: 15px;
	}

	.detail /deep/.el-icon-arrow-down {
		font-size: 12px;
	}

	.detail {
		background-color: #fff;
		height: 100%;
		padding: 10px 20px;
	}

	.detail>h3 {
		padding: 10px 0px;
		font-size: 18px;

	}

	.pd {
		padding-top: 20px;
		height: 100%;
		border-top: 1px solid #ccc;
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


	.detail /deep/.pd>.el-button {
		padding: 0px;
		padding-bottom: 50px;
	}


	.detail /deep/.pd .el-dialog {
		width: 40%;
	}

	.xj {
		display: inline-block;
		height: 130px;
		width: 200px;
		margin: 0px 10px;
		border-radius: 5px;
		border: 2px dashed #b8c0cc;
		text-align: center;
		padding-top: 35px;
		box-sizing: border-box;
		color: #b8c0cc;
	}

	.xj:hover {
		color: rgb(0, 163, 219);
		border: 2px dashed rgb(0, 163, 219);
	}

	.xj>span:first-child {
		font-size: 36px;
	}
</style>
