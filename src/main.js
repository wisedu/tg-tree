import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import route from './router';
import * as utils from './utils'
import loadSprite from './load-spirte'

loadSprite();


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