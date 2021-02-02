<template>
	<el-container class="main-container">
		<el-aside v-bind:class="asideClass">
			<LeftNav></LeftNav>
		</el-aside>
		<el-container>
			<el-header class="main-header">
				<TopNav></TopNav>
			</el-header>
			<el-main class="main-center">
        <router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	// 导入组件
	import LeftNav from '@/components/LeftNav.vue'
	import TopNav from '@/components/TopNav.vue'
 
	// 导出模块
	export default {
		data: function (){
		  return {
		    collapsed:false
		  }
		},
		computed:{
		    asideClass: function(){
		          return this.collapsed?"main-aside-collapsed":"main-aside";
		    }
		},
		components:{
		  TopNav,
		  LeftNav
		},
		created:function(){
		  this.$root.Bus.$on("asid-toggle", (collapsed)=>{
		      if(collapsed===true){
		        setTimeout(()=>{
		           this.collapsed=collapsed;
		        },300);
		      }else{
		          this.collapsed=collapsed;
		      }
		  });
		}
	};
</script>
<style scoped>
	.main-container {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	.main-aside-collapsed {
		/* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
		width: 53px !important;
		height: 100%;
		background-color: #334157;
		margin: 0px;
	}

	.main-aside {
		width: 240px !important;
		height: 100%;
		background-color: #334157;
		margin: 0px;
	}

	.main-header {
		padding: 0px;
		border-left: 2px solid #333;
	}

	.main-center {
		padding: 20px;
		border-left: 2px solid #333;
	}
</style>
<style type="text/css">
	html,
	body,
	#app,
	.el-container {
		/*设置内部填充为0，几个布局元素之间没有间距*/
		padding: 0px;
		/*外部间距也是如此设置*/
		margin: 0px;
		/*统一设置高度为100%*/
		height: 100%;
	}
</style>
