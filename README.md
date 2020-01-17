# vue-autowire
> In development!

[![Build Status](https://travis-ci.com/kaizendorks/vue-autowire.svg?branch=master)](https://travis-ci.com/kaizendorks/vue-autowire)

Vue Autowire is a Vue plugin with conventions for automatically wiring different Vue assets:
- components
- views
- directives
- filters
- mixins
- routes

Quick usage on a Vue-CLI project
``` js
import Vue from 'vue'
import App from './App.vue'
import VueAutowire from 'vue-autowire'

// Use the default conventions
import defaultConventions from 'vue-autowire/src/conventions';
Vue.use(VueAutowire, defaultConventions)

// Auto wire only certain assets, but with their default conventions
import componentsConventions from 'vue-autowire/src/conventions/components';
Vue.use(VueAutowire, componentsConventions)

// Mix and match defaults and your custom conventions
import componentsConventions from 'vue-autowire/src/conventions/components';
Vue.use(VueAutowire, Object.assign(componentsConventions, {
  views: {
    // Provide your own views convention. For example:
    // register all .vue files (excluding .local.vue and .async.vue) inside the /views folder as regular components
    requireContext: require.context('./views', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
    // register all .async.vue files inside the /views folder as dynamic components
    requireAsyncContext: require.context('./views', true, /\.async\.vue$/, 'lazy'),
  }
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

Read through the docs at https://kaizendorks.github.io/vue-autowire/ for more information about the default conventions and how to create your own.
