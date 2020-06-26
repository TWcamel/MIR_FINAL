/**
 * @file vue 主入口
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
  const isLogin = localStorage.getItem('token') === 'ImLogin' ;
  if( isLogin ){
    next();
  } else {
    if( to.path !== '/login')
      next('/login');
    else
      next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
