# Directives

## Default Convention

The default convention will be used with either of these:
```js
// Use all of the default conventions
import defaultConventions from 'vue-autowire/src/conventions'
// Use only the directives default convention
import defaultDirectivesConventions from 'vue-autowire/src/conventions/directives'
```

It is defined as follows:
```js
{
  directives: {
    requireContext: require.context('@/directives', true, /\.js$/)
}
```

Which means:
- Assumes there is a [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias) defined as `@` which maps to the root source of the Vue application. _If you are using the Vue-CLI, this is already the case_
- With `requireContext`, all the files inside the `@/directives` folder that end with `.js` will be found. They will be registered as Vue directives within the Vue application and included in the main bundle.


## Example

Directives are objects containing functions which act on the element on which they are called. We  need to provide this object containing functions to autowire it. For example, to produce the following code:

```js
Vue.directive('bars', 
  inserted: function(el) {
    el.innerHTML = `<hr>${el.innerHTML}<hr>`;
  }
);
```

All we need to do is provide the following content in `/directives/shout.js`:

```js
export default {
  inserted: function(el) {
    el.innerHTML = `<hr>${el.innerHTML}<hr>`;
  }
};
```

The directive will be registered as `bars` with the associated function provided in `bars.js`.
