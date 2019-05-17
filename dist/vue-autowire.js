/*!
  * vue-autowire v0.1.0
  * (c) 2019 Kaizen Dorks
  * @license MIT
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueAutowire = factory());
}(this, (function () { 'use strict';

var _defaults = {
  routes: {
    enabled: true,
    pattern: /\.router.js/
  },
  components: {
    enabled: false,
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
  var routeFiles = requireInstance
    .keys()
    .filter(function (file) { return file.match(options.routes.pattern); });

  return routeFiles.map(function (routeFile) {
    var routerConfig = requireInstance(routeFile);
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
  var componentsFiles = requireInstance
    .keys()
    .filter(function (file) { return file.match(options.components.pattern); });

  var getFileName = function (name) { return /\/([^\/]*)\.vue$/.exec(name)[1]; };

  return componentsFiles.map(function (file) {
    var name = getFileName(file);
    var vueFile = requireInstance(file);
    var component = vueFile.hasOwnProperty('default') ? vueFile.default : vueFile;
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
  var aw = {
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

function install (Vue, options) {
  Vue.autowire = register(options, options.context, Vue);
}

return install;

})));
