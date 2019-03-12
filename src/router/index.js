import Vue from 'vue'
import Router from 'vue-router'

import ViewIndex from '../view/index/index';



import storage from "../common/storage";

const handleBeforeEnter = (to, from, next) => {
  var token = storage.getToken();
  if (token !== '') {
    next();
  } else {
    next('/member/login');
  }
}

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: ViewIndex
  }, {
    path: '/index',
    component: ViewIndex
  }]
})
