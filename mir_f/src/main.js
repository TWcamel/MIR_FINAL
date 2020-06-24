import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './router'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

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
  router,
  render: h => h(App),
}).$mount('#app');

