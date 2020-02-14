const path = require('path')
const buble = require('rollup-plugin-buble')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version
const banner =
`/*!
 * vue-autowire v${version}
 * (c) ${new Date().getFullYear()} Kaizen Dorks
 * @license MIT
 */`

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
  umdDev: {
    file: resolve('dist/vue-autowire.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    file: resolve('dist/vue-autowire.min.js'),
    format: 'umd',
    env: 'production'
  },
  commonjs: {
    file: resolve('dist/vue-autowire.common.js'),
    format: 'cjs'
  },
  esm: {
    file: resolve('dist/vue-autowire.esm.js'),
    format: 'es'
  },
  'esm-prod': {
    file: resolve('dist/vue-autowire.esm.min.js'),
    format: 'es',
    env: 'production'
  },
}

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('src/autowire.js'),
      plugins: [
        node(),
        replace({
          __VERSION__: version
        })
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'VueAutowire'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    config.input.plugins.push(buble())
  }

  return config
}

function mapValues (obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues(configs, genConfig)