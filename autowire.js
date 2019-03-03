'use strict';
import Router from 'vue-router';

const _defaults = {
  routers: true,
  routerPattern: /\.router.js/,
}

/**
  Fill in missing values of original object with values from default object
  @param {Object} or Original object
  @param {Object} df Defults object
  @returns {Object}
 */
function defaults(or, df) {
  for (let p in df) {
    if (!or.hasOwnProperty(p)) or[p] = df[p];
  }

  return or;
}

/**
  Ignores routers, routerPattern, and context keys
  @param {Object} options User defined options to be parsed
  @returns {Object} Options with entities and their folders
 */
function folderize(options) {
  let ignore = ['routers', 'routerPattern', 'context'];
  for (let key in options) {
    key = String(key);
    if (ignore.indexOf(key) === -1) {
      let folderMatch = key.match(/Folder$/);
      if (folderMatch) {
        // If key is a folder decleration, then add the identifier
        let identifier = key.slice(0, folderMatch.index);
        // If identifier is not there add it.
        if (!options.hasOwnProperty(identifier)) {
          options[identifier] = true;
        }
      } else {
        // If this identifier is true then check if folder decleration is there
        let folder = `${key}Folder`;
        if (!options.hasOwnProperty(folder)) {
          // If there is no folder decleration add it.
          options[folder] = `/${key}`;
        }
      }
    }
  }
  return options;
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
  options = folderize(defaults(options, _defaults));
  return options;
}

function register(options, context, Vue) {
  let aw = {}
  options = parseOptions(options);
  if (options.routers) {
    aw.router = registerRoutes(Vue, context, filterFiles(context.keys(), options.routerPattern));
  }
  return aw;
}

export default function install(Vue, options) {
  Vue.autowire = register(options, options.context, Vue);
}