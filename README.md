# vue-autowire
> In development!

Vue plugin with conventions for automatically wiring components, pages and routes.

```
import Vue from 'vue'
import App from './App.vue'
import VueAutowire from 'vue-autowire';

Vue.config.productionTip = false

// Use default settings
Vue.use(VueAutowire);

// Enable only certain options
Vue.use(VueAutowire, {
  routes: { enabled: false },
});

// Provide your own webpack context with your own convention for folder/file names
Vue.use(VueAutowire, {
  components: {
    // all components in the /src/components folder that end with .vue, excluding the .async.vue ones
    context: require.context('@/components', true, /\/(?:[^.]+|(?!\.async\.vue$))\.vue$/),
    // all components in the /src/components folder that end with async.vue
    // Not the last argument to use webpack's lazy mode so they get their own chunk
    context: require.context('@/components', true, /async\.vue$/, 'lazy'),
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app')
```

For more information, check the docs at https://kaizendorks.github.io/vue-autowire/!
