# Views

Similarly to the [components](./components.md) convention, Vue-Autowire lets you provide 2 different `require.context` instances when defining the views convention:
```js
Vue.use(VueAutowire, {
  views: {
    requireContext: require.context('@/views', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
    requireAsyncContext: require.context('@/views', true, /async\.vue$/, 'lazy')
  }
})
```

- The first one, `requireContext` lets you define the views that will be registered within Vue as regular sync components, to be included in the main webpack bundle.
- The second one, `requireAsyncContext` lets you define the views that will be registerd within Vue as [async components](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components), to be included on their **own bundle** by using the **lazy** mode of webpack's [require.context](https://webpack.js.org/api/module-methods/#requirecontext) API.

## Default Convention

The default convention will be used with either of these:
```js
// Use all of the default conventions
import defaultConventions from 'vue-autowire/src/conventions'
// Use only the views default convention
import defaultViewConventions from 'vue-autowire/src/conventions/views'
```

It is defined as follows:
```js
{
  views: {
    requireContext: require.context('@/views', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
    requireAsyncContext: require.context('@/views', true, /async\.vue$/, 'lazy')
  }
}
```

Which means:
- Assumes there is a [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias) defined as `@` which maps to the root source of the Vue application. _If you are using the Vue-CLI, this is already the case_
- With `requireContext`, all the files inside the `@/views` folder that end with `.vue` but not with `.local.vue` nor `.async.vue` will be found. They will be registered as Vue components within the Vue application and included in the main bundle.
- With `requireAsyncContext`, all the files inside the `@/views` folder that end with `async.vue` will be found. They will be registered as **async** Vue components within the Vue application and included in **their own bundle**. (One bundle per each async view)

### Example
Given a folder structure like
```
/src
  /views
    home.vue
    about.async.vue
    /profile-settings
      profile-settings.async.vue
      security-settings.local.vue  // manually imported from profile-settings.async.vue
  /components
    ...
  /directives
    ...
  /mixins
    ...
  App.vue
  main.js
  router.js
```

The default **views convention** will:
- Register `home` as Vue sync components, exactly with that names.
- Include `home.vue` in the main webpack bundle
- Register `about` and `profile-settings` as Vue async components, exactly with those names.
- Include `about.async.vue` into its own webpack bundle
- Include `profile-settings.async.vue` and `security-settings.local.vue` into its own webpack bundle (assuming you manually import `security-settings.local.vue` from `profile-settings.async.vue`)


## Router integration
Most likely, you will define views so they can be defined as the component of vue-router routes.
Update your routes definition to use the components that Vue-Autowire will have registered:
```js
{
  path: '/',
  name: 'home',
  // Instead of manually importing here the component, use the one that Vue-Autowire registered
  // The name is based on the file name
  component: Vue.component('home')
},
```
:::tip
This will work even if you defined the view as an async one!
:::

Then you want to make sure that Vue-Autowire is able to find and register all the views before you construct the routes.
For example, make sure the file where you create the `Router` instance exports a function rather than the instance:
```js
export default () => new Router({
  routes: [
    ...
  ]
}
```

This way, in your main `app.js` file, you can execute the function to get the router _only after_ Vue-Autowire has been registered:
```js
Vue.use(VueAutowire, defaultConventions);

...

new Vue({
  router: router(),
  render: h => h(App)
}).$mount('#vue-holder');
```