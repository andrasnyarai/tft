import Vue from 'vue';
import Router from 'vue-router';
import Tech from './../components/Tech';
import About from './../components/About';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'about',
      component: About,
    },
    {
      path: '/tech',
      name: 'tech',
      component: Tech,
    },
  ],
});
