'use strict';
import Router from 'vue-router';
import deepmerge from 'deepmerge';

const _defaults = {
  routes: {
    enabled: true,
    pattern: /\.router.js/
  },
}

/**
 *
 * @param {String[]} files
 * @param {RegExp} pattern
 */
function filterFiles(files, pattern) {
  return files.filter(function filterFiles_filter(file) {
    return String(file).match(pattern);
  });
}

/**
 * Register ruoter files by loading them with webpack.require and wire up Router instance to Vue
 * @param {Vue} Vue VueJS instance
 * @param {require} requireInstance
 * @param {RouteConfig[]} routeFiles
 */
function registerRoutes(Vue, requireInstance, routeFiles) {
  let routes = routeFiles.reduce(function registerRoutes_reduce(acc, routeFile) {
    let routerConfig = requireInstance(routeFile);
    return acc.concat(routerConfig.default ? routerConfig.default : routerConfig);
  }, []);

  Vue.routes = routes;
  Vue.use(Router);
  const router = new Router({
    routes,
    linkActiveClass: true
  });

  return router;
}

/**
  @param {Object} options User defined options to be parsed
  @returns {Object} Parsed options
 */
function parseOptions(options) {
  return deepmerge(_defaults, options);
}

function register(options, context, Vue) {
  let aw = {}
  options = parseOptions(options);
  if (options.routes.enabled) {
    aw.router = registerRoutes(Vue, context, filterFiles(context.keys(), options.routes.pattern));
  }
  return aw;
}

export default function install(Vue, options) {
  Vue.autowire = register(options, options.context, Vue);
}
