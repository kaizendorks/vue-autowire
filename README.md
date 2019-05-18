# vue-autowire
> In development!

Vue plugin with conventions for automatically wiring components, pages and routes.

- Docs will be available at https://kaizendorks.github.io/vue-autowire/.

Use it by cloning the repo and building with `npm run build`.

```
import Vue from 'vue'
import App from './App.vue'
import VueAutowire from './autowire';

Vue.config.productionTip = false

Vue.use(VueAutowire, {
  // All .js and .vue files except the ones ending with .async.vue
  context: require.context('./', true, /\/(?:[^.]+|(?!\.async\.vue$))(\.js|\.vue)$/),
  // All the .async.vue files as async components on their own vue file
  asyncContext: require.context('./', true, /async\.vue$/, 'lazy')
})

new Vue({
  render: h => h(App),
}).$mount('#app')
```
