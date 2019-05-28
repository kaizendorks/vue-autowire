import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ComponentsTest from './views/ComponentsTest.vue';
import AsyncPageTest from './views/AsyncPageTest.async.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/components-test',
      name: 'components-test',
      component: ComponentsTest
    },
    {
      path: '/async-page-test',
      name: 'async-page-test',
      component: AsyncPageTest
    }
  ]
});
