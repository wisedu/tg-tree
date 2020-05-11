import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import route from './router'
import * as utils from 'utils'

// 兼容低版本浏览器不支持Promise
require('es6-promise').polyfill();
require('es6-promise/auto');

Vue.use(VueRouter);
const router = new VueRouter(route);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});