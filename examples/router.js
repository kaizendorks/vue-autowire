import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default () => new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Vue.component('Home')
    },
    {
      path: '/components-test',
      name: 'components-test',
      component: Vue.component('ComponentsTest')
    },
    {
      path: '/async-page-test',
      name: 'async-page-test',
      component: Vue.component('AsyncPageTest')
    },
    {
      path: '/filters-test',
      name: 'filters-test',
      component: Vue.component('FiltersTest')
    },
    {
      path: '/directives-test',
      name: 'directives-test',
      component: Vue.component('DirectivesTest')
    },
  ]
});
