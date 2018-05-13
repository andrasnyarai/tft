// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import popmotion from 'popmotion';
import VuePopmotion from 'vue-popmotion';

import App from './App';
import router from './router';

Vue.use(VuePopmotion, popmotion);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
