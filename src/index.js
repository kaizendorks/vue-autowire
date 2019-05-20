'use strict';

import { getComponentName } from './utils';

const _defaults = {
  routes: {
    enabled: true,
    requireContext: null
  },
  components: {
    enabled: true,
    requireContext: null,
    requireAsyncContext: null
  }
};

/**
 * Load router files
 * @param {Vue} Vue VueJS instance
 * @param {Object} routesOptions
 */
function registerRoutes (Vue, routesOptions) {
  // Setup webpack's require context. See https://github.com/webpack/docs/wiki/context#context-module-api
  const requireContext = routesOptions.requireContext || require.context(
    // root folder for routes
    // relies on vue-cli setting a webpack alias of '@' to the project's /src folder
    '@/',
    // recursive
    true,
    // include all .router.js files
    /\.router.js$/)

  // Ask webpack to list the files (In sync mode, require.context already adds all files to bundle)
  const routeFiles = requireContext.keys();

  // Return them all loaded, so users can pass them onto their VueRouter declaration
  return routeFiles.map(routeFile => {
    const routerConfig = requireContext(routeFile);
    return routerConfig.default ? routerConfig.default : routerConfig;
  });
}

/**
 * Register components files using Vue.component and requiring the file from webpack's context
 * @param {Vue} Vue VueJS instance
 * @param {Object} componentOptions
 */
function registerComponents (Vue, componentOptions) {
  // Setup webpack's require context. See https://github.com/webpack/docs/wiki/context#context-module-api
  const requireContext = componentOptions.requireContext || require.context(
    // root folder for components
    // relies on vue-cli setting a webpack alias of '@' to the project's /src folder
    '@/components',
    // recursive
    true,
    // include all .vue files except for the .async.vue ones
    /\/(?:[^.]+|(?!\.async\.vue$))\.vue$/)

  // Ask webpack to list the files (In sync mode, require.context already adds all files to bundle)
  const componentFiles = requireContext.keys();

  // Register all of them in Vue
  return componentFiles.map(file => {
    const name = getComponentName(file);
    let component = requireContext(file);
    // Unwrap "default" from ES6 module
    if (component.hasOwnProperty('default')) component = component.default;
    Vue.component(name, component);

    // Return the registered component
    return Vue.component(name);
  });
}

/**
 * Register components files using Vue.component as async components by setting up a factory function
 * that loads the module using webpack's lazy mode
 * Each of these components will be on its own chunk
 * @param {Vue} Vue VueJS instance
 * @param {Object} componentOptions
 */
function registerAsyncComponents (Vue, componentOptions) {
  // Setup webpack's require context. See https://github.com/webpack/docs/wiki/context#context-module-api
  const requireAsyncContext = componentOptions.requireAsyncContext || require.context(
    // root folder for components
    // relies on vue-cli setting a webpack alias of '@' to the project's /src folder
    '@/components',
    // recursive
    true,
    // include only .async.vue components
    /async\.vue$/,
    // webpack's lazy mode for require.context
    'lazy')

  // Ask webpack to list the files (In lazy mode, files are added to their own chunk and only if we require them)
  const componentFiles = requireAsyncContext.keys();

  // Register all of them in Vue
  return componentFiles.map(file => {
    const name = getComponentName(file);
    // Register as async component https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    Vue.component(name, () => requireAsyncContext(file));

    // Return the registered component
    return Vue.component(name);
  });
}

/**
  * Merges user provided options with the library defaults
  * @param {Object} userOptions User defined options to be parsed
  * @returns {Object}
 */
function parseOptions (userOptions) {
  userOptions = userOptions || {};

  return {
    // Merge user-specific options for each of the different asset types
    routes: Object.assign({}, _defaults.routes, userOptions.routes),
    components: Object.assign({}, _defaults.components, userOptions.components)
  };
}

/**
  * Register each of the different type of assets if they are enabled by the options
  * @param {Object} Vue The Vue API
  * @param {Object} userOptions User defined options to be parsed
  * @param {require} requireContext webpack require.context instance. https://github.com/webpack/docs/wiki/context#context-module-api
  * @returns {Object} The Autowire object with all the assets that were wired
 */
function register (Vue, userOptions) {
  const options = parseOptions(userOptions);

  // Returned autowiring object with registered elements
  const aw = {
    routes: [],
    components: []
  };
  if (options.routes.enabled) {
    aw.routes.push(registerRoutes(Vue, options.routes));
  }
  if (options.components.enabled) {
    aw.components.push(registerComponents(Vue, options.components));
    aw.components.push(registerAsyncComponents(Vue, options.components));
  }

  return aw;
}

/**
  * Vue plugin definition. See https://vuejs.org/v2/guide/plugins.html#Writing-a-Plugin
  * @param {Object} Vue The Vue API
  * @param {Object} userOptions User defined options
  * @returns {Object} The Autowire object with all the assets that were wired
 */
export default function install (Vue, userOptions) {
  Vue.autowire = register(Vue, userOptions);
}
