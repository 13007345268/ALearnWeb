import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import AppMain from '@/views/AppMain'

import Dicts from '@/views/sys/Dicts'
import peo from '@/views/sys/peo'

import Information from '@/views/sys/Information'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/AppMain',
      name: 'AppMain',
      component: AppMain,
      children: [{
        //数据字典
        path: 'Dicts',
        name: 'Dicts',
        component: Dicts,
      },
      {
        //最新资讯
        path: 'Information',
        name: 'Information',
        component: Information,
      },
        {
          //在线客服
          path: 'peo',
          name: 'peo',
          component: peo,
        },
      ]

    },

  ]
})
