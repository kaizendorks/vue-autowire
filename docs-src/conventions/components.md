# Components

Similarly to the [views](./views.md) convention, Vue-Autowire lets you provide 2 different `require.context` instances when defining the components convention:
```js
Vue.use(VueAutowire, {
  components: {
    requireContext: require.context('@/components', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
    requireAsyncContext: require.context('@/components', true, /async\.vue$/, 'lazy')
  }
})
```

- The first one, `requireContext` lets you define the components that will be registered as regular sync components, to be included in the main webpack bundle.
- The second one, `requireAsyncContext` lets you define the components that will be registerd as [async components](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components), to be included on their **own bundle** by using the **lazy** mode of webpack's [require.context](https://webpack.js.org/api/module-methods/#requirecontext) API.

## Default Convention

The default convention will be used with either of these:
```js
// Use all of the default conventions
import defaultConventions from 'vue-autowire/src/conventions'
// Use only the components default convention
import defaultComponentConventions from 'vue-autowire/src/conventions/components'
```

It is defined as follows:
```js
{
  components: {
    requireContext: require.context('@/components', true, /\/(?:[^.]+|(?!\.local\.vue$)|(?!\.async\.vue$))\.vue$/),
    requireAsyncContext: require.context('@/components', true, /async\.vue$/, 'lazy')
  }
}
```

Which means:
- Assumes there is a [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias) defined as `@` which maps to the root source of the Vue application. _If you are using the Vue-CLI, this is already the case_
- With `requireContext`, all the files inside the `@/components` folder that end with `.vue` but not with `.local.vue` nor `.async.vue` will be found. They will be registered as Vue components within the Vue application and included in the main bundle.
- With `requireAsyncContext`, all the files inside the `@/components` folder that end with `async.vue` will be found. They will be registered as **async** Vue components within the Vue application and included in **their own bundle**. (One bundle per each async component)

### Example
Given a folder structure like
```
/src
  /components
    navbar.vue
    footer.vue
    markdown-editor.async.vue
    /blog-entry-preview
      blog-entry-preview.async.vue
      author-preview.local.vue  // manually imported from blog-entry-preview.async.vue
  /views
    ...
  /directives
    ...
  /mixins
    ...
  App.vue
  main.js
```

The default **components convention** will:
- Register `navbar` and `footer` as Vue sync components, exactly with those names.
- Include `navbar.vue` and `footer.vue` in the main webpack bundle
- Register `markdown-editor` and `blog-entry-preview` as Vue async components, exactly with those names.
- Include `markdown-editor.vue` into its own webpack bundle
- Include `blog-entry-preview.async.vue` and `author-preview.local.vue` into its own webpack bundle (assuming you manually import `author-preview.local.vue` from `blog-entry-preview.async.vue`)
