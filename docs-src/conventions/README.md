# Getting Started

Vue-Autowire is based around webpack's [`require.context`](https://webpack.js.org/api/module-methods/#requirecontext) in order to find all the files matching a certain convention, including them in the webpack bundles and register them within your Vue instance.

Rather than manually importing every component, view, directive and mixin, use a folder and file name convention. Then let Vue-Autowire follow that convention, import and register all those assets. This includes automatically registering components/views as [async components](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components) with their own webpack chunk!

## How to define a convention?

A convention is nothing but an object defining the different `require.context` patterns to be used for each of the different type of assets:
```js
// Define the convention
const myConvention: {
  routes: {
    // All 'router.js' files
    requireContext: require.context('@/', true, /router\.js$/)
  },
  components: {
    // All '.vue' files inside the /components folder that do not end with '.local.vue' nor '.async.vue'
    requireContext: require.context('@/components', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
    // All '.async.vue' files inside the /components folder.
    // Notice the "lazy" option, which makes webpack create a separated chunk for each of them
    requireAsyncContext: require.context('@/components', true, /async\.vue$/, 'lazy')
  },
  views: {
    requireContext: require.context(...),
    requireAsyncContext: require.context(...),
  },
  directives: {
    requireContext: require.context(...)
  },
  mixins: {
    requireContext: require.context(...)
  }
}
// Use the convention
Vue.use(VueAutowire, myConvention)
```

All the properties in the convention object are **optional**. Not providing them simply means you don't want Vue-Autowire to automatically find and register assets of that type.

For example, you might just want Vue-Autowire to find and register directives, mixins and non-async components, leaving everything else for you to manually import and register.
```js
const myConvention: {
  components: {
    // All '.vue' files inside the /components folder that do not end with '.local.vue' nor '.async.vue'
    requireContext: require.context('@/components', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
  },
  directives: {
    // All '.js' files inside the /directives folder
    requireContext: require.context('@/directives', true, /\.js$/)
  },
  mixins: {
    // All '.js' files inside the /mixins folder
    requireContext: require.context('@/mixins', true, /\.js$/)
  }
}
Vue.use(VueAutowire, myConvention)
```

## Using the default conventions
Vue-Autowire comes with default conventions for each of the different types of assets that it can handle:
- [components](./components.md)
- [views](./views.md)
- [directives](./directives.md)
- [mixins](./mixins.md)
- [routes](./routes.md)

You can use them all by importing the overall default convention
```js
// Use the default conventions for components, views, directives, mixins and routes
import defaultConventions from 'vue-autowire/src/conventions'
Vue.use(VueAutowire, defaultConventions)
```

Of course, if you are interested only certain conventions, you can simply import the ones you need:
```js
// Use only the default conventions for components and routes
import defaultComponentConventions from 'vue-autowire/src/conventions/components'
import defaultRoutesConventions from 'vue-autowire/src/conventions/routes'
Vue.use(VueAutowire, Object.assign({}, defaultComponentConventions, defaultRoutesConventions))
```

::: warning
When using only a subset of the default conventions, always import only the specific convention files!

Ie, if you just want to use the component conventions you should `import defaultComponentConventions from 'vue-autowire/src/conventions/components'` rather than `import { components } from 'vue-autowire/src/conventions'`.
This is because at build time, webpack will follow the chain of `import` statements and parse any `require.context` statements found **regardless of whether you end up using them or not**.
Always make sure you only import files containing `require.context` that you need!
:::

Finally, feel free to mix and match default conventions with conventions of your own:
```js
// Use the default mixin and directives conventions but your own components conventions
import defaultMixinConventions from 'vue-autowire/src/conventions/mixins'
import defaultDirectiveConventions from 'vue-autowire/src/conventions/directives'
Vue.use(VueAutowire, Object.assign({}, defaultMixinConventions, defaultDirectiveConventions, {
  components: {
    requireContext: require.context('@/components', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
    requireAsyncContext: require.context('@/components', true, /async\.vue$/, 'lazy')
  }
}))
```

::: warning
Avoid importing a convention that you will later override!

Ie, if you just want to use your own component conventions you should
manually define the convention rather than importing  `vue-autowire/src/conventions/components` and later overridding its
`components.requireContext` and/or `components.requireAsyncContext`.
Otherwise webpack will find the `require.context` in the default convention and use it when generating the bundles, which will probably
interfere with your intended results!
:::

If you want to check which different asset types were included by Vue-Autowire, you can inspect the contents of `Vue.autowire`!

Read through each of the specific asset type sections to find out more about their default conventions.
