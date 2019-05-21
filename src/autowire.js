'use strict';

import { getComponentName } from './utils';

/**
 * Load router files
 * @param {Vue} Vue VueJS instance
 * @param {Object} requireContext Webpack's require context. See https://github.com/webpack/docs/wiki/context#context-module-api
 */
function registerRoutes (Vue, requireContext) {
  // Ask webpack to list the files
  // By default require.context adds all files to the main bundle unless "lazy" mode is used
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
 * @param {Object} requireContext Webpack's require context. See https://github.com/webpack/docs/wiki/context#context-module-api
 */
function registerComponents (Vue, requireContext) {
  // Ask webpack to list the files.
  // By default require.context adds all files to the main bundle unless "lazy" mode is used
  const componentFiles = requireContext.keys();

  // Register all of them in Vue
  return componentFiles.map(file => {
    const name = getComponentName(file);
    let component = requireContext(file);
    // Unwrap "default" from ES6 module
    if (component.hasOwnProperty('default')) component = component.default;
    Vue.component(name, component);

    // Return the registered component
    return { name, component: Vue.component(name) };
  });
}

/**
 * Register components files using Vue.component as async components by setting up a factory function
 * that loads the module using webpack's lazy mode
 * Each of these components will be on its own chunk
 * @param {Vue} Vue VueJS instance
 * @param {Object} requireContext Webpack's require context. See https://github.com/webpack/docs/wiki/context#context-module-api
 */
function registerAsyncComponents (Vue, requireContext) {
  // Make sure require.context was created with lazy mode
  if (!requireContext.id.includes('lazy')) {
    throw new Error('require.context for asyn components should be created in lazy mode. See https://github.com/webpack/docs/wiki/context#context-module-api');
  }

  // Ask webpack to list the files. In lazy mode, these are added to their own chunk
  const componentFiles = requireContext.keys();

  // Register all of them in Vue as async components. See https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
  return componentFiles.map(file => {
    const name = getComponentName(file);
    Vue.component(name, () => requireContext(file));
    // Return the registered component
    return { name, component: Vue.component(name) };
  });
}

/**
  * Main function, registers in Vue each of the different asset types based on the conventions provided.
  * @param {Object} Vue The Vue API
  * @param {Object} conventions Conventions defining which files to register for each asset type
 */
function autowire (Vue, conventions) {
  // Merge with empty conventions
  // The reason why we dont load here the default conventions is that webpack would then follow the chain of require/imports that lead
  // to our conventions and they would ALWAYS be added to the bundles, even when users do not use them
  conventions = Object.assign({
    routes: { requireContext: null },
    components: { requireContext: null, requireAsyncContext: null }
  }, conventions);

  // Keep track of every asset wired by the library
  const aw = {
    routes: [],
    components: [],
    asyncComponents: []
  };

  if (conventions.components.requireContext) {
    aw.components = registerComponents(Vue, conventions.components.requireContext);
  }
  if (conventions.components.requireAsyncContext) {
    aw.asyncComponents = registerAsyncComponents(Vue, conventions.components.requireAsyncContext);
  }
  if (conventions.routes.requireContext) {
    aw.routes = registerRoutes(Vue, conventions.routes.requireContext);
  }

  Vue.autowire = aw;
}

export default autowire;
