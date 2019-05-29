import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueAutowire from '../dist/vue-autowire.esm';
import defaultConventions from '../src/conventions';

Vue.use(VueAutowire, defaultConventions);
console.log(Vue.autowire);

Vue.config.productionTip = false;

new Vue({
  router: router(),
  render: h => h(App)
}).$mount('#vue-holder');
