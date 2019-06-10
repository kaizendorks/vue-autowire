# Filters

## Default Convention

The default convention will be used with either of these:
```js
// Use all of the default conventions
import defaultConventions from 'vue-autowire/src/conventions'
// Use only the filters default convention
import defaultFiltersConventions from 'vue-autowire/src/conventions/filters'
```

It is defined as follows:
```js
{
  filters: {
    requireContext: require.context('@/filters', true, /\.js$/)
}
```

Which means:
- Assumes there is a [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias) defined as `@` which maps to the root source of the Vue application. _If you are using the Vue-CLI, this is already the case_
- With `requireContext`, all the files inside the `@/filters` folder that end with `.js` will be found. They will be registered as Vue filters within the Vue application and included in the main bundle.


## Example

Filters are functions which take an input value and produce an output. We only need to provide this function to autowire it. For example, to produce the following code:

```js
Vue.filter('shout', function (val) {
  return val.toUpperCase();
});
```

All we need to do is provide the following content in `/filters/shout.js`:

```js
export default function (val) {
  return val.toUpperCase();
};

```

The filter will be registered as `shout` with the associated function provided in `shout.js`.
