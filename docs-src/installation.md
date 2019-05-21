# Installation

## npm/yarn

Begin by installing as a dev-dependency:
``` bash
# using npm
npm install --save-dev vue-autowire
# using yarn
yarn add --dev vue-autowire
```

Vue-Autowire is then provided as a [Vue plugin](https://vuejs.org/v2/guide/plugins.html) that you must explicitly install with `Vue.use()`.

Within this call, you must provide the `conventions` object that defines:
- which types of assets should be auto-wired (ie, components, views, directives, etc)
- where should webpack find them

The easiest is to use the [default conventions](./guide/README.md).
``` js
import Vue from 'vue'
import App from './App.vue'
import VueAutowire from 'vue-autowire'
import defaultConventions from 'vue-autowire/src/conventions';

Vue.use(VueAutowire, defaultConventions)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Latest dev build

You will have to clone directly from GitHub and build `vue-autowire` yourself if
you want to use the latest dev build.

``` bash
git clone https://github.com/kaizendorks/vue-autowire.git
cd vue-autowire
npm install
npm run build
```

Once cloned and built, install it in your project as a `file://` dev-dependency:

``` bash
# Using npm
npm install --save-dev /Users/garciad/git/kaizendorks/vue-autowire
# Using yarn
yarn add --dev /Users/garciad/git/kaizendorks/vue-autowire
```
