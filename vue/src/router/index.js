import Vue from 'vue'
import Router from 'vue-router'

import TModel from '@/pages/TModel.vue'
// import Detail from '@/pages/Detail.vue'
import Login from '@/components/Login.vue';
import MSheet from '@/components/MSheet.vue';
import UserInfo from '@/components/UserInfo.vue';
import Header from '@/components/Header.vue';
// import Analyzer from 'https://TWcamel.github.io/tmp-audio_vs/index.html'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: MSheet,
        nav: Header
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/TrainModel',
      components: {
        default: TModel,
        nav: Header
      }
    },
    {
      path: '/UserInfo',
      components: {
        default: UserInfo,
        nav: Header
      }
    },
    {
      path: '*',
      redirect: '/'
    },
    // {
    //   path: '/Analyzer',
    //   mode: history,
    //   components: { template: Analyzer }
    // },
  ]

})
