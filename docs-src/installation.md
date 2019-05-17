# Installation

## npm

``` bash
npm install vue-autowire
```

You must explicitly install the router via `Vue.use()` and provide the context with your source code:

``` js
import Vue from 'vue'
import VueAutowire from 'vue-autowire'

Vue.use(VueAutowire, { context: require.context('./', true, /(\.js|\.vue)$/) })
```

## Dev Build

You will have to clone directly from GitHub and build `vue-autowire` yourself if
you want to use the latest dev build.

``` bash
git clone https://github.com/kaizendorks/vue-autowire.git node_modules/vue-autowire
cd node_modules/vue-autowire
npm install
npm run build
```
