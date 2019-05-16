'use strict';

const _defaults = {
  routes: {
    enabled: true,
    pattern: /\.router.js/
  },
  components: {
    enabled: true,
    pattern: /\/components\/.*\.vue$/
  }
};

/**
 * Register ruoter files by loading them with webpack.require and wire up Router instance to Vue
 * @param {Vue} Vue VueJS instance
 * @param {require} requireInstance
 * @param {Object} options
 */
function registerRoutes (Vue, requireInstance, options) {
  const routeFiles = requireInstance
    .keys()
    .filter(file => file.match(options.routes.pattern));

  return routeFiles.map(routeFile => {
    const routerConfig = requireInstance(routeFile);
    return routerConfig.default ? routerConfig.default : routerConfig;
  });
}

/**
 * Register ruoter files by loading them with webpack.require and wire up Router instance to Vue
 * @param {Vue} Vue VueJS instance
 * @param {require} requireInstance
 * @param {Object} options
 */
function registerComponents (Vue, requireInstance, options) {
  const componentsFiles = requireInstance
    .keys()
    .filter(file => file.match(options.components.pattern));

  const getFileName = name => /\/([^\/]*)\.vue$/.exec(name)[1];

  return componentsFiles.map(file => {
    const name = getFileName(file);
    const vueFile = requireInstance(file);
    const component = vueFile.hasOwnProperty('default') ? vueFile.default : vueFile;
    return Vue.component(name, component);
  });
}

/**
  @param {Object} options User defined options to be parsed
  @returns {Object} * @param {Object} options
 */
function parseOptions (options) {
  options = options || {};
  return {
    routes: Object.assign({}, _defaults.routes, options.routes),
    components: Object.assign({}, _defaults.components, options.components)
  };
}

function register (options, context, Vue) {
  options = parseOptions(options);

  // Returned autowiring object with registered elements
  const aw = {
    routes: [],
    components: []
  };
  if (options.routes.enabled) {
    aw.routes = registerRoutes(Vue, context, options);
  }
  if (options.components.enabled) {
    aw.components = registerComponents(Vue, context, options);
  }
  return aw;
}

export default function install (Vue, options) {
  Vue.autowire = register(options, options.context, Vue);
}
