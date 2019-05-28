# vue-autowire
> In development!

[![Build Status](https://travis-ci.com/kaizendorks/vue-autowire.svg?branch=master)](https://travis-ci.com/kaizendorks/vue-autowire)

Vue Autowire is a Vue plugin with conventions for automatically wiring Vue assets like components, views or directives.

Quick usage on a Vue-CLI project
```js
import Vue from 'vue'
import App from './App.vue'
import VueAutowire from 'vue-autowire'

// Use the default conventions
import defaultConventions from 'vue-autowire/src/conventions';
Vue.use(VueAutowire, defaultConventions)

// Use only certain assets, but with their default conventions
import routesConventions from 'vue-autowire/src/conventions/routes';
Vue.use(VueAutowire, routesConventions)

// Mix and match defaults and your custom conventions
import routesConventions from 'vue-autowire/src/conventions/routes';
Vue.use(VueAutowire, Object.assign(routesConventions, {
  components: {
    // Provide your own components convention. For example:
    // register all js/vue files inside the /components folder as components
    requireContext: require.context('./components', true, /(\.js|\.vue)$/),
    // do not register any as an async component
    requireAsyncContext: null
  }
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

Read through the docs at https://kaizendorks.github.io/vue-autowire/ for more information on the default conventions and understand how to create your own.
