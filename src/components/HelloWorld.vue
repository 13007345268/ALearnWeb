<template>
	<div>
		<h1>{{ msg }}</h1>
		<el-button type="primary" @click="doLoing">主要按钮</el-button>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
			doLoing: function() {
				this.$router.push({
					path: '/Loing'
				})
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
