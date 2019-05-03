'use strict';
import Router from 'vue-router';
import deepmerge from 'deepmerge';

const _defaults = {
  routes: {
    enabled: true,
    pattern: /\.router.js/
  },
  components: {
    enabled: false,
    folder: '/components',
    pattern: /\.vue$/
  }
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
 * Filter folder by adding a dot in front, then filter by pattern within that set.
 */
function _filterComponentFiles(files, componentOptions) {
  let filesInFolder = filterFiles(files, RegExp(`^\\.${componentOptions.folder}`));
  return filterFiles(filesInFolder, componentOptions.pattern);
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
 * Register ruoter files by loading them with webpack.require and wire up Router instance to Vue
 * @param {Vue} Vue VueJS instance
 * @param {require} requireInstance
 * @param {String[]} componentsFiles
 */
function registerComponents(Vue, requireInstance, componentsFiles) {
  componentsFiles.forEach(function registerComponents_forEach(file) {
    const name = path.basename(file, '.vue');
    const vueFile = requireInstance(file);
    const component = vueFile.hasOwnProperty('default') ? vueFile.default : vueFile;

    Vue.component(name, component);
  });
}

/**
  @param {Object} options User defined options to be parsed
  @returns {Object} Parsed options
 */
function parseOptions(options) {
  return deepmerge(_defaults, options);
}

function register(options, context, Vue) {
  let aw = {}  // Returned autowiring object
  options = parseOptions(options);
  if (options.routes.enabled) {
    aw.router = registerRoutes(Vue, context, filterFiles(context.keys(), options.routes.pattern));
  }
  if (options.components.enabled) {
    registerComponents(Vue, context, _filterComponentFiles(context.keys(), options.components));
  }
  return aw;
}

export default function install(Vue, options) {
  Vue.autowire = register(options, options.context, Vue);
}
