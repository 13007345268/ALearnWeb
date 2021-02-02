import Vue from 'vue'
import App from './App'
import router from './router'


import store from './store' //全局变量
import ElementUI from 'element-ui' //新添加1
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，要放在import App from './App';之前
Vue.use(ElementUI) //新添加3


import axios from '@/api/http' //vue项目对axios的全局配置
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//开发环境下才会引入mockjs
// process.env.MOCK && require('@/mock')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>',
	data: {
		Bus: new Vue()
	}
})
