/*!
  * vue-autowire v0.1.0
  * (c) 2019 Kaizen Dorks
  * @license MIT
  */
const _defaults = {
  routes: {
    enabled: true,
    pattern: /\.router.js$/
  },
  components: {
    enabled: true,
    pattern: /\/components\/.*\.vue$/
  }
};

/**
 * Load router files
 * @param {Vue} Vue VueJS instance
 * @param {Object} options
 */
function registerRoutes (Vue, options) {
  const routeFiles = options.requireContext
    .keys()
    .filter(file => file.match(options.routes.pattern));

  return routeFiles.map(routeFile => {
    const routerConfig = options.requireContext(routeFile);
    return routerConfig.default ? routerConfig.default : routerConfig;
  });
}

/**
 * Register components files using Vue.component and requiring the file from the context
 * @param {Vue} Vue VueJS instance
 * @param {Object} options
 */
function registerComponents (Vue, options) {
  const componentsFiles = options.requireContext
    .keys()
    .filter(file => file.match(options.components.pattern));

  const getFileName = name => /\/([^\/]*)\.vue$/.exec(name)[1];

  return componentsFiles.map(file => {
    const name = getFileName(file);
    let component = options.requireContext(file);
    // Unwrap "default" from ES6 module
    if (component.hasOwnProperty('default')) component = component.default;
    Vue.component(name, component);

    // Return the registered component
    return Vue.component(name);
  });
}

/**
 * Register components files using Vue.component as async components by setting up a factory function using the requireAsyncContext
 * Each of these components will be on its own chunk
 * @param {Vue} Vue VueJS instance
 * @param {Object} options
 */
function registerAsyncComponents (Vue, options) {
  const componentsFiles = options.requireAsyncContext
    .keys()
    .filter(file => file.match(options.components.pattern));

  const getFileName = name => /\/([^\/]*)\.async\.vue$/.exec(name)[1];

  return componentsFiles.map(file => {
    const name = getFileName(file);
    // Register as async component https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    Vue.component(
      name,
      () => options.requireAsyncContext(file)
    );

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
    // context and asyncContext are user provided using the require.context API
    // which allows a 4th argument to specify the mode in which to load files
    // By default this is 'sync', but can be made async as in require.context('./', true, /async\.vue$/, 'lazy')
    // See https://github.com/webpack/docs/wiki/context#context-module-api
    requireContext: userOptions.context,
    requireAsyncContext: userOptions.asyncContext && userOptions.asyncContext.id.includes("lazy") ?
      userOptions.asyncContext :
      null,

    // Async mode is enabled/disabled depending on the last argument provided to require.context
    // For example, enable async with: require.context('./', true, /(\.js|\.vue)$/, 'lazy')
    // async: requireContext.id.includes("lazy"),

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
  if (options.routes.enabled && options.requireContext) {
    aw.routes.push(registerRoutes(Vue, options));
  }
  if (options.components.enabled && options.requireContext) {
    aw.components.push(registerComponents(Vue, options));
  }
  if (options.components.enabled && options.requireAsyncContext) {
    aw.components.push(registerAsyncComponents(Vue, options));
  }

  return aw;
}

/**
  * Vue plugin definition. See https://vuejs.org/v2/guide/plugins.html#Writing-a-Plugin
  * @param {Object} Vue The Vue API
  * @param {Object} userOptions User defined options
  * @returns {Object} The Autowire object with all the assets that were wired
 */
function install (Vue, userOptions) {
  Vue.autowire = register(Vue, userOptions);
}

export default install;
