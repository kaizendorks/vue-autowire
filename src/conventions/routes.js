// Default conventions for autowiring router files
// NOTES:
//  - These conventions rely on a webpack alias of "@" set to the project's root folder
//    It is done by the vue-cli by default, but devs can do so on their own projects
//  - Values here need to be primitives (not variables) since webpack will parse these when included from the end project
//    For that reason is also important to separate conventions into separated files so they can be individually imported if needed

export default {
  routes: {
    requireContext: require.context(
      // root folder for routes
      '@/',
      // recursive
      true,
      // include all .router.js files
      /\.router.js$/
    )
  }
};
