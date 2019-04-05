import Vue from 'vue'
import Router from 'vue-router'

import ViewIndex from '../view/index/index';
import ViewAbout from '../view/about/about';
import ViewVlab from '../view/about/V-lab';
import ViewTale from '../view/about/tale';
import ViewJoin from '../view/about/join';
import ViewShare from '../view/about/share';
import ViewProduct from '../view/product/index';
import ViewAntifake from '../view/certificate/antifake';
import ViewAntifakeIndex from '../view/certificate/index';



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
  }, {
    path: '/about',
    component: ViewAbout
  }, {
    path: '/vlab',
    component: ViewVlab
  }, {
    path: '/tale',
    component: ViewTale
  }, {
    path: '/share',
    component: ViewShare
  }, {
    path: '/product',
    component: ViewProduct
  }, {
    path: '/join',
    component: ViewJoin
  }, {
    path: '/antifake',
    component: ViewAntifake
  }, {
    path: '/antifake/index',
    component: ViewAntifakeIndex
  }]
})
