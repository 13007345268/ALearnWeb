<template>
	<el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#334157" text-color="#fff"
	 active-text-color="#ffd04b" :collapse="collapsed" :collapse-transition="bb">
		<div class="logobox">
			<img class="logoimg" src="../assets/img/logo.png" alt="">
		</div>
		<el-row class="tac">
			<el-col :span="12">
				<el-menu  router :default-active="$route.path" default-active="1-5" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
					<el-submenu index="1">
						<template slot="title">
              <i class="el-icon-s-finance"></i>
              <span>悦金融</span>
						</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">我的账户</el-menu-item>
              <el-menu-item index="1-2">我的信用卡</el-menu-item>
              <el-menu-item index="1-3">信用卡网申</el-menu-item>
              <el-menu-item index="1-4">信用卡商城</el-menu-item>
              <el-menu-item index="/AppMain/Dicts" >数据字典</el-menu-item>
            </el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>乐生活</span>
						</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">ETC服务</el-menu-item>
              <el-menu-item index="2-2">周边网点</el-menu-item>
              <el-menu-item index="/AppMain/Information">最新资讯</el-menu-item>
              <el-menu-item index="/AppMain/peo">在线客服</el-menu-item>
            </el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
              <i class="el-icon-setting"></i>
              <span>微服务</span>
						</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">公司服务</el-menu-item>
              <el-menu-item index="3-2">预约服务</el-menu-item>
              <el-menu-item index="3-3">移动银行App下载</el-menu-item>
            </el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-col>
		</el-row>
	</el-menu>
</template>

<script>
	export default {
		data: function() {
			return {
				collapsed: false,
				bb: true,
				treeNodeList: [],

			}
		},
		//收起
		created: function() {
			this.$root.Bus.$on("asid-toggle", (collapsed) => {
				this.collapsed = collapsed;
			});
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		min-height: 400px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
		text-align: left;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}

	.el-menu-bg {
		background-color: #1f2d3d !important;
	}

	.el-menu {
		border: none;
	}

	.logobox {
		height: 40px;
		line-height: 40px;
		color: #9d9d9d;
		font-size: 20px;
		text-align: center;
		padding: 20px 0px;
	}

	.logoimg {
		height: 40px;
	}
</style>
